// app/posts/[slug]/page.tsx
import { client, urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

// Fetch a single post by slug (unchanged)
async function getPost(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    title,
    summary,
    description,
    videoUrl,
    techStack,
    thumbnail
  }`;
  return client.fetch(query, { slug });
}

// Generate static params for all posts (fetches slugs at build time)
export async function generateStaticParams() {
  const query = `*[_type == "post"] { "slug": slug.current }`;
  const posts = await client.fetch(query);
  return posts.map((post: { slug: string }) => ({ slug: post.slug }));
}

// Helper function to extract YouTube video ID for clean embed URLs
const getYouTubeVideoId = (url: string) => {
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// Define custom Portable Text components with improved spacing
const portableTextComponents = {
  // Styles for block types (paragraphs, headings, quotes)
  block: {
    // Increased bottom margin for headings
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-extrabold mb-6 mt-8">{children}</h1>
    ), // More space above and below
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-bold mb-5 mt-7">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-semibold mb-4 mt-6">{children}</h3>
    ), // This would be good for "Week 42 Milestones" and "Motivation Corner"
    h4: ({ children }: any) => (
      <h4 className="text-xl font-medium mb-3 mt-5">{children}</h4>
    ),
    // Added margin-bottom to paragraphs
    normal: ({ children }: any) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 py-2 italic my-6">
        {children}
      </blockquote>
    ), // More vertical margin
  },

  // Components for list items
  list: {
    // Added margin-bottom and top for lists, and space-y for list items
    bullet: ({ children }: any) => (
      <ul className="list-disc pl-5 mb-6 mt-4 space-y-1">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal pl-5 mb-6 mt-4 space-y-1">{children}</ol>
    ),
  },

  listItem: {
    // mb-1 is fine here, as the space-y on the ul/ol handles the main spacing
    bullet: ({ children }: any) => <li className="mb-1">{children}</li>,
    number: ({ children }: any) => <li className="mb-1">{children}</li>,
  },

  // Components for marks (bold, italic, links)
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-bold">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
    link: ({ value, children }: any) => {
      const target = (value?.href || "").startsWith("http")
        ? "_blank"
        : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === "_blank" ? "noindex nofollow" : undefined}
          className="text-blue-600 hover:underline"
        >
          {children}
        </a>
      );
    },
    code: ({ children }: any) => (
      <code className="bg-gray-100 p-1 rounded font-mono text-sm">
        {children}
      </code>
    ),
  },
};

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
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
      <Link href="/" className="text-blue-500 hover:underline mb-6 block">
        &larr; Back to Home
      </Link>
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-col items-center text-center">
          {post.thumbnail && (
            <Image
              src={urlFor(post.thumbnail)
                .width(200)
                .height(200)
                .fit("crop")
                .url()}
              alt={post.title}
              width={200}
              height={200}
              className="object-cover rounded-lg mb-4"
            />
          )}
          <CardTitle className="text-3xl text-center">{post.title}</CardTitle>
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {post.techStack?.map((tech: string) => (
              <Badge key={tech} variant="outline">
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
          <div className="prose lg:prose-xl">
            {/* FIX: Pass the custom components here */}
            <PortableText
              value={post.description}
              components={portableTextComponents} // This applies your custom styles!
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export const revalidate = 60; // Revalidate every 60 seconds for fresh data
