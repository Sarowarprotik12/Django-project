"use client";

import { useCallback, useEffect, useState } from "react";
import { bikeService } from "../services/bike.service";
import { Bike } from "../types/bike.types";

export function useBikes() {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBikes = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await bikeService.getBikes();
      setBikes(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load bikes.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBikes();
  }, [fetchBikes]);

  return {
    bikes,
    loading,
    error,
    refreshBikes: fetchBikes,
  };
}