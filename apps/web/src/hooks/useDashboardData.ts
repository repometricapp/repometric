"use client";

import { useState, useEffect } from "react";
import { RepoSummary } from "@/lib/github";
import { logger } from "@/lib/logger";

export function useDashboardData() {
  const [data, setData] = useState<{
    userName: string;
    orgName: string;
    repos: RepoSummary[];
    pipelineSeries: { label: string; minutes: number; successRate: number }[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/dashboard");
        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data");
        }
        const dashboardData = await response.json();
        setData(dashboardData);
      } catch (error) {
        logger.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading };
}
