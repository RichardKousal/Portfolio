import { notFound } from "next/navigation";

// Catch-all so unknown paths under a locale render the localized 404 page.
export default function CatchAllPage() {
  notFound();
}
