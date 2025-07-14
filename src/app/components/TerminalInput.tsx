"use client";
import { useState, useRef, useEffect } from "react";
import { BOOT_MESSAGES, commands } from "../lib/commands";

function Typewriter({
  text,
  onComplete,
}: {
  text: string;
  onComplete?: () => void;
}) {
  const [displayed, setDisplayed] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(() => {
        const next = text.slice(0, i + 1);
        i++;
        return next;
      });

      // Scroll into view after each character
      bottomRef.current?.scrollIntoView({behavior:'smooth'});

      if (i === text.length) {
        clearInterval(interval);
        onComplete?.();
      }
    }, 25);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <span dangerouslySetInnerHTML={{ __html: displayed }} />
      <span ref={bottomRef} />
    </>
  );
}

const commonCommands = ["about", "skills", "projects", "contact"];

export default function Terminal() {
  const [messages, setMessages] = useState<
    { id: number; fromUser: boolean; text: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [bootIndex, setBootIndex] = useState(0);
  const [booting, setBooting] = useState(true);
  const [lastTypedId, setLastTypedId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (containerRef.current) {
  //     const container = containerRef.current;
  //     container.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, [messages]);

  // Boot sequence handler
  useEffect(() => {
    if (bootIndex < BOOT_MESSAGES.length) {
      const nextId = bootIndex;
      setMessages((m) => [
        ...m,
        { id: nextId, fromUser: false, text: BOOT_MESSAGES[bootIndex] },
      ]);
      setLastTypedId(nextId);

      const timeout = setTimeout(() => {
        setBootIndex((prev) => prev + 1);
      }, 600);

      return () => clearTimeout(timeout);
    } else {
      setBooting(false);
    }
  }, [bootIndex]);

  function handleSubmit(text?: string) {
    // e.preventDefault();
    if (booting) return; // Ignore input while booting

    const trimmed = text?.trim().toLowerCase() || input.trim().toLowerCase();
    if (!trimmed) return;

    const userId = messages.length;
    setMessages((m) => [...m, { id: userId, fromUser: true, text: trimmed }]);
    setInput("");

    const responseText =
      commands[trimmed] ||
      `<span class='text-red-400 text-sm'>Command not found: ${input}. Type "help".</span>`;

    const botId = userId + 1;

    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { id: botId, fromUser: false, text: responseText },
      ]);
      setLastTypedId(botId);
    }, 400);
  }

  return (
    <section className="flex flex-col flex-1 bg-[#212121] md:p-6 p-2 text-white font-mono">
      <div className="flex-1 overflow-y-auto mb-4 space-y-2 whitespace-pre-wrap ">
        {messages.map(({ id, fromUser, text }, index) => (
          <p key={index} className={fromUser ? "text-green-400" : "text-gray-300"}>
            {fromUser ? (
              <span className="text-green-400 text-xs font-mono mt-4">
                visitor@portfolio:~$ <span className="text-white">_{text}</span>
              </span>
            ) : id === lastTypedId ? (
              <Typewriter text={text} onComplete={() => setLastTypedId(null)} />
            ) : (
              <span dangerouslySetInnerHTML={{ __html: text }} />
            )}
          </p>
        ))}
        <div ref={containerRef} className="h-2"></div>
      </div>
      <div className="sticky bottom-0">
        <div className="bg-[#212121] pb-4 md:pb-0">
          {/* Command Chips */}
          <div
            className={`flex items-center flex-nowrap overflow-x-scroll gap-2  bg-[#303030] px-4 pt-4 rounded-t-xl outline-none ${
              booting ? "opacity-50" : ""
            }`}
          >
            {commonCommands.map((cmd) => (
              <div key={cmd}>
                <button
                  disabled={booting}
                  onClick={() => {
                    setInput(cmd);
                    handleSubmit(cmd);
                  }}
                  role="button"
                  className="select-none cursor-pointer
                px-4 py-1 text-sm rounded-full
                border border-gray-600
                text-gray-300
                bg-[#2a2a2a]
                hover:bg-[#3a3a3a]
                peer-checked:bg-blue-600
                peer-checked:text-white
                peer-checked:border-blue-500
                transition-colors duration-200 ease-in-out
                shadow-sm disabled:cursor-not-allowed"
                >
                  {cmd}
                </button>
              </div>
            ))}
          </div>
          <div>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='Type command like "help" or use above shortcut'
              className="bg-[#303030] text-white px-4 py-4 rounded-b-xl outline-none disabled:opacity-50 placeholder:text-sm w-full"
              autoFocus
              disabled={booting}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
