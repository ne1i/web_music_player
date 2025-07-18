import { renderWithLayout } from "./render-utils";
import NotFoundPage from "./pages/404";

export async function serveStatic(
  request: Request,
  rootDir: string = process.cwd()
) {
  console.info("Serving file", request.url);
  const path = rootDir + new URL(request.url).pathname;
  const response = await servePath(path);
  return response ?? renderWithLayout(NotFoundPage({ request }));
}

export async function servePath(path: string) {
  const file = Bun.file(path);
  if (await file.exists()) {
    console.info("Serving file", file.name, "Size", file.size);
    return new Response(Bun.file(path), {
      status: 200,
      headers: {
        "Content-Type": file.type,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }
}
