"use client";

import { useSimulatorStore } from "@/app/context/EventLoopVisualiser/useSimulaterStore";

export function Controls() {
  const runStep = useSimulatorStore((s) => s.runStep);
  const reset = useSimulatorStore((s) => s.reset);
  const currentStep = useSimulatorStore((s) => s.currentStep);
  const steps = useSimulatorStore((s) => s.steps);

  // const startAutoPlay = useSimulatorStore((s) => s.startAutoPlay);
  // const stopAutoPlay = useSimulatorStore((s) => s.stopAutoPlay);
  // const isRunning = useSimulatorStore((s) => s.isRunning);

  return (
    <div className="flex justify-center gap-4 mt-8">
      <button
        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl"
        onClick={() => {
          reset();
          // setSteps(mockSteps);
        }}
      >
        ▶️ Load Simulation
      </button>

      <button
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl disabled:opacity-50"
        disabled={currentStep >= steps.length}
        onClick={() => runStep()}
      >
        ⏭️ Step
      </button>

      <button
        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl"
        onClick={() => reset()}
      >
        🔄 Reset
      </button>

      {/* <button
        className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-xl"
        onClick={() => {
          
          isRunning ? stopAutoPlay() : startAutoPlay();
        }}
      >
        {isRunning ? "⏸ Pause" : "▶️ Auto-Play"}
      </button> */}
    </div>
  );
}
