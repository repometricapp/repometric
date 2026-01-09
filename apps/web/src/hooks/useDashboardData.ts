"use client";

import { useState, useEffect } from "react";
import { DashboardData } from "@/lib/github";
import { logger } from "@/lib/logger";

const ORG_STORAGE_KEY = "repometric_selected_org";

export function useDashboardData() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const query = selectedOrgId
          ? `?org=${encodeURIComponent(selectedOrgId)}`
          : "";
        const response = await fetch(`/api/dashboard${query}`);
        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data");
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
      } catch (error) {
        logger.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [selectedOrgId]);

  const handleOrgChange = (orgId: string) => {
    setSelectedOrgId(orgId);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(ORG_STORAGE_KEY, orgId);
    }
  };

  return { data, loading, selectedOrgId, setSelectedOrgId: handleOrgChange };
}
