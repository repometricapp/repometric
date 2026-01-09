"use client";

import MetricCard from "./MetricCard";
import type { ComponentProps } from "react";

type DashboardMetricsProps = {
  metrics: ComponentProps<typeof MetricCard>[];
};

export default function DashboardMetrics({ metrics }: DashboardMetricsProps) {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <MetricCard key={metric.label} {...metric} />
      ))}
    </section>
  );
}
