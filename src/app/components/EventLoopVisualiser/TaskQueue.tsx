'use client'

import { useSimulatorStore } from "@/app/context/EventLoopVisualiser/useSimulaterStore"

export function TaskQueue() {
  const taskQueue = useSimulatorStore((s) => s.taskQueue)

  return (
    <div className="bg-zinc-800 rounded-xl lg:p-4 p-2 shadow w-full min-h-[120px]">
      <h2 className="lg:text-lg font-semibold mb-2">📦 Task Queue</h2>
      <ul className="space-y-1">
        {taskQueue.map((item, i) => (
          <li key={i} className="bg-zinc-700 px-3 py-1 rounded">{item}</li>
        ))}
        {taskQueue.length === 0 && <li className="text-sm text-zinc-400">Empty</li>}
      </ul>
    </div>
  )
}
