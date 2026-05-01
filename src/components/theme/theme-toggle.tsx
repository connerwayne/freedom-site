"use client";

import { useEffect } from "react";

import { themeStorageKey } from "@/lib/theme";

type ThemePreference = "system" | "light" | "dark";

const themeOptions: Array<{ label: string; value: ThemePreference }> = [
  { label: "Auto", value: "system" },
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
];

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getStoredThemePreference(): ThemePreference {
  if (typeof window === "undefined") {
    return "system";
  }

  const storedTheme = window.localStorage.getItem(themeStorageKey);

  return storedTheme === "light" || storedTheme === "dark" || storedTheme === "system"
    ? storedTheme
    : "system";
}

function applyTheme(preference: ThemePreference) {
  const root = document.documentElement;
  const resolvedTheme = preference === "system" ? getSystemTheme() : preference;

  root.dataset.theme = resolvedTheme;
  root.dataset.themePreference = preference;
}

export function ThemeToggle() {
  useEffect(() => {
    const preference = getStoredThemePreference();

    applyTheme(preference);

    window.localStorage.setItem(themeStorageKey, preference);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = () => {
      const activePreference =
        (window.localStorage.getItem(themeStorageKey) as ThemePreference | null) ?? "system";

      if (activePreference === "system") {
        applyTheme("system");
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  function handlePreferenceChange(nextPreference: ThemePreference) {
    window.localStorage.setItem(themeStorageKey, nextPreference);
    applyTheme(nextPreference);
  }

  return (
    <div className="theme-toggle" aria-label="Theme switcher" role="group">
      {themeOptions.map((option) => (
        <button
          key={option.value}
          className="theme-toggle-option"
          data-theme-value={option.value}
          onClick={() => handlePreferenceChange(option.value)}
          type="button"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}