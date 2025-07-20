'use client'

import { useSimulatorStore } from "@/app/context/EventLoopVisualiser/useSimulaterStore"

export function WebAPIs() {
  const webAPIs = useSimulatorStore((s) => s.webAPIs)

  return (
    <div className="bg-zinc-800 rounded-xl lg:p-4 p-2 shadow w-full min-h-[120px]">
      <h2 className="lg:text-lg font-semibold mb-2">🌐 Web APIs</h2>
      <ul className="space-y-1">
        {webAPIs.map((item, i) => (
          <li key={i} className="bg-zinc-700 px-3 py-1 rounded">{item}</li>
        ))}
        {webAPIs.length === 0 && <li className="text-sm text-zinc-400">Empty</li>}
      </ul>
    </div>
  )
}
