import { renderToString } from "react-dom/server";
import type { JSX } from "react/jsx-runtime";
import DefaultLayout from "./pages/default-layout";

export function renderWithLayout(
  children: React.ReactNode | React.ReactNode[],
  layout = DefaultLayout,
  init?: ResponseInit
) {
  return html(layout({ children }), init);
}

export function renderNoLayout({
  children,
  init,
}: {
  children: JSX.Element | JSX.Element[];
  init?: ResponseInit;
}) {
  return html([...(Array.isArray(children) ? children : [children])], init);
}

export function html(
  children: JSX.Element | JSX.Element[],
  init?: ResponseInit
) {
  const sb = renderToString(children);

  return new Response(sb, {
    ...init,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store", // fixes cache messing up reloading
      ...init?.headers,
    },
  });
}
