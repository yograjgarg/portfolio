import Head from "next/head";
import { CallStack } from "../components/EventLoopVisualiser/CallStack";
import { WebAPIs } from "../components/EventLoopVisualiser/WebAPIs";
import { TaskQueue } from "../components/EventLoopVisualiser/TaskQueue";
import { MicrotaskQueue } from "../components/EventLoopVisualiser/MicrotaskQueue";
import { OutputLog } from "../components/EventLoopVisualiser/OutputLog";
import CodeEditor from "../components/EventLoopVisualiser/CodeEditor";

export default function Home() {
  return (
    <>
      <Head>
        <title>
          JavaScript Event Loop Visualizer – Interactive JS Runtime Demo
        </title>
        <meta
          name="description"
          content="Understand how JavaScript's event loop works through a visual, interactive simulator. Watch call stack, Web APIs, microtask queue, and task queue in real-time!"
        />
        <meta
          name="keywords"
          content="JavaScript event loop, JS visualizer, call stack, microtask queue, task queue, web APIs, async JavaScript, JS runtime, interactive JS demo"
        />
        <meta name="author" content="Yograj | Frontend Developer" />

        {/* Open Graph for Facebook, LinkedIn */}
        <meta property="og:title" content="JavaScript Event Loop Visualizer" />
        <meta
          property="og:description"
          content="Interactive JS runtime simulation – see how the call stack, Web APIs, microtasks, and task queues actually work. Perfect for learners and interview prep."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://yograjgarg.com/js-event-loop-visualiser"
        />
        <meta
          property="og:image"
          content="https://yograjgarg.com/js-event-loop-visualiser.png"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="JavaScript Event Loop Visualizer" />
        <meta
          name="twitter:description"
          content="Master JavaScript's async behavior with this fun and interactive event loop visualizer."
        />
        <meta
          name="twitter:image"
          content="https://yograjgarg.com/js-event-loop-visualiser.png"
        />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Canonical link */}
        <link
          rel="canonical"
          href="https://yograjgarg.com/js-event-loop-visualiser"
        />
      </Head>

      <main className="min-h-screen overflow-hidden bg-zinc-900 w-full text-white lg:p-8 p-2 gap-8">
        <h1 className="lg:text-3xl text-md lg:font-bold font-medium text-center lg:pb-9 pb-2">
          JavaScript Event Loop Visualizer – Call Stack, Queues & Web APIs in
          Action
        </h1>
        <p className="sr-only">
          This interactive JavaScript runtime simulator helps you understand the
          event loop, including the call stack, Web APIs, microtask and task
          queues. It&apos;s perfect for learning async JavaScript and visualizing
          execution flow.
        </p>

        <div className="flex flex-col  md:flex-row md:gap-4 gap-2">
          <div className="w-full md:w-1/2">
            <CodeEditor />
          </div>

          <div className="md:w-1/2">
            <div className="grid grid-cols-2 lg:grid-cols-1 lg:gap-4 gap-2">
              <CallStack />
              <WebAPIs />
              <TaskQueue />
              <MicrotaskQueue />
              <OutputLog />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
