import type { ChartResult } from '../astrology/types';
import { buildChartGraph } from '../graph/builder';
import type { ChartGraph } from '../graph/types';
import { evaluateRules } from '../rules/evaluator';
import type { EvaluationBatch, GraphRule } from '../rules/types';
import { calculateInterpretation } from './calculate';
import type { InterpretationResult } from './types';

export interface InterpretationShadowResult {
  status: 'DISABLED' | 'GRAPH_INVALID' | 'NO_ELIGIBLE_RULES' | 'EVALUATED';
  graph: ChartGraph | null;
  evaluation: EvaluationBatch | null;
  errors: string[];
  productionOutputChanged: false;
}

export interface InterpretationPipelineResult {
  interpretation: InterpretationResult;
  shadow: InterpretationShadowResult;
}

export interface InterpretationPipelineOptions {
  shadowMode?: boolean;
  /** Explicit injection boundary. Production ships with no graph rules. */
  rules?: readonly GraphRule[];
}

export function graphShadowEnabled(value: string | undefined): boolean {
  return value === '1';
}

/**
 * Keeps the established report authoritative while exercising the graph pipeline
 * diagnostically. Shadow claims are never copied into InterpretationReport.
 */
export function runInterpretationPipeline(
  chart: ChartResult,
  options: InterpretationPipelineOptions = {},
): InterpretationPipelineResult {
  const interpretation = calculateInterpretation(chart);
  if (!options.shadowMode) {
    return {
      interpretation,
      shadow: {
        status: 'DISABLED',
        graph: null,
        evaluation: null,
        errors: [],
        productionOutputChanged: false,
      },
    };
  }
  const built = buildChartGraph(chart);
  if (!built.ok) {
    return {
      interpretation,
      shadow: {
        status: 'GRAPH_INVALID',
        graph: null,
        evaluation: null,
        errors: built.errors,
        productionOutputChanged: false,
      },
    };
  }
  const evaluation = evaluateRules(built.graph, options.rules ?? [], 'shadow');
  return {
    interpretation,
    shadow: {
      status: evaluation.status,
      graph: built.graph,
      evaluation,
      errors: [],
      productionOutputChanged: false,
    },
  };
}
