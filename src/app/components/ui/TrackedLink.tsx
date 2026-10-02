"use client";

import { analytics } from "@/app/lib/analytics";

type TrackEvent =
  | { kind: "cv"; locale: string }
  | { kind: "social"; platform: "linkedin" | "github" | "email" | "phone" }
  | { kind: "external"; name: string };

export default function TrackedLink({
  event,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { event: TrackEvent }) {
  return (
    <a
      {...props}
      onClick={(e) => {
        if (event.kind === "cv") analytics.cvDownload(event.locale);
        else if (event.kind === "social") analytics.socialClick(event.platform);
        else analytics.externalLink(event.name, props.href ?? "");
        props.onClick?.(e);
      }}
    />
  );
}
