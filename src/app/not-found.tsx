import "@/app/globals.css";

// Fallback 404 for paths outside a valid locale (rendered without the locale layout).
export default function GlobalNotFound() {
  return (
    <html lang="cs">
      <body className="flex min-h-screen items-center justify-center bg-paper px-4 font-body text-ink">
        <main className="text-center">
          <h1 className="font-mono text-2xl text-warn">✗ 404</h1>
          <p className="mt-4 text-muted">Stránka nenalezena · Page not found</p>
          <p className="mt-6 flex justify-center gap-4">
            <a href="/cs" className="link">Domů</a>
            <a href="/en" className="link">Home</a>
          </p>
        </main>
      </body>
    </html>
  );
}
