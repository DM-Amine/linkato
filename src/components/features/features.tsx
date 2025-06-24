"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FeatureCard } from "@/components/features/featureCard"
import { Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";

import { Input } from "@/components/ui/input";

const categories = [
  "All",
  "SEO",
  "Productivity",
  "AI Powered",
  "Editor",
  "Structure",
  "Collaboration",

];

const features = [
  {
    _id: "661f7e4a1e8a4c89c7a7a001",
    slug: "ai-blog-generator",
    title: "AI Blog Generator",
    createdAt: "2025-04-10T12:00:00.000Z",
    image:
      "https://cdn.kwork.com/files/portfolio/t3/70/3a643d0b04a61ce695f7fff8265171a6cd99f0c7-1698997499.jpg",
    description:
      "Generate complete, SEO-ready blogs from short ideas in seconds.",
    category: "AI Powered",
    tag: "",
  },
  {
    _id: "661f7e4a1e8a4c89c7a7a002",
    slug: "seo-optimizer",
    title: "SEO Optimizer",
    createdAt: "2025-04-11T10:30:00.000Z",
    image:
      "https://cdn.dribbble.com/userupload/12405597/file/original-57a3dff0fb51f6715fc673b3da8f31d3.png?format=webp&resize=400x300&vertical=center",
    description:
      "Real-time suggestions to help your content rank better on search engines.",
    category: "SEO",
    tag: "",
  },
  {
    _id: "661f7e4a1e8a4c89c7a7a003",
    slug: "multi-workspace",
    title: "Multi-Project Workspace",
    createdAt: "2025-04-11T11:00:00.000Z",
    image:
      "https://cdn.dribbble.com/userupload/17078715/file/original-bcc14c49750fc2fee0d4c0af0727c4fc.png?resize=400x0",
    description:
      "Separate blogs by project or client in a clean, focused dashboard.",
    category: "Productivity",
    tag: "",
  },
  {
    _id: "661f7e4a1e8a4c89c7a7a004",
    slug: "instant-sharing",
    title: "Instant Sharing Pages",
    createdAt: "2025-04-12T09:45:00.000Z",
    image:
      "https://cdn.dribbble.com/userupload/7052338/file/original-dae562797ac2ad2115456eb13c07e2a3.jpg?resize=1600x1200",
    description:
      "Publish and share your blogs instantly with a public URL — no website needed.",
    category: "Collaboration",
    tag: "upcoming",
  },
  {
    _id: "661f7e4a1e8a4c89c7a7a005",
    slug: "content-planner",
    title: "Content Planner",
    createdAt: "2025-04-12T14:20:00.000Z",
    image:
      "https://cdn.dribbble.com/userupload/16543924/file/original-99bd908d8e14af131c2465cf01c6f4a7.png?resize=400x0",
    description:
      "Organize and schedule your blog posts in advance with an intuitive planner.",
    category: "Productivity",
    tag: "upcoming",
  },
  {
    _id: "661f7e4a1e8a4c89c7a7a006",
    slug: "team-collaboration",
    title: "Team Collaboration Tools",
    createdAt: "2025-04-13T08:55:00.000Z",
    image:
      "https://cdn.dribbble.com/userupload/17853261/file/original-d7ffed3f75080948caf17a1026aebf05.png?format=webp&resize=400x300&vertical=center",
    description:
      "Invite team members and collaborate on blog drafts, edits, and publishing.",
    category: "Collaboration",
    tag: "",
  },
  {
    _id: "661f7e4a1e8a4c89c7a7a007",
    slug: "content-analytics",
    title: "Content Analytics",
    createdAt: "2025-04-13T13:10:00.000Z",
    image:
      "https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/v1/attachments/delivery/asset/0c69d26f61eec9a2cc7d43d70d5c3dab-1684009969/Frame%202/design-saas-mvp-crm-admin-dashboard-web-application-ui-ux.png",
    description:
      "Get detailed insights into your content's performance and audience engagement.",
    category: "SEO",
    tag: "",
  },
  {
    _id: "661f7e4a1e8a4c89c7a7a008",
    slug: "advanced-seo-tools",
    title: "Advanced SEO Tools",
    createdAt: "2025-04-14T10:00:00.000Z",
    image:
      "https://cdn.dribbble.com/userupload/17888195/file/original-84cb343410f2065b0c47c7eb6efbd7aa.png?format=webp&resize=400x300&vertical=center",
    description:
      "Advanced tools for keyword analysis, SEO audits, and backlink management.",
    category: "SEO",
    tag: "upcoming",
  },
  {
    _id: "661f7e4a1e8a4c89c7a7a009",
    slug: "editor-enhancements",
    title: "Enhanced Blog Editor",
    createdAt: "2025-04-14T15:30:00.000Z",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlGIqTcFpCZS5mjlteyyE7uFLEmQDcXAMZNw&s",
    description:
      "A rich, customizable editor that enhances your writing and formatting experience.",
    category: "Editor",
    tag: "",
  },
  {
    _id: "661f7e4a1e8a4c89c7a7a00a",
    slug: "instant-share-feature",
    title: "Instant Share Feature",
    createdAt: "2025-04-15T09:15:00.000Z",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdR7cG2j6-Lq406En1Ie9a36GLD8I1g_WbkZWUcXlIxUFjvAeiZu3lp-f8P0y9UO-0QCA&usqp=CAU",
    description:
      "Instantly share your content with team members or clients, with just one click.",
    category: "Collaboration",
    tag: "",
  },
  {
    _id: "661f7e4a1e8a4c89c7a7a00b",
    slug: "auto-backup",
    title: "Auto Backup",
    createdAt: "2025-04-16T11:40:00.000Z",
    image:
      "https://cdn.dribbble.com/userupload/12655618/file/original-6297466ac11e96b2dfcf0893d9a87302.png?format=webp&resize=400x300&vertical=center",
    description:
      "Auto-backup your blogs to avoid data loss, ensuring peace of mind.",
    category: "Productivity",
    tag: "",
  },
  {
    _id: "661f7e4a1e8a4c89c7a7a00c",
    slug: "cloud-integration",
    title: "Cloud Integration",
    createdAt: "2025-04-16T14:00:00.000Z",
    image:
      "https://cdn.dribbble.com/userupload/9498828/file/original-77ace28ef767004d5b7255dee1e245bb.png?crop=1149x196-3590x2027&format=webp&resize=400x300&vertical=center",
    description:
      "Integrate with your cloud services like Google Drive and Dropbox for easy access.",
    category: "Collaboration",
    tag: "upcoming",
  },
];

export default function FeaturesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("search") || "";

  const initialCategory = searchParams.get("category") || "All";
  const initialTimeFilter = searchParams.get("time") || "All";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [timeFilter, setTimeFilter] = useState(initialTimeFilter);

  const filteredFeatures = features
    .filter((feature) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        feature.title.toLowerCase().includes(query) ||
        feature.description.toLowerCase().includes(query);

      const matchesCategory =
        selectedCategory === "All" || feature.category === selectedCategory;

      const matchesUpcoming =
        timeFilter !== "Upcoming" || feature.tag === "upcoming";

      return matchesSearch && matchesCategory && matchesUpcoming;
    })
    .sort((a, b) => {
      if (timeFilter === "Latest") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      return 0;
    });

  const perPageFromURL = parseInt(searchParams.get("perPage") || "9", 10);
  const perPage =
    isNaN(perPageFromURL) || perPageFromURL <= 0 ? 9 : perPageFromURL;

  // const page = parseInt(searchParams.get("page") || "1", 10);
  // const totalPages = Math.ceil(filteredFeatures.length / perPage);

  const rawPage = parseInt(searchParams.get("page") || "1", 10);
  const page = isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;
  const totalPages = Math.ceil(filteredFeatures.length / perPage);

  // Clamp page if it exceeds totalPages
  const currentPage = Math.min(page, totalPages === 0 ? 1 : totalPages);
  const paginatedFeatures = filteredFeatures.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const changePage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;

    const params = new URLSearchParams(window.location.search);
    params.set("page", newPage.toString());
    params.set("perPage", perPage.toString()); // persist in URL
    router.replace(`?${params.toString()}`);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    router.replace(`?${params.toString()}`);
  };

  const updateURLParam = (key: string, value: string) => {
    const params = new URLSearchParams(window.location.search);
    if (value && value !== "All") {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    // Always keep current perPage
    params.set("perPage", perPage.toString());

    router.replace(`?${params.toString()}`);
  };

  return (
    <main className="min-h-screen bg-background text-foreground px-4 py-14">
      <section className="w-full mx-auto">
        <section className="py-2 px-2">
          <h1 className="text-3xl font-bold text-center mb-8 text-neutral-900 dark:text-neutral-100">
            Explore Linkato Features
          </h1>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto mb-6 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              type="text"
              id="search"
              placeholder="Search for a feature..."
              value={searchQuery}
              onChange={handleSearch}
              className="h-10 pl-10 pr-4 border bg-neutral-50 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 rounded-xl w-full text-sm"
            />
          </div>

          {/* Tags + Filter */}
          <div className="flex  items-center justify-center gap-4 max-w-5xl mx-auto">
            {/* Categories */}
            <div className="flex flex-wrap justify-center items-center gap-2">
              {categories.map((category) => (
                <span
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    updateURLParam("category", category);
                  }}
                  className={`text-xs font-semibold px-3 py-1 rounded-full cursor-pointer border-[1.3px] transition-all duration-300 ease-in-out
                    ${selectedCategory === category
                      ? "bg-primary text-white border-primary"
                      : "bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-200 border-neutral-50 dark:border-neutral-600 hover:bg-primary-light dark:hover:bg-d-primary-light hover:shadow-md hover:shadow-neutral-400/80 dark:hover:shadow-neutral-800"
                    }`}
                >
                  {category}
                </span>
              ))}
            </div>

            {/* Time Filter */}
          </div>
          <div className="w-full mt-6 sm:mt-8 sm:w-40">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center justify-between bg-neutral-50 dark:bg-neutral-800 px-2 py-1 border border-neutral-300 dark:border-neutral-700 rounded-md text-sm w-full">
                <span>{timeFilter}</span>
                <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40">
                {["All", "Latest", "Upcoming"].map((option) => (
                  <DropdownMenuItem
                    key={option}
                    onClick={() => {
                      setTimeFilter(option);
                      updateURLParam("time", option);
                    }}
                    className={timeFilter === option ? "font-semibold" : ""}
                  >
                    {option}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </section>

       <div className="grid mt-4 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {paginatedFeatures.length > 0 ? (
    paginatedFeatures.map((feature) => (
      <FeatureCard key={feature.slug} feature={feature} />
    ))
  ) : (
    <div className="col-span-full bg-neutral-100 dark:bg-neutral-900 rounded-xl h-[480px] flex justify-center items-center py-10">
      <div className="text-center mx-2 border border-dashed border-border rounded-xl px-6 py-10 bg-muted/40 dark:bg-muted/10 max-w-md w-full">
        <p className="text-lg font-semibold text-muted-foreground">
          No features found
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Try adjusting your filters or search terms.
        </p>
      </div>
    </div>
  )}
</div>
        {/* pagination */}
        {totalPages > 1 && (
          <div className="mt-8 w-full flex justify-center">
            <Pagination>
              <PaginationContent className="flex items-center gap-1">
                <Button
                  disabled={currentPage === 1}
                  onClick={() => changePage(currentPage - 1)}
                  className={cn(
                    "px-3 py-1 rounded-md text-sm transition-colors",
                    currentPage === 1
                      ? "cursor-not-allowed bg-neutral-200 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-600"
                      : "bg-primary text-white hover:bg-primary/90"
                  )}
                >
                  Previous
                </Button>

                {Array.from({ length: totalPages }, (_, i) => (
                  <PaginationItem key={i}>
                    <Button
                      onClick={() => changePage(i + 1)}
                      className={`px-3 py-1 rounded-md text-sm transition-colors ${currentPage === i + 1
                          ? "bg-primary text-white"
                          : "bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                        }`}
                    >
                      {i + 1}
                    </Button>
                  </PaginationItem>
                ))}

                <Button
                  disabled={currentPage === totalPages}
                  onClick={() => changePage(currentPage + 1)}
                  className={cn(
                    "px-3 py-1 rounded-md text-sm transition-colors",
                    currentPage === totalPages
                      ? "cursor-not-allowed bg-neutral-200 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-600"
                      : "bg-primary text-white hover:bg-primary/90"
                  )}
                >
                  Next
                </Button>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </section>
    </main>
  );
}
