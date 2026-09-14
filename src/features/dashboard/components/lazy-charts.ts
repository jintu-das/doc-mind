import { lazy } from "react";

export const IngestionChart = lazy(
  () => import("@/features/dashboard/components/ingestion-chart"),
);
export const CorpusCoverageChart = lazy(
  () => import("@/features/dashboard/components/corpus-coverage-chart"),
);
