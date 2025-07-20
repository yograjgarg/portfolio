'use client'

import { useSimulatorStore } from "@/app/context/EventLoopVisualiser/useSimulaterStore"

export function OutputLog() {
  const log = useSimulatorStore((s) => s.log)

  return (
    <div className="col-span-2 bg-zinc-900 border border-zinc-700 rounded-xl lg:p-4 p-2">
      <h2 className="lg:text-lg font-semibold mb-2">🖨️ Output Log</h2>
      <div className="bg-zinc-800 p-2 rounded min-h-[60px] text-sm font-mono">
        {log.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
        {log.length === 0 && <div className="text-zinc-500">Nothing logged yet</div>}
      </div>
    </div>
  )
}
