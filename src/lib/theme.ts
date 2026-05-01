export const themeStorageKey = "freedom-theme";

export const themeBootstrapScript = `
  (() => {
    try {
      const storedTheme = localStorage.getItem("${themeStorageKey}");
      const themePreference =
        storedTheme === "light" || storedTheme === "dark" || storedTheme === "system"
          ? storedTheme
          : "system";
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      const resolvedTheme = themePreference === "system" ? systemTheme : themePreference;
      const root = document.documentElement;

      root.dataset.theme = resolvedTheme;
      root.dataset.themePreference = themePreference;
    } catch {
      document.documentElement.dataset.theme = "light";
      document.documentElement.dataset.themePreference = "system";
    }
  })();
`;