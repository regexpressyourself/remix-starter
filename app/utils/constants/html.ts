import manifest from "~/manifest.json";

export const HTML_HEAD = [
  { name: "twitter:image", content: manifest.twitterImage },
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:creator", content: manifest.twitterHandle },
  { name: "twitter:site", content: manifest.twitterSite },
  { name: "twitter:title", content: manifest.title },
  { name: "twitter:description", content: manifest.description },
  { name: "keywords", content: manifest.keywords },
  { name: "og:description", content: manifest.description },
  { name: "og:image", content: manifest.twitterImage },
  { name: "og:title", content: manifest.title },
  { name: "og:type", content: "website" },
  { name: "og:url", content: manifest.twitterSite },
];

export const DEFAULT_TITLE_DESC = [
  { title: manifest.title },
  { name: "description", content: manifest.description },
];
