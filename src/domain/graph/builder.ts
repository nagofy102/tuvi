import { BRANCHES, mod } from '../astrology/sexagenary';
import type { ChartResult } from '../astrology/types';
import type {
  ChartGraph,
  GraphBuildResult,
  GraphEdge,
  GraphEvidenceLevel,
  GraphNode,
  GraphRelation,
  GraphValue,
} from './types';

const STRUCTURAL_EVIDENCE = ['k20:tan-bien:17-20', 'k20:geometry-research-only'] as const;

function slug(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/gi, 'd')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function facts(...factIds: string[]) {
  return { origin: 'chart-fact' as const, factIds, evidenceRefs: [] };
}

function derived(factIds: string[], evidenceRefs: readonly string[] = []) {
  return {
    origin: 'derived-structural' as const,
    factIds,
    evidenceRefs: [...evidenceRefs],
  };
}

function addUndirectedEdge(
  edges: GraphEdge[],
  relation: GraphRelation,
  left: string,
  right: string,
  evidenceLevel: GraphEvidenceLevel,
  factIds: string[],
  evidenceRefs: readonly string[] = [],
) {
  const [from, to] = [left, right].sort();
  const id = `edge:${relation.toLowerCase()}:${from}:${to}`;
  if (edges.some((edge) => edge.id === id)) return;
  edges.push({
    id,
    relation,
    from,
    to,
    directed: false,
    evidenceLevel,
    provenance: derived(factIds, evidenceRefs),
  });
}

export function validateChartGraph(graph: ChartGraph): string[] {
  const errors: string[] = [];
  const nodeIds = new Set<string>();
  const edgeIds = new Set<string>();
  for (const node of graph.nodes) {
    if (nodeIds.has(node.id)) errors.push(`Duplicate node ID: ${node.id}`);
    nodeIds.add(node.id);
  }
  for (const edge of graph.edges) {
    if (edgeIds.has(edge.id)) errors.push(`Duplicate edge ID: ${edge.id}`);
    edgeIds.add(edge.id);
    if (!nodeIds.has(edge.from) || !nodeIds.has(edge.to)) {
      errors.push(`Edge ${edge.id} references a missing node`);
    }
    if (!edge.directed && edge.from >= edge.to) {
      errors.push(`Undirected edge ${edge.id} is not canonical`);
    }
  }
  if (graph.nodes.filter((node) => node.kind === 'PALACE').length !== 12) {
    errors.push('Graph must contain exactly 12 palace nodes');
  }
  if (!nodeIds.has(graph.contextNodeId)) errors.push('Graph context node is missing');
  return errors;
}

