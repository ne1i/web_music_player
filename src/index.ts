import Index from "./pages/index";
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
  },

  fetch: async function (request) {
    return await serveStatic(request, publicDir);
  },
});
console.log("Started on", server.url.origin);
