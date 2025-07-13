export default function HowToUse() {
  return (
    <div className="mt-6 text-sm text-gray-400 space-y-2 md:block hidden">
      <p className="text-white font-semibold">How to use:</p>
      <div className="bg-black font-mono  p-3 rounded text-xs">
        <ul className="list-none list-inside space-y-1">
          <li>
            $ Type <span className="text-emerald-400">help</span> to see
            commands
          </li>
          <li>
            $ Try <span className="text-emerald-400">about</span>,{" "}
            <span className="text-emerald-400">skills</span>
          </li>
          <li>
            $ Want projects? Type{" "}
            <span className="text-emerald-400">projects</span>
          </li>
          <li>
            $ Reach out with <span className="text-emerald-400">contact</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
