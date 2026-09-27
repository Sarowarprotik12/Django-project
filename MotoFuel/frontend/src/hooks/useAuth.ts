"use client";

import { useEffect, useState } from "react";
import { tokenStorage } from "@/utils/token";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = tokenStorage.getAccessToken();
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);

  return {
    isAuthenticated,
    loading,
  };
}