// app/posts/[slug]/page.tsx
import { client, urlFor } from "@/lib/sanity";
import { notFound } from "next/navigation"; // Add this import
import Link from "next/link";

import React from "react";
import { PortableTextBlock } from "@portabletext/types";
import PostContent from "@/components/nonui/PostContent";

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

export async function generateMetadata({
  params: paramsPromise,
}: {
  params: Promise<{ slug: string }>;
}) {
  const params = await paramsPromise;
  const post = await getPost(params.slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} | Josh's Portfolio`,
    description: post.summary || "A project by Josh Singarayer",
    openGraph: {
      title: post.title,
      description: post.summary,
      images: post.thumbnail ? [{ url: urlFor(post.thumbnail).url() }] : [],
    },
  };
}

export default async function PostPage({
  params: paramsPromise,
}: {
  params: Promise<{ slug: string }>;
}) {
  const params = await paramsPromise;
  const post = await getPost(params.slug);

  if (!post) {
    notFound(); // Use this to trigger 404 instead of custom message
  }

  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <nav aria-label="breadcrumb" className="mb-6">
        <ol className="flex space-x-2 text-sm text-gray-600">
          <li>
            <Link href="/" className="text-blue-700 hover:underline">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/" className="text-blue-700 hover:underline">
              Projects
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-600">{post.title}</li>
        </ol>
      </nav>
      <Link
        href="/"
        className="text-blue-700 hover:underline mb-6 block"
        aria-label="Back to home"
      >
        ← Back to Home
      </Link>
      <PostContent post={post} />
    </div>
  );
}

export const revalidate = 300; // Revalidate every 5 minutes
