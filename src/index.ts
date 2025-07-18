import { renderToString } from "react-dom/server";
import Index, { ChangeSongButton, MusicPlayerWithLabel } from "./pages/index";
import { renderWithLayout } from "./render-utils";
import { serveStatic } from "./static-utils";
import NotFoundPage from "./pages/404";
import { NotFound } from "./pages/request-utils";
import type { BunFile } from "bun";
import { join } from "node:path";

const port = Number(process.env.PORT ?? 3000);
const hostname = process.env.HOSTNAME ?? "localhost";
const publicDir = join(process.cwd(), "/public");
const songsDir = join(publicDir, "songs");

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
      const containerHtml = MusicPlayerWithLabel({ filename: filename });
      return new Response(renderToString(containerHtml), {
        headers: {
          "Content-Type": "text/html",
          "Cache-Control": "no-store", // fixes cache messing up reloading
        },
      });
    },

    "/add-song": async function (request) {
      const formData = await request.formData();
      const file = formData.get("file") as File;
      if (!file) {
        return NotFound("Missing filename");
      }

      await Bun.write(join(songsDir, file.name), file, {
        createPath: true,
      });

      const btn = ChangeSongButton({ songname: file.name });
      return new Response(renderToString(btn), {
        headers: {
          "Content-Type": "text/html",
          "Cache-Control": "no-store",
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
    return await serveStatic(request, songsDir);
  },
});
console.log("Started on", server.url.origin);
