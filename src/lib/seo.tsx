import { useHead } from "@unhead/react";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export function SEO({
  title,
  description = "Connect with blood donors and save lives with RedLink.",
  image = "/og-image.jpg",
  url = "https://redlink.app",
}: SEOProps) {
  useHead({
    // Fallback title if none is provided
    title: title || "Blood Donation Platform",
    // Global title template
    titleTemplate: "%s | RedLink",

    meta: [
      { name: "description", content: description },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "oklch(0.7830 0.0384 132.7370)" },

      // Open Graph / Facebook
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      {
        property: "og:title",
        content: title ? `${title} | RedLink` : "RedLink",
      },
      { property: "og:description", content: description },
      { property: "og:image", content: image },

      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title || "RedLink" },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
    ],
  });

  return null;
}
