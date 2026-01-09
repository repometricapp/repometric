"use client";

import { useState, useEffect, useCallback } from "react";
import { DashboardData } from "@/shared/libs/github";
import { logger } from "@/shared/libs/logger";

const ORG_STORAGE_KEY = "repometric_selected_org";

export function useDashboardData() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [selectedOrgId, setSelectedOrgId] = useState<string | null>(null);

  useEffect(() => {
    const stored =
      typeof window !== "undefined"
        ? window.localStorage.getItem(ORG_STORAGE_KEY)
        : null;
    if (stored) {
      setSelectedOrgId(stored);
    }
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const query = selectedOrgId
        ? `?org=${encodeURIComponent(selectedOrgId)}`
        : "";
      const response = await fetch(`/api/dashboard${query}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch dashboard data: ${response.statusText}`);
      }
      const dashboardData = (await response.json()) as DashboardData;
      setData(dashboardData);

      if (
        selectedOrgId === null ||
        selectedOrgId !== dashboardData.selectedOrgId
      ) {
        setSelectedOrgId(dashboardData.selectedOrgId);
        if (typeof window !== "undefined") {
          window.localStorage.setItem(
            ORG_STORAGE_KEY,
            dashboardData.selectedOrgId
          );
        }
      }
    } catch (err) {
      const fetchError = err instanceof Error ? err : new Error(String(err));
      logger.error("Failed to fetch dashboard data:", fetchError);
      setError(fetchError);
    } finally {
      setLoading(false);
    }
  }, [selectedOrgId]);


  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleOrgChange = (orgId: string) => {
    setSelectedOrgId(orgId);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(ORG_STORAGE_KEY, orgId);
    }
  };

  return { data, loading, error, selectedOrgId, setSelectedOrgId: handleOrgChange };
}
