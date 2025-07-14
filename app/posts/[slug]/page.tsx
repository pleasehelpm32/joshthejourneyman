// app/posts/[slug]/page.tsx
import { client, urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

import React from "react";
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
  };
}

// Ensure the return type of getPost is explicitly a Promise that resolves to Post or null
async function getPost(slug: string): Promise<Post | null> {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    title,
    summary,
    description,
    videoUrl,
    techStack,
    thumbnail,
    slug // Ensure slug is fetched if needed for other parts of the post object
  }`;
  const post: Post | null = await client.fetch(query, { slug });
  return post;
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const query = `*[_type == "post"] { "slug": slug.current }`;
  const posts: { slug: string }[] = await client.fetch(query);
  return posts.map((post) => ({ slug: post.slug }));
}

// Helper function to extract YouTube video ID for clean embed URLs
const getYouTubeVideoId = (url: string): string | null => {
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// Define custom Portable Text components with improved spacing
const portableTextComponents = {
  block: {
    h1: ({ children }: { children?: React.ReactNode }) => (
      <h1 className="text-4xl font-extrabold mb-6 mt-8 text-blue-700">
        {children}
      </h1>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-3xl font-bold mb-5 mt-7 text-blue-700">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-2xl font-semibold mb-4 mt-6 text-blue-700">
        {children}
      </h3>
    ),
    h4: ({ children }: { children?: React.ReactNode }) => (
      <h4 className="text-xl font-medium mb-3 mt-5 text-blue-700">
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

export default async function PostPage({
  params: paramsPromise, // Renamed for clarity
}: {
  params: Promise<{ slug: string }>; // FIX: Type params as a Promise
}) {
  const params = await paramsPromise; // FIX: Await the params Promise
  if (params.slug === "favicon.ico") {
    return null; // Or throw a 404: notFound();
  }
  const post = await getPost(params.slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  // Get YouTube video ID for proper iframe src
  const youtubeVideoId = post.videoUrl
    ? getYouTubeVideoId(post.videoUrl)
    : null;

  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <Link href="/" className="text-blue-700 hover:underline mb-6 block">
        &larr; Back to Home
      </Link>
      <Card className="overflow-hidden shadow-lg hover:shadow-blue-500/20 transition-shadow">
        <CardHeader className="flex flex-col items-center text-center">
          {post.thumbnail && (
            <Image
              src={urlFor(post.thumbnail)
                .width(200)
                .height(200)
                .fit("crop")
                .url()}
              alt={post.thumbnail.alt || post.title} // Use alt from Sanity or fallback
              width={200}
              height={200}
              className="object-cover rounded-lg mb-4"
            />
          )}
          <CardTitle className="text-3xl text-center text-blue-700">
            {post.title}
          </CardTitle>
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {post.techStack?.map((tech: string) => (
              <Badge
                key={tech}
                className="bg-blue-50 text-blue-700 border-blue-200"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          {post.videoUrl && youtubeVideoId && (
            <div className="mb-6 aspect-video w-full">
              <iframe
                src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                title={`YouTube video player for ${post.title}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="rounded-lg w-full h-full"
              />
            </div>
          )}
          <div className="prose lg:prose-xl text-gray-600">
            <PortableText
              value={post.description}
              components={portableTextComponents}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export const revalidate = 60; // Revalidate every 60 seconds for fresh data
