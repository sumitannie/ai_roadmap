"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Plus, Trash2, Download } from "lucide-react";
import { useReactFlow } from "reactflow";
import { Dock, DockIcon } from "@/components/ui/dock";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import useCanvasStore from "@/stores/useCanvasStore";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

export default function SimpleDock() {
  const rf = useReactFlow();
  const selectedNodeId = useCanvasStore((s: any) => s.selectedNodeId);
  const setSelectedNodeId = useCanvasStore((s: any) => s.setSelectedNodeId);
  const addNodeStore = useCanvasStore((s: any) => s.addNode);
  const removeNodeStore = useCanvasStore((s: any) => s.removeNode);
  const exportState = useCanvasStore((s: any) => s.exportState);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const openCreateDialog = useCanvasStore((s: any) => s.openCreateDialog);

  const addNode = useCallback(() => {
    openCreateDialog();
  }, [openCreateDialog]);

  const deleteNode = useCallback(() => {
    const id = selectedNodeId;
    if (!id) return;
    removeNodeStore(id);
    setSelectedNodeId(null);
  }, [selectedNodeId, removeNodeStore, setSelectedNodeId]);

  const exportJson = useCallback(() => {
    try {
      const obj = rf.toObject();
      const blob = new Blob([JSON.stringify(obj, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `graph-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Export failed", err);
    }
  }, [rf]);

  return (
    <TooltipProvider>
      <Dock
        iconSize={44}
        iconMagnification={64}
        iconDistance={120}
        direction="middle"
        disableMagnification={isMobile}
      >
        <DockIcon>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                aria-label="Add node"
                onClick={addNode}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "size-12 rounded-full bg-transparent cursor-pointer",
                )}
              >
                <Plus className="size-5 text-foreground cursor-pointer" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add node</p>
            </TooltipContent>
          </Tooltip>
        </DockIcon>

        <DockIcon>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                aria-label="Delete node"
                onClick={deleteNode}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "size-12 rounded-full bg-transparent cursor-pointer",
                )}
              >
                <Trash2 className="size-5 text-foreground cursor-pointer" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete node</p>
            </TooltipContent>
          </Tooltip>
        </DockIcon>

        <DockIcon>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                aria-label="Export JSON"
                onClick={exportJson}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "size-12 rounded-full bg-transparent cursor-pointer",
                )}
              >
                <Download className="size-5 text-foreground cursor-pointer" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Export JSON</p>
            </TooltipContent>
          </Tooltip>
        </DockIcon>

        <DockIcon>
          <AnimatedThemeToggler
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "size-12 rounded-full bg-transparent cursor-pointer text-foreground",
            )}
          />
        </DockIcon>
      </Dock>
    </TooltipProvider>
  );
}
