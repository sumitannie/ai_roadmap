"use client";

import { useLayoutEffect } from "react";
import { ReactFlowProvider } from "reactflow";

export function Providers({ children }: { children: React.ReactNode }) {
  useLayoutEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = saved === "dark" || (!saved && prefersDark);
    document.documentElement.classList.toggle("dark", shouldBeDark);
  }, []);

  return <ReactFlowProvider>{children}</ReactFlowProvider>;
}
