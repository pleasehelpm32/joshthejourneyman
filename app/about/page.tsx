// app/about/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Josh | Developer Portfolio",
  description:
    "Learn more about Josh Singarayer's journey as a developer, passions, and upcoming projects.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-700">
        About Me
      </h1>

      <section className="mb-12">
        <p className="text-lg mb-6 text-gray-600">
          Hi, I'm Josh—a passionate developer leveraging AI to build interactive
          web apps with TypeScript, Next.js, React, Tailwind, and more. With a
          background in front-end development, I've created projects ranging
          from dynamic portfolios to AI-integrated applications. I'm driven by
          clean code, intuitive user experiences, and the endless potential of
          emerging technologies.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-blue-700">
          My Journey into Development
        </h2>
        <p className="text-lg mb-6 text-gray-600">
          I first discovered coding during my fourth year of university, taking
          an introductory course purely for enjoyment. It sparked something in
          me, but at the time, I was set on pursuing medicine. As years passed,
          that initial curiosity lingered, though self-teaching efforts never
          fully took root—until two years ago, when I committed fully. AI became
          my game-changer, helping me navigate roadblocks and accelerate
          learning. Starting with JavaScript fundamentals, I progressed to
          frameworks like React and Next.js, embracing tools like Tailwind for
          efficient styling and TypeScript for robust, scalable code. We're
          still in the early days of AI's evolution, but it's empowered me to
          turn ideas into reality faster than ever. Today, I heavily integrate
          AI into my workflow for personal projects and client work, positioning
          myself at the forefront of this transformative era in development.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-blue-700">
          What Makes Me Stand Out
        </h2>
        <p className="text-lg mb-6 text-gray-600">
          Beyond code, I thrive on personal growth and diverse experiences. To
          build confidence and adaptability—key traits for any developer—I
          completed a 10-week improv class, pushing myself into one of life's
          scariest challenges. It sharpened my quick thinking and creativity,
          skills I now apply to problem-solving in tech. I'm an avid listener of
          the "My First Million" podcast, which fuels my entrepreneurial mindset
          and inspires innovative side projects. On a personal note, in 2024, I
          tore my ACL playing basketball—a setback that tested my resilience.
          Through dedicated rehab, I've emerged stronger than ever, embodying
          the perseverance that drives my coding journey.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-blue-700">Looking Ahead</h2>
        <p className="text-lg mb-6 text-gray-600">
          I'm excited about upcoming projects, including automating my Medium
          articles for seamless content creation and diving into web3 with a
          project leveraging MCP (as a longtime follower of the space, this
          marks my first hands-on venture). These reflect my commitment to
          blending AI with emerging tech.
        </p>
      </section>

      <p className="text-lg text-center text-gray-600">
        If you're interested in collaborating on innovative web solutions or
        just want to chat about AI's role in development, feel free to reach
        out—I'm always open to new connections!
      </p>
    </div>
  );
}

export const revalidate = 300; // Revalidate every 5 minutes
