// app/page.tsx
import { client } from "@/lib/sanity";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Github, Linkedin, Mail } from "lucide-react";
import { Suspense } from "react";
import ProjectGrid from "@/components/nonui/ProjectGrid";
import ThemeSwitcher from "@/components/nonui/ThemeSwitcher";
import TypingEffect from "@/components/nonui/TypingEffect";

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

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero/About Section */}
      <section className="py-12 md:py-24 bg-gradient-to-b from-blue-100 to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <Avatar className="mx-auto h-24 w-24 md:h-32 md:w-32 mb-4 rounded-full bg-gradient-to-br from-blue-700 to-blue-900 border-4 border-blue-200 shadow-xl shadow-blue-500/20">
            <AvatarImage
              src="/jslogo.png"
              alt="Joshua Singarayer profile picture"
            />
            <AvatarFallback className="text-white font-bold text-4xl">
              JS
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-wrap justify-center items-center gap-2 mb-4">
            <h1 className="text-4xl font-bold text-blue-700">
              Hi, I&apos;m Josh.
            </h1>
            <TypingEffect /> {/* Placed beside with flex */}
          </div>
          <p className="text-lg mb-6 max-w-2xl mx-auto text-gray-600">
            A developer leveraging AI to build interactive web apps with
            TypeScript, Next.js, React, Tailwind and more. With a background in
            front-end development, I&apos;ve built projects ranging from dynamic
            portfolios to AI-integrated apps. Passionate about clean code and
            user experience.
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">
            My Projects
          </h2>
          <Suspense fallback={<ProjectsSkeleton />}>
            <ProjectGrid posts={posts} />
          </Suspense>
        </div>
      </section>

      {/* Contact Section */}
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
              variant="outline"
              className="bg-white text-blue-700 border-blue-200 hover:bg-blue-700 hover:text-white transition-colors duration-300"
              asChild
            >
              <a href="mailto:joshuasingarayer@gmail.com" aria-label="Email me">
                <Mail className="mr-2 h-4 w-4" /> Email Me
              </a>
            </Button>
            <Button
              variant="outline"
              className="bg-white text-blue-700 border-blue-200 hover:bg-blue-700 hover:text-white transition-colors duration-300"
              asChild
            >
              <a
                href="https://github.com/pleasehelpm32"
                target="_blank"
                aria-label="My GitHub"
              >
                <Github className="mr-2 h-4 w-4" /> GitHub
              </a>
            </Button>
            <Button
              variant="outline"
              className="bg-white text-blue-700 border-blue-200 hover:bg-blue-700 hover:text-white transition-colors duration-300"
              asChild
            >
              <a
                href="https://www.linkedin.com/in/joshuasingarayer/"
                target="_blank"
                aria-label="My LinkedIn"
              >
                <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
              </a>
            </Button>
          </div>
        </div>
      </section>
      <footer className="py-4 text-center text-sm text-gray-600 bg-white border-t border-blue-100">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <span>
            © {new Date().getFullYear()} Joshua Singarayer. Built with Next.js
            and Sanity.
          </span>
          <ThemeSwitcher />
        </div>
      </footer>
    </div>
  );
}

function ProjectsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(3)].map((_, i) => (
        <Skeleton key={i} className="h-64 w-full rounded-xl" />
      ))}
    </div>
  );
}

export const revalidate = 300;
