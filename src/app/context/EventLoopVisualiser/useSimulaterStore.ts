import { create } from "zustand";

type QueueTarget =
  | "callStack"
  | "webAPIs"
  | "microtaskQueue"
  | "taskQueue"
  | "log";

export type SimulationStep =
  | {
      type: "push";
      target: QueueTarget;
      value: string;
      lineNumber?: number;
    }
  | {
      type: "pop";
      target: QueueTarget;
      lineNumber?: number;
    }
  | {
      type: "log";
      target: "log";
      value: string;
      lineNumber?: number;
    }
  | {
      type: "move";
      from: QueueTarget;
      to: QueueTarget;
      lineNumber?: number;
    };

interface SimulatorState {
  code: string;
  setCode: (newCode: string) => void;

  callStack: string[];
  webAPIs: string[];
  microtaskQueue: string[];
  taskQueue: string[];
  log: string[];
  steps: SimulationStep[];
  currentStep: number;
  isRunning: boolean;
  delay: number;
  runStep: () => void;
  reset: () => void;
  setSteps: (steps: SimulationStep[]) => void;
  startAutoPlay: () => void;
  stopAutoPlay: () => void;
  highlightedLine: number | null;
}

let interval: NodeJS.Timeout;

export const useSimulatorStore = create<SimulatorState>((set, get) => ({
  code: `console.log("Start");

  setTimeout(() => {
    console.log("Timeout");
  }, 0);
  
  Promise.resolve().then(() => {
    console.log("Microtask");
  });
  
  console.log("End");`,

  callStack: [],
  webAPIs: [],
  microtaskQueue: [],
  taskQueue: [],
  log: [],
  steps: [],
  currentStep: 0,
  isRunning: false,
  delay: 1000,
  highlightedLine: null,
  setCode: (newCode: string) => set({ code: newCode }),

  setSteps: (steps) => set({ steps, currentStep: 0 }),

  startAutoPlay: () => {
    if (interval) clearInterval(interval);

    interval = setInterval(() => {
      const { runStep, currentStep, steps } = get();
      if (currentStep < steps.length) {
        runStep();
      } else {
        clearInterval(interval);
      }
    }, get().delay);

    set({ isRunning: true });
  },

  stopAutoPlay: () => {
    if (interval) clearInterval(interval);
    set({ isRunning: false });
  },

  reset: () =>
    set({
      callStack: [],
      webAPIs: [],
      microtaskQueue: [],
      taskQueue: [],
      log: [],
      currentStep: 0,
      isRunning: false,
      highlightedLine: null
    }),

  runStep: () => {
    const { currentStep, steps } = get();

    if (currentStep >= steps.length) {
      set({ highlightedLine: null });
      return;
    }
    const step = steps[currentStep];
    const stateUpdate: Partial<SimulatorState> = {
      highlightedLine: step.lineNumber ?? null,
      currentStep: currentStep + 1,
    };

    switch (step.type) {
      case "push":
        stateUpdate[step.target] = [...get()[step.target], step.value!];
        break;

      case "pop":
        stateUpdate[step.target] = get()[step.target].slice(0, -1);
        break;

      case "log":
        stateUpdate.log = [...get().log, step.value!];
        break;

      case "move":
        if (step.from && step.to) {
          const fromArray = [...get()[step.from]];
          const value = fromArray.shift();
          stateUpdate[step.from] = fromArray;
          stateUpdate[step.to] = [...get()[step.to], value!];
        }
        break;
    }

    set({
      ...stateUpdate,
      currentStep: currentStep + 1,
    });
  },
}));
