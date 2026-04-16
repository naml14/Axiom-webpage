import { resolve } from "node:path";

const publicDir = resolve("public");

const mimeTypes: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
};

const buildResult = await Bun.build({
  entrypoints: [resolve("src/main.ts")],
  outdir: publicDir,
  target: "browser",
  format: "esm",
  minify: true,
});

if (!buildResult.success) {
  for (const log of buildResult.logs) {
    console.error(log.message);
  }
  process.exit(1);
}

const server = Bun.serve({
  port: 3000,
  async fetch(request) {
    const url = new URL(request.url);
    let filename = url.pathname === "/" ? "index.html" : url.pathname;
    if (filename.startsWith("/")) {
      filename = filename.slice(1);
    }

    const filePath = resolve(publicDir, filename);
    const file = Bun.file(filePath);

    if (!(await file.exists())) {
      return new Response("Not found", { status: 404 });
    }

    const ext = filename.slice(filename.lastIndexOf("."));
    return new Response(file, {
      headers: { "content-type": mimeTypes[ext] ?? "application/octet-stream" },
    });
  },
});

console.log(`Axiom landing page running at http://localhost:${server.port}`);