export function buildChartGraph(chart: ChartResult): GraphBuildResult {
  if (
    !Array.isArray(chart.palaces) ||
    chart.palaces.length !== 12 ||
    new Set(chart.palaces.map((palace) => palace.branchIndex)).size !== 12
  ) {
    return { ok: false, errors: ['Chart must provide 12 unique branch-indexed palaces'] };
  }
  if (
    chart.palaces.some(
      (palace) =>
        !Number.isInteger(palace.branchIndex) ||
        palace.branchIndex < 0 ||
        palace.branchIndex > 11 ||
        palace.branch !== BRANCHES[palace.branchIndex] ||
        !Array.isArray(palace.stars),
    )
  ) {
    return { ok: false, errors: ['Chart palace geometry or star collection is invalid'] };
  }

  const nodes: GraphNode[] = [
    {
      id: 'context:chart',
      kind: 'CHART_CONTEXT',
      attributes: {
        profile: chart.provenance.profile,
        engineVersion: chart.provenance.engine,
        calendarVersion: chart.provenance.calendar,
        leapPolicy: chart.provenance.leapPolicy,
        ziPolicy: chart.provenance.ziPolicy,
        timeLabel: chart.timeLabel,
        solarDate: `${chart.solar.year}-${chart.solar.month}-${chart.solar.day}`,
        lunarDate: `${chart.lunar.year}-${chart.lunar.month}-${chart.lunar.day}${chart.lunar.isLeapMonth ? '-leap' : ''}`,
      },
      provenance: facts('chart.provenance', 'chart.timeLabel', 'chart.solar', 'chart.lunar'),
    },
  ];
  const edges: GraphEdge[] = [];
  const palaceByIndex = new Map<number, string>();
  const palaceFactByBranchIndex = new Map<number, string>();

  const orderedPalaces = chart.palaces
    .map((palace, sourceIndex) => ({ palace, sourceIndex }))
    .sort((a, b) => a.palace.branchIndex - b.palace.branchIndex);
  for (const { palace, sourceIndex } of orderedPalaces) {
    const palaceId = `palace:${palace.branchIndex}`;
    const palaceFact = `chart.palaces[${sourceIndex}]`;
    palaceByIndex.set(palace.branchIndex, palaceId);
    palaceFactByBranchIndex.set(palace.branchIndex, palaceFact);
    nodes.push({
      id: palaceId,
      kind: 'PALACE',
      attributes: {
        name: palace.name,
        branch: palace.branch,
        branchIndex: palace.branchIndex,
        stem: palace.stem,
        isBodyPalace: palace.isBodyPalace,
      },
      provenance: facts(palaceFact),
    });
    nodes.push({
      id: `period:decade:${palace.branchIndex}`,
      kind: 'PERIOD_CONTEXT',
      attributes: {
        periodType: 'decade',
        palaceId,
        startAge: palace.decade[0],
        endAge: palace.decade[1],
        lifeStage: palace.lifeStage,
      },
      provenance: facts(`${palaceFact}.decade`, `${palaceFact}.lifeStage`),
    });

    const occurrences = new Map<string, number>();
    palace.stars.forEach((star, starIndex) => {
      const canonical = slug(star.name) || `star-${starIndex}`;
      const occurrence = occurrences.get(canonical) ?? 0;
      occurrences.set(canonical, occurrence + 1);
      const suffix = occurrence ? `:${occurrence}` : '';
      const starId = `star:${palace.branchIndex}:${canonical}${suffix}`;
      const placementId = `placement:${palace.branchIndex}:${canonical}${suffix}`;
      const starFact = `${palaceFact}.stars[${starIndex}]`;
      nodes.push(
        {
          id: starId,
          kind: 'STAR',
          attributes: { name: star.name, group: star.group },
          provenance: facts(starFact),
        },
        {
          id: placementId,
          kind: 'PLACEMENT',
          attributes: { starId, palaceId },
          provenance: facts(starFact, palaceFact),
        },
      );
      edges.push({
        id: `edge:star-in-palace:${starId}:${palaceId}`,
        relation: 'STAR_IN_PALACE',
        from: starId,
        to: palaceId,
        directed: true,
        evidenceLevel: 'chart-fact',
        provenance: facts(starFact, palaceFact),
      });
      const stateAttributes: Record<string, GraphValue> = {};
      if (star.brightness) stateAttributes.brightness = star.brightness;
      if (star.transformation) stateAttributes.transformation = star.transformation;
      if (Object.keys(stateAttributes).length) {
        nodes.push({
          id: `state:${palace.branchIndex}:${canonical}${suffix}`,
          kind: 'STAR_STATE',
          attributes: { starId, ...stateAttributes },
          provenance: facts(starFact),
        });
      }
    });
  }

  for (let index = 0; index < 12; index += 1) {
    const origin = palaceByIndex.get(index)!;
    addUndirectedEdge(
      edges,
      'OPPOSITE',
      origin,
      palaceByIndex.get(mod(index + 6, 12))!,
      'approved-structural-testing',
      [`${palaceFactByBranchIndex.get(index)!}.branchIndex`],
      STRUCTURAL_EVIDENCE,
    );
    for (const offset of [4, 8]) {
      addUndirectedEdge(
        edges,
        'TRINE',
        origin,
        palaceByIndex.get(mod(index + offset, 12))!,
        'approved-structural-testing',
        [`${palaceFactByBranchIndex.get(index)!}.branchIndex`],
        STRUCTURAL_EVIDENCE,
      );
    }
    addUndirectedEdge(
      edges,
      'ADJACENT',
      origin,
      palaceByIndex.get(mod(index + 1, 12))!,
      'unverified',
      [`${palaceFactByBranchIndex.get(index)!}.branchIndex`],
    );
  }

  const graph: ChartGraph = {
    schemaVersion: 'chart-graph-v1',
    contextNodeId: 'context:chart',
    nodes,
    edges,
  };
  const errors = validateChartGraph(graph);
  return errors.length ? { ok: false, errors } : { ok: true, graph };
}
