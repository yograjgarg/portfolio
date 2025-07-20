import { SimulationStep } from "@/app/context/EventLoopVisualiser/useSimulaterStore";
import * as parser from "@babel/parser";

// Helper to extract all console.log messages from a function body

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const extractLogsFromCallback = (funcBody: any): string[] => {
  const logs: string[] = [];

  if (funcBody?.type === "BlockStatement") {
    for (const innerStmt of funcBody.body) {
      if (
        innerStmt.type === "ExpressionStatement" &&
        innerStmt.expression.type === "CallExpression" &&
        innerStmt.expression.callee.type === "MemberExpression" &&
        innerStmt.expression.callee.object.type === "Identifier" &&
        innerStmt.expression.callee.object.name === "console" &&
        innerStmt.expression.callee.property.type === "Identifier" &&
        innerStmt.expression.callee.property.name === "log"
      ) {
        const arg = innerStmt.expression.arguments[0];
        if (arg?.type === "StringLiteral") {
          logs.push(arg.value);
        } else {
          logs.push("console.log");
        }
      }
    }
  }

  return logs;
};

/**
 * Parses JS code into simulation steps for the event loop visualizer.
 * Now includes `lineNumber` in each step to support line highlighting.
 */
export function codeToSteps(code: string): SimulationStep[] {
  const steps: SimulationStep[] = [];

  // Parse the code to AST
  let ast;
  try {
    ast = parser.parse(code, {
      sourceType: "module",
      plugins: ["jsx", "typescript"],
      ranges: true,
      locations: true, // required for lineNumber
    } as any);
  } catch (error: any) {
    return error;
  }

  const microtasks: { label: string; line: number }[] = [];
  const tasks: { label: string; line: number }[] = [];

  const addLog = (msg: string, lineNumber?: number) => {
    steps.push({ type: "log", target: "log", value: msg, lineNumber });
  };

  for (const stmt of ast.program.body) {
    const line = stmt.loc?.start.line ?? 1;

    // console.log("...")
    if (
      stmt.type === "ExpressionStatement" &&
      stmt.expression.type === "CallExpression" &&
      stmt.expression.callee.type === "MemberExpression" &&
      stmt.expression.callee.object.type === "Identifier" &&
      stmt.expression.callee.object.name === "console" &&
      stmt.expression.callee.property.type === "Identifier" &&
      stmt.expression.callee.property.name === "log"
    ) {
      steps.push({
        type: "push",
        target: "callStack",
        value: "console.log()",
        lineNumber: line,
      });

      const arg = stmt.expression.arguments[0];
      if (arg?.type === "StringLiteral") {
        addLog(arg.value, line);
      } else {
        addLog("console.log", line);
      }

      steps.push({ type: "pop", target: "callStack", lineNumber: line });
    }

    // setTimeout(...)
    else if (
      stmt.type === "ExpressionStatement" &&
      stmt.expression.type === "CallExpression" &&
      stmt.expression.callee.type === "Identifier" &&
      stmt.expression.callee.name === "setTimeout"
    ) {
      steps.push({
        type: "push",
        target: "callStack",
        value: "setTimeout()",
        lineNumber: line,
      });
      steps.push({
        type: "push",
        target: "webAPIs",
        value: "setTimeout()",
        lineNumber: line,
      });
      steps.push({ type: "pop", target: "callStack", lineNumber: line });

      // ⬇️ get log message(s) from callback
      const callback = stmt.expression.arguments[0];
      if (
        callback?.type === "ArrowFunctionExpression" ||
        callback?.type === "FunctionExpression"
      ) {
        const logs = extractLogsFromCallback(callback.body);
        for (const msg of logs) {
          tasks.push({ label: msg, line });
        }
      }
    }

    // Promise.resolve().then(...)
    else if (
      stmt.type === "ExpressionStatement" &&
      stmt.expression.type === "CallExpression" &&
      stmt.expression.callee.type === "MemberExpression" &&
      stmt.expression.callee.object.type === "CallExpression" &&
      stmt.expression.callee.object.callee.type === "MemberExpression" &&
      stmt.expression.callee.object.callee.object.type === "Identifier" &&
      stmt.expression.callee.object.callee.object.name === "Promise" &&
      stmt.expression.callee.object.callee.property.type === "Identifier" &&
      stmt.expression.callee.object.callee.property.name === "resolve" &&
      stmt.expression.callee.property.type === "Identifier" &&
      stmt.expression.callee.property.name === "then"
    ) {
      steps.push({
        type: "push",
        target: "microtaskQueue",
        value: "Promise.then()",
        lineNumber: line,
      });

      const callback = stmt.expression.arguments[0];
      if (
        callback?.type === "ArrowFunctionExpression" ||
        callback?.type === "FunctionExpression"
      ) {
        const logs = extractLogsFromCallback(callback.body);
        for (const msg of logs) {
          microtasks.push({ label: msg, line });
        }
      }
    }
  }

  steps.push({
    type: "pop",
    target: "callStack",
    lineNumber: code.split("\n").length,
  });

  // Microtasks (before task queue)
  for (const { label, line } of microtasks) {
    steps.push({
      type: "move",
      from: "microtaskQueue",
      to: "callStack",
      lineNumber: line,
    });
    addLog(label, line);
    steps.push({ type: "pop", target: "callStack", lineNumber: line });
  }

  // Task queue
  for (const { label, line } of tasks) {
    steps.push({
      type: "move",
      from: "webAPIs",
      to: "taskQueue",
      lineNumber: line,
    });
    steps.push({
      type: "move",
      from: "taskQueue",
      to: "callStack",
      lineNumber: line,
    });
    addLog(label, line);
    steps.push({ type: "pop", target: "callStack", lineNumber: line });
  }

  return steps;
}
