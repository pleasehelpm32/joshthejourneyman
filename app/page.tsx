// app/page.tsx
import { client, urlFor } from "@/lib/sanity";

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";
import { PortableTextBlock } from "@portabletext/react";

interface Post {
  title: string;
  slug: { current: string }; // Slugs have a 'current' property
  summary?: string; // Optional field
  description?: PortableTextBlock[]; // For now, keep as any for simplicity or define PortableText types
  videoUrl?: string; // Optional URL
  techStack?: string[]; // Array of strings
  thumbnail?: {
    // Sanity image type, simplify for now
    asset: {
      _ref: string;
    };
    // Add other Sanity image properties you might use
  };
}

// Updated query (unchanged)
async function getPosts() {
  const query = `*[_type == "post"] {
    title,
    slug,
    summary,
    description,
    videoUrl,
    techStack,
    thumbnail
  }`;
  return client.fetch(query);
}

export default async function Home() {
  const posts = await getPosts();
  const skills = ["TypeScript", "Next.js", "Tailwind", "shadcn/ui"]; // Example; fetch or customize

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero/About Section (updated with blue gradient and accents) */}
      <section className="py-12 md:py-24 bg-gradient-to-b from-blue-50 to-background">
        <div className="container mx-auto px-4 text-center">
          <Avatar className="mx-auto h-24 w-24 mb-4 rounded-full bg-gradient-to-br from-blue-700 to-blue-900 border-4 border-blue-200 shadow-xl">
            <AvatarImage src="/your-avatar.jpg" alt="Your Name" />
            <AvatarFallback className="text-white font-bold text-4xl">
              YN
            </AvatarFallback>
          </Avatar>
          <h1 className="text-4xl font-bold mb-4 text-blue-700">
            Hi, I am Joshus Singarayer
          </h1>
          <p className="text-lg mb-6 max-w-2xl mx-auto text-gray-600">
            A front-end developer passionate about building interactive web apps
            with TypeScript, Next.js, and more. Check out my projects below!
          </p>
          <div className="flex justify-center flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge
                key={skill}
                className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 transition-colors"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section (updated with blue accents and hovers) */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">
            My Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post: Post) => (
              <Link
                key={post.slug.current}
                href={`/posts/${post.slug.current}`}
                className="block"
                aria-label={`Read more about ${post.title}`}
              >
                <Card className="overflow-hidden shadow-lg hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 hover:scale-105 cursor-pointer border-gray-200 group">
                  <CardHeader className="p-0">
                    {post.thumbnail ? (
                      <Image
                        src={urlFor(post.thumbnail)
                          .width(400)
                          .height(225)
                          .fit("crop")
                          .url()}
                        alt={post.title}
                        width={400}
                        height={225}
                        className="object-cover w-full aspect-video rounded-t-lg"
                      />
                    ) : (
                      <div className="bg-blue-50 h-48 flex items-center justify-center rounded-t-lg aspect-video">
                        <p className="text-blue-700 text-sm">
                          No thumbnail available
                        </p>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="pt-4">
                    <CardTitle className="text-blue-700">
                      {post.title}
                    </CardTitle>
                    {post.summary && (
                      <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                        {post.summary}
                      </p>
                    )}
                    <CardDescription className="flex gap-2 mt-2">
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
                    >
                      Read More →
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section and Footer (updated with blue accents) */}
      <section className="py-12 bg-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-blue-700">
            Get in Touch
          </h2>
          <p className="mb-6 text-gray-600">
            Interested in collaborating or hiring? Reach out!
          </p>
          <div className="flex justify-center gap-4">
            <Button
              className="bg-blue-700 hover:bg-blue-800 text-white"
              asChild
            >
              <a href="mailto:your.email@example.com">Email Me</a>
            </Button>
            <Button
              variant="outline"
              className="border-blue-200 text-blue-700 hover:bg-blue-50"
              asChild
            >
              <a href="https://github.com/yourusername" target="_blank">
                GitHub
              </a>
            </Button>
            <Button
              variant="outline"
              className="border-blue-200 text-blue-700 hover:bg-blue-50"
              asChild
            >
              <a href="https://linkedin.com/in/yourprofile" target="_blank">
                LinkedIn
              </a>
            </Button>
          </div>
        </div>
      </section>
      <footer className="py-4 text-center text-sm text-gray-600 bg-white border-t border-blue-100">
        © {new Date().getFullYear()} [Your Name]. Built with Next.js and
        Sanity.
      </footer>
    </div>
  );
}

export const revalidate = 60;
