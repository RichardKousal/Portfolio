import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

type Metadata = {
  title: string;
  description?: string;
  image?: string;
  type?: string;
};

type ContainerBlockProps = {
  children: React.ReactNode;
  customMeta?: Metadata;
};

export default function ContainerBlock({
  children,
  customMeta,
}: ContainerBlockProps) {
  const router = useRouter();

  const meta: Metadata = {
    title: "Richard Kousal - Test Automation Engineer",
    description: "Richard Kousal - Test Automation Engineer",
    image: "/public/avatar2.png",
    type: "website",
    ...customMeta,
  };

  return (
    <div>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta
          property="og:url"
          content={`https://richardkousal.com${router.asPath}`}
        />
        <link
          rel="canonical"
          href={`https://richardkousal.com${router.asPath}`}
        />
        <meta property="og:type" content={meta.type} />
        <meta
          property="og:site_name"
          content="Richard Kousal - Test Automation Engineer"
        />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />

        {/* Metadata specific for LinkedIn */}
        <meta name="title" content={meta.title} />
        <meta name="description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={meta.image} />
        <meta
          property="og:url"
          content={`https://richardkousal.com${router.asPath}`}
        />
        <meta
          property="og:site_name"
          content="Richard Kousal - Test Automation Engineer"
        />
        <meta name="author" content="Richard Kousal" />
        <meta
          name="keywords"
          content="Test Automation Engineer, Richard Kousal"
        />
      </Head>
      <main>{children}</main>
    </div>
  );
}
