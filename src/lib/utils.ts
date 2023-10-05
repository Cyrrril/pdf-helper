import { type ClassValue, clsx } from "clsx";
import { Metadata } from "next";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  if (typeof window !== "undefined") return path;

  if (process.env.VERCEL_URl) return `https://${process.env.VERCEL_URL}${path}`;

  return `http://localhost:${process.env.PORT ?? 3000}${path}`;
}

export function constructMetadata({
  title = "PDF Helper",
  description = "An open source software to chat with your PDFs",
  image = "/thumbnail.png",
  icons = "/favion.ico",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@Cyrrril",
    },
    icons,
    metadataBase: new URL("https://pdf-helper-seven.vercel.app"),
    themeColor: "#FFF",
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
