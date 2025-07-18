export function NotFound(message?: string) {
  return new Response(null, {
    status: 404,
    statusText: message ?? "Not Found",
  });
}
