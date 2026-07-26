import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Mode = "nil" | "supreme";

const ModeContext = createContext<{ mode: Mode; toggle: () => void }>({
  mode: "nil",
  toggle: () => {},
});

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>(() => {
    try {
      return (localStorage.getItem("nil-mode") as Mode) || "nil";
    } catch {
      return "nil";
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-mode", mode);
    try {
      localStorage.setItem("nil-mode", mode);
    } catch {
      /* ignore */
    }
  }, [mode]);

  const toggle = () => setMode((m) => (m === "nil" ? "supreme" : "nil"));

  return <ModeContext.Provider value={{ mode, toggle }}>{children}</ModeContext.Provider>;
}

export const useMode = () => useContext(ModeContext);
