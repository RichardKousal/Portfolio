// The real root layout (with <html>/<body>) lives in app/[locale]/layout.tsx.
// This pass-through exists so app/not-found.tsx can handle non-locale 404s.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
