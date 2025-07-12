// app/page.tsx (updated)
import { client, urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";

// Updated query: Added summary
async function getPosts() {
  const query = `*[_type == "post"] {
    title,
    slug,
    summary, // New field
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
      {/* Hero/About Section (unchanged) */}
      <section className="py-12 md:py-24 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4 text-center">
          <Avatar className="mx-auto h-24 w-24 mb-4">
            <AvatarImage src="/your-avatar.jpg" alt="Your Name" />
            <AvatarFallback>YN</AvatarFallback>
          </Avatar>
          <h1 className="text-4xl font-bold mb-4">Hi, I'm [Your Name]</h1>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            A front-end developer passionate about building interactive web apps
            with TypeScript, Next.js, and more. Check out my projects below!
          </p>
          <div className="flex justify-center gap-2">
            <Badge variant="secondary">TypeScript</Badge>
            <Badge variant="secondary">Next.js</Badge>
            <Badge variant="secondary">Tailwind</Badge>
            <Badge variant="secondary">shadcn/ui</Badge>
          </div>
        </div>
      </section>
      {/* Projects Section  */}

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">My Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post: any) => (
              <Link
                key={post.slug.current}
                href={`/posts/${post.slug.current}`}
                className="block" // Makes the link block-level for full card coverage
                aria-label={`Read more about ${post.title}`} // Accessibility
              >
                <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow hover:scale-105 cursor-pointer">
                  {" "}
                  {/* Hover effects for clickability */}
                  <CardHeader className="p-0">
                    {" "}
                    {/* Thumbnail at top */}
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
                      <div className="bg-muted h-48 flex items-center justify-center rounded-t-lg aspect-video">
                        <p className="text-muted-foreground text-sm">
                          No thumbnail available
                        </p>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="pt-4">
                    <CardTitle>{post.title}</CardTitle>
                    {post.summary && (
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                        {post.summary}
                      </p>
                    )}
                    <CardDescription className="flex gap-2 mt-2">
                      {post.techStack?.map((tech: string) => (
                        <Badge key={tech} variant="outline">
                          {tech}
                        </Badge>
                      ))}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    {" "}
                    {/* Centers the button */}
                    <Button variant="ghost">Read More →</Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* Contact Section and Footer (unchanged) */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <p className="mb-6">
            Interested in collaborating or hiring? Reach out!
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild>
              <a href="mailto:your.email@example.com">Email Me</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="https://github.com/yourusername" target="_blank">
                GitHub
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="https://linkedin.com/in/yourprofile" target="_blank">
                LinkedIn
              </a>
            </Button>
          </div>
        </div>
      </section>
      <footer className="py-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} [Your Name]. Built with Next.js and
        Sanity.
      </footer>
    </div>
  );
}

export const revalidate = 60;
