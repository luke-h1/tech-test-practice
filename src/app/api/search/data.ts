import { SearchResponse } from "@frontend/services/searchService";

const searchResponses: SearchResponse[] = [
  {
    title: "Introduction to TypeScript",
    url: "https://example.com/typescript-intro",
    description: "A comprehensive guide to getting started with TypeScript.",
    userRole: ["admin", "editor"],
  },
  {
    title: "Understanding JavaScript Promises",
    url: "https://example.com/js-promises",
    description:
      "An in-depth explanation of JavaScript promises with examples.",
    userRole: ["viewer", "developer"],
  },
  {
    title: "CSS Grid Layout",
    url: "https://example.com/css-grid",
    description: "Learn how to use CSS Grid to build modern layouts easily.",
    userRole: ["editor", "designer"],
  },
  {
    title: "Python for Data Science",
    url: "https://example.com/python-data-science",
    description:
      "Explore Python libraries and techniques for data science applications.",
    userRole: ["admin", "data-scientist"],
  },
  {
    title: "React Performance Optimization",
    url: "https://example.com/react-performance",
    description:
      "Tips and tricks to improve performance in React applications.",
    userRole: ["developer", "team-lead"],
  },
  ...Array.from({ length: 100 }, (_, i) => ({
    title: `Generated Article ${i + 1}`,
    url: `https://example.com/generated-article-${i + 1}`,
    description: `Description for generated article ${
      i + 1
    }. This is a sample description to test the interface with varied data inputs.`,
    userRole: i % 2 === 0 ? ["admin", "viewer"] : ["editor", "developer"],
  })),
];
export default searchResponses;
