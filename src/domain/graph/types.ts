export type GraphNodeKind =
  'CHART_CONTEXT' | 'PALACE' | 'STAR' | 'PLACEMENT' | 'STAR_STATE' | 'PERIOD_CONTEXT';

export type GraphRelation = 'STAR_IN_PALACE' | 'OPPOSITE' | 'TRINE' | 'ADJACENT';

export type GraphEvidenceLevel =
  'chart-fact' | 'approved-structural-testing' | 'unverified' | 'unresolved';

export type GraphValue = string | number | boolean | null;

export interface GraphProvenance {
  origin: 'chart-fact' | 'derived-structural';
  factIds: string[];
  evidenceRefs: string[];
}

export interface GraphNode {
  id: string;
  kind: GraphNodeKind;
  attributes: Readonly<Record<string, GraphValue>>;
  provenance: GraphProvenance;
}

export interface GraphEdge {
  id: string;
  relation: GraphRelation;
  from: string;
  to: string;
  directed: boolean;
  evidenceLevel: GraphEvidenceLevel;
  provenance: GraphProvenance;
}

export interface ChartGraph {
  schemaVersion: 'chart-graph-v1';
  contextNodeId: 'context:chart';
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export type GraphBuildResult = { ok: true; graph: ChartGraph } | { ok: false; errors: string[] };
