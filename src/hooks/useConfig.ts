"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { Config } from "@/lib/types";
import { DEFAULTS } from "@/lib/defaults";
import { saveConfig, loadConfig, clearConfig } from "@/lib/storage";

export function useConfig() {
  const [config, setConfig] = useState<Config>(DEFAULTS);
  const [loaded, setLoaded] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = loadConfig();
    if (saved) {
      setConfig(saved);
    }
    setLoaded(true);
  }, []);

  // Auto-save to localStorage on change (debounced 500ms)
  useEffect(() => {
    if (!loaded) return;

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      saveConfig(config);
    }, 500);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [config, loaded]);

  // Update a single field
  const set = useCallback(<K extends keyof Config>(key: K, value: Config[K]) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  }, []);

  // Reset to defaults
  const resetToDefaults = useCallback(() => {
    clearConfig();
    setConfig(DEFAULTS);
  }, []);

  return { config, set, setConfig, resetToDefaults, loaded };
}
