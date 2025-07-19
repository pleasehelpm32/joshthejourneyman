"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // Add X for close icon
import { motion } from "framer-motion"; // For animations

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <Image
            src="/jslogo.png" // Use your logo here
            alt="Josh's Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
        </Link>
        <div className="flex-grow flex justify-center">
          <div className="hidden md:flex gap-6">
            <Link
              href="/"
              className="text-blue-700 hover:text-blue-900 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-blue-700 hover:text-blue-900 font-medium transition-colors"
            >
              About
            </Link>
          </div>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5 text-blue-700" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[250px] bg-background/95 backdrop-blur-md border-l border-border [&>button]:hidden" // Hide default close button
          >
            <SheetHeader className="flex flex-row items-center justify-between mb-4">
              <span className="text-lg font-semibold text-blue-700">Menu</span>
              <SheetClose asChild>
                <Button variant="ghost" size="icon">
                  <X className="h-5 w-5 text-blue-700" />
                </Button>
              </SheetClose>
            </SheetHeader>
            <Separator className="mb-4" />
            <motion.div
              className="flex flex-col gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                href="/"
                className="text-blue-700 hover:text-blue-900 font-medium transition-colors text-lg py-2 px-4 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-blue-700 hover:text-blue-900 font-medium transition-colors text-lg py-2 px-4 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                About
              </Link>
            </motion.div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
