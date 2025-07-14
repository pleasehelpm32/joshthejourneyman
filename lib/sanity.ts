// lib/sanity.ts
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  useCdn: true, // Set to false for real-time updates during dev
});

// Helper for generating image URLs (useful for thumbnails)
const builder = imageUrlBuilder(client);
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
