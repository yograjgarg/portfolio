"use client";

import { useSimulatorStore } from "@/app/context/EventLoopVisualiser/useSimulaterStore";
import { codeToSteps } from "@/app/lib/EventLoopVisualiser/codeToStep";
import Editor from "@monaco-editor/react";
import { useState } from "react";

export default function CodeEditor() {
  const [editorError, setEditorError] = useState<string | null>(null);

  const code = useSimulatorStore((s) => s.code);
  const setCode = useSimulatorStore((s) => s.setCode);
  const isRunning = useSimulatorStore((s) => s.isRunning);

  const setSteps = useSimulatorStore((s) => s.setSteps);
  const reset = useSimulatorStore((s) => s.reset);
  const startAutoPlay = useSimulatorStore((s) => s.startAutoPlay);

  const handleRun = () => {
    if (isRunning) return;

    reset();
    
    /* eslint-disable @typescript-eslint/no-unused-vars */
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const steps: any = codeToSteps(code);
    if (steps?.message) {
      alert(`Error: ${steps.message}`);
    }

    if (editorError) alert(`Error: ${editorError}`);

    setSteps(steps);
    startAutoPlay();
  };

  function handleEditorValidation(markers: any) {
    // model markers
    let error: any;
    markers.forEach((marker: any) => (error = marker.message));

    setEditorError(error);
  }

  return (
    <>
      <div className="bg-zinc-900 text-white rounded-lg overflow-hidden flex flex-col ">
        <div className="w-full h-[30vh] md:h-[50vh] relative">
          <Editor
            height="100%"
            width={"100%"}
            defaultLanguage="javascript"
            defaultValue={code}
            onChange={(e: any) => setCode(e)}
            theme="vs-dark"
            onValidate={handleEditorValidation}
          />
          <button
            onClick={handleRun}
            className="absolute right-4 bottom-0 z-10 cursor-pointer px-4 py-2 bg-[#1e1e1e] text-[#00FF00] font-mono text-sm rounded transition-all duration-150 border-[#2f2f2f]"
          >
            <span className="animate-pulse hover:animate-none">
              {isRunning ? "Running..." : ">Run this code"}
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
