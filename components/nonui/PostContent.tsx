"use client";

import { PortableText } from "@portabletext/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { motion } from "framer-motion";
import { urlFor } from "@/lib/sanity";
import {
  PortableTextBlock,
  PortableTextMarkDefinition,
} from "@portabletext/types";

interface Post {
  title: string;
  slug: { current: string; _type: "slug" };
  summary?: string;
  description: PortableTextBlock[];
  videoUrl?: string;
  techStack?: string[];
  thumbnail?: {
    asset: {
      _ref: string;
    };
    alt?: string;
    crop?: { top: number; bottom: number; left: number; right: number };
    hotspot?: { x: number; y: number; height: number; width: number };
  };
}

// Define custom Portable Text components with improved spacing
const portableTextComponents = {
  block: {
    h1: ({ children }: { children?: React.ReactNode }) => (
      <h1 className="text-4xl font-extrabold mb-8 mt-8 text-blue-700">
        {children}
      </h1>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-3xl font-bold mb-6 mt-7 text-blue-700">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-2xl font-semibold mb-5 mt-6 text-blue-700">
        {children}
      </h3>
    ),
    h4: ({ children }: { children?: React.ReactNode }) => (
      <h4 className="text-xl font-medium mb-4 mt-5 text-blue-700">
        {children}
      </h4>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-4 leading-relaxed text-gray-600">{children}</p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-blue-300 pl-4 py-2 italic my-6 text-gray-600">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc pl-5 mb-6 mt-4 space-y-1 text-gray-600">
        {children}
      </ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal pl-5 mb-6 mt-4 space-y-1 text-gray-600">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li className="mb-1">{children}</li>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <li className="mb-1">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-bold text-blue-700">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic text-gray-600">{children}</em>
    ),
    link: ({
      value,
      children,
    }: {
      value?: PortableTextMarkDefinition & { href: string };
      children?: React.ReactNode;
    }) => {
      const target = (value?.href || "").startsWith("http")
        ? "_blank"
        : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === "_blank" ? "noindex nofollow" : undefined}
          className="text-blue-700 hover:underline"
        >
          {children}
        </a>
      );
    },
    code: ({ children }: { children?: React.ReactNode }) => (
      <code className="bg-blue-50 p-1 rounded font-mono text-sm text-blue-700">
        {children}
      </code>
    ),
  },
};

// Helper function to extract YouTube video ID for clean embed URLs
const getYouTubeVideoId = (url: string): string | null => {
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

export default function PostContent({ post }: { post: Post }) {
  const youtubeVideoId = post.videoUrl
    ? getYouTubeVideoId(post.videoUrl)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden shadow-lg hover:shadow-blue-500/20 transition-shadow">
        <div className="lg:grid lg:grid-cols-3 lg:gap-6">
          <div className="lg:col-span-2">
            <CardHeader className="flex flex-col items-center text-center lg:items-start lg:text-left">
              {post.thumbnail && (
                <Image
                  src={urlFor(post.thumbnail)
                    .width(200)
                    .height(200)
                    .fit("crop")
                    .quality(80)
                    .url()}
                  alt={post.thumbnail.alt || `${post.title} thumbnail`}
                  width={200}
                  height={200}
                  loading="lazy"
                  className="object-cover rounded-xl mb-4"
                />
              )}
              <CardTitle className="text-3xl text-blue-700">
                {post.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose lg:prose-xl text-gray-600">
                <PortableText
                  value={post.description}
                  components={portableTextComponents}
                />
              </div>
            </CardContent>
          </div>
          <div className="lg:col-span-1 p-4 lg:p-0">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.techStack?.map((tech: string) => (
                <Badge
                  key={tech}
                  className="bg-blue-50 text-blue-700 border-blue-200"
                >
                  {tech}
                </Badge>
              ))}
            </div>
            {post.videoUrl && youtubeVideoId && (
              <div className="mb-6 aspect-video w-full shadow-md rounded-xl border border-blue-200">
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                  title={`YouTube video player for ${post.title}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  className="rounded-xl w-full h-full"
                />
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
