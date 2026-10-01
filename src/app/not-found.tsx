import "@/app/globals.css";

// Fallback 404 for paths outside a valid locale (rendered without the locale layout).
export default function GlobalNotFound() {
  return (
    <html lang="cs">
      <body className="flex min-h-screen items-center justify-center bg-dark-bg px-4 font-body text-dark-text">
        <main className="text-center">
          <h1 className="font-heading text-6xl font-bold gradient-text">404</h1>
          <p className="mt-4 text-dark-muted">Stránka nenalezena · Page not found</p>
          <p className="mt-6 flex justify-center gap-4">
            <a href="/cs" className="link-arrow">Domů</a>
            <a href="/en" className="link-arrow">Home</a>
          </p>
        </main>
      </body>
    </html>
  );
}
