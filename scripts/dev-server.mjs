import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const args = process.argv.slice(2);
const value = (name, fallback) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : fallback;
};
const host = value("--host", "127.0.0.1");
const port = Number(value("--port", process.env.PORT || 3000));
const root = process.cwd();
const types = { ".html":"text/html; charset=utf-8", ".css":"text/css; charset=utf-8", ".js":"text/javascript; charset=utf-8", ".webp":"image/webp", ".png":"image/png", ".svg":"image/svg+xml" };

createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, `http://${req.headers.host}`).pathname);
    const relative = pathname === "/" ? "website2/home.html" : pathname.replace(/^\/+/, "");
    const file = normalize(join(root, relative));
    if (!file.startsWith(root) || !(await stat(file)).isFile()) throw new Error("not found");
    res.writeHead(200, { "content-type": types[extname(file)] || "application/octet-stream" });
    res.end(await readFile(file));
  } catch {
    res.writeHead(404, { "content-type":"text/plain; charset=utf-8" });
    res.end("Not found");
  }
}).listen(port, host, () => console.log(`DentXpert preview: http://${host}:${port}`));
