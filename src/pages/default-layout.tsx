import Imports from "./imports";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>DELTARUNE MUSIC PLAYER</title>
          <Imports />
        </head>
        <body className="">
          <div className="container mx-auto p-4">{children}</div>
        </body>
      </html>
    </>
  );
}
