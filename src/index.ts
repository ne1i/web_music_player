import { renderToString } from "react-dom/server";
import Index, { MusicPlayerWithLabel } from "./pages/index";
import { renderWithLayout } from "./render-utils";
import { serveStatic } from "./static-utils";

const port = Number(process.env.PORT ?? 3000);
const hostname = process.env.HOSTNAME ?? "localhost";
const publicDir = process.cwd() + "/public";

const server = Bun.serve({
  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },

  port,
  hostname,

  routes: {
    "/": function () {
      return renderWithLayout(Index());
    },

    "/public/*": async function (request) {
      return await serveStatic(request);
    },

    "/change-audio": function (request) {
      const url = new URL(request.url);
      const filename = url.searchParams.get("file") || "knight.ogg";
      const containerHtml = MusicPlayerWithLabel({ filename });
      return new Response(renderToString(containerHtml), {
        headers: {
          "Content-Type": "text/html",
          "Cache-Control": "no-store", // fixes cache messing up reloading
        },
      });
    },

    "/debug": {
      GET: function (request) {
        return new Response();
      },
      POST: async function (request) {
        const text = await request.text();
        return new Response();
      },
    },
  },
  fetch: async function (request) {
    return await serveStatic(request, publicDir);
  },
});
console.log("Started on", server.url.origin);
