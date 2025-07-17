"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { urlFor } from "@/lib/sanity";
import { PortableTextBlock } from "@portabletext/react";

interface Post {
  title: string;
  slug: { current: string };
  summary?: string;
  description?: PortableTextBlock[];
  videoUrl?: string;
  techStack?: string[];
  thumbnail?: {
    asset: { _ref: string };
    alt?: string;
    crop?: { top: number; bottom: number; left: number; right: number };
    hotspot?: { x: number; y: number; height: number; width: number };
  };
}

export default function ProjectGrid({ posts }: { posts: Post[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post: Post, index: number) => (
        <motion.div
          key={post.slug.current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Link
            href={`/posts/${post.slug.current}`}
            className="block"
            aria-label={`Read more about ${post.title}`}
          >
            <Card className="overflow-hidden shadow-lg hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 hover:scale-105 cursor-pointer border-gray-200 group relative">
              {index === 0 && (
                <Badge className="absolute top-2 right-2 bg-blue-700 text-white">
                  Featured
                </Badge>
              )}
              <CardHeader className="p-0">
                {post.thumbnail ? (
                  <Image
                    src={urlFor(post.thumbnail)
                      .width(400)
                      .height(225)
                      .fit("crop")
                      .quality(80)
                      .url()}
                    alt={`${post.title} thumbnail`}
                    width={400}
                    height={225}
                    loading="lazy"
                    className="object-cover w-full aspect-video rounded-xl"
                  />
                ) : (
                  <div className="bg-blue-50 h-48 flex items-center justify-center rounded-xl aspect-video bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGgyMFYyMEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0xMCAyTTIwIDJNMCAxMiIgc3Ryb2tlPSIjQ0NDIiBvcGFjaXR5PSIuNSIvPjwvc3ZnPg==')]">
                    <p className="text-blue-700 text-sm">No thumbnail</p>
                  </div>
                )}
              </CardHeader>
              <CardContent className="pt-4">
                <CardTitle className="text-blue-700">{post.title}</CardTitle>
                {post.summary && (
                  <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                    {post.summary}
                  </p>
                )}
                <CardDescription className="flex flex-wrap gap-2 mt-2">
                  {post.techStack?.map((tech: string) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className="text-blue-700 border-blue-200"
                    >
                      {tech}
                    </Badge>
                  ))}
                </CardDescription>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button
                  variant="ghost"
                  className="text-blue-700 hover:text-blue-800 hover:bg-blue-50 group-hover:translate-x-1 transition-transform"
                  aria-label={`Read more about ${post.title}`}
                >
                  Read More →
                </Button>
              </CardFooter>
            </Card>
          </Link>
        </motion.div>
      ))}
      {posts.length === 0 && (
        <p className="text-center text-gray-600 col-span-full">
          Projects coming soon!
        </p>
      )}
    </div>
  );
}
