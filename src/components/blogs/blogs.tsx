"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BlogCard } from "@/components/blogs/blogCard"
import { Card,  CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {

  Search,
  Tag,
  Clock,
  SquareArrowOutUpRight,
  ChevronsUpDown,
  Check,
} from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { PaginationContent, PaginationItem } from "@/components/ui/pagination";
import Link from "next/link";

const blogs = [
  {
    blogID: "sdff77esn44",
    slug: "saas-ui-design-key-principles",
    title:
      "How to Grow Organic Traffic Through SEO and Strategic Content Marketing in 2025",
    description:
      "Practical strategies to increase your site's visibility using SEO and content marketing.",
    date: "2025-04-14",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8ZxKfyA1xuGglA4kK-KrXC_u9gU4UdZl_Wg&s",
    tags: ["SEO", "Content", "Growth"],
    categories: ["featured"],
  },
  {
    blogID: "bd9t83hxa12",
    slug: "saas-ui-design-key-principles",
    title:
      "The Rise of Artificial Intelligence in Content Creation and its Long-Term Impact on Marketing",
    description:
      "Explore how AI is transforming the way we generate, optimize, and scale content.",
    date: "2025-04-10",
    image:
      "https://cdn.dribbble.com/userupload/4453472/file/original-9aebe1f58808dd2f42ed209c555428df.png?format=webp&resize=400x300&vertical=center",
    tags: ["AI", "Tools", "Productivity"],
    categories: ["AI"],
  },
  {
    blogID: "k2l4t90dj89",
    slug: "saas-ui-design-key-principles",
    title:
      "Building a Winning and Scalable SEO Content Strategy for Long-Term Organic Growth",
    description:
      "Learn how to develop a content strategy that supports SEO and drives sustainable growth.",
    date: "2025-04-08",
    image:
      "https://cdn.dribbble.com/userupload/15155542/file/original-95714278fcbbe58b7ea1fe33747b3952.jpg?resize=400x0",
    tags: ["SEO", "Content", "Strategy"],
    categories: ["featured"],
  },
  {
    blogID: "rj2j44a7d59",
    slug: "saas-ui-design-key-principles",
    title:
      "Understanding User Intent for Better SEO and Personalized Digital Experiences",
    description:
      "Master the art of identifying user intent to create highly targeted and effective content.",
    date: "2025-04-06",
    image:
      "https://layers-uploads-prod.s3.eu-west-2.amazonaws.com/d59e833a-564e-42df-a98a-d897b0396261-Project-Management-SaaS.png",
    tags: ["SEO", "User Experience", "Research"],
    categories: ["UX"],
  },
  {
    blogID: "ap3k32q7h7f",
    slug: "saas-ui-design-key-principles",
    title:
      "Leveraging AI in Marketing Campaigns to Drive Better Personalization and ROI",
    description:
      "How AI-powered tools can improve marketing campaigns and make them more efficient.",
    date: "2025-04-04",
    image:
      "https://cdn.dribbble.com/userupload/15472277/file/original-508059a66ca175fe1e9115c82ab5618d.png?format=webp&resize=400x300&vertical=center",
    tags: ["AI", "Marketing", "Growth"],
    categories: ["featured"],
  },
  {
    blogID: "asf42fs9u0r",
    slug: "saas-ui-design-key-principles",
    title:
      "Mobile SEO: Optimizing Your Website for Mobile-First Indexing and User Experience",
    description:
      "Tips and strategies for improving your SEO performance on mobile-first search engines.",
    date: "2025-04-02",
    image:
      "https://cdn.prod.website-files.com/63fc977c14aaea404dce4439/66bc89192b3058f92f9b430c_6481d39a6b0c317b4d46da54_image%25202.webp",
    tags: ["SEO", "Mobile", "Optimization"],
    categories: ["Mobile"],
  },
  {
    blogID: "l0v7a6q9e8r",
    slug: "saas-ui-design-key-principles",
    title:
      "Content Marketing Automation Tools to Scale Your Output and Streamline Workflow",
    description:
      "Discover the best tools to automate your content marketing efforts and save time.",
    date: "2025-01-30",
    image:
      "https://cdn.dribbble.com/userupload/3502214/file/original-5edb38add4ab1887ab258ca6f7d0a3ad.jpg?format=webp&resize=400x300&vertical=center",
    tags: ["Content", "Automation", "Marketing"],
    categories: ["Automation"],
  },
  {
    blogID: "bn2v34y3p7e",
    slug: "saas-ui-design-key-principles",
    title:
      "Boosting Engagement with SEO: Strategies That Keep Visitors Coming Back for More",
    description:
      "Learn how to use SEO strategies to drive higher engagement rates on your website.",
    date: "2025-03-28",
    image:
      "https://saas-ui.dev/_next/image?url=%2Fscreenshots%2Flist-dark.png&w=3840&q=85",
    tags: ["SEO", "Engagement", "Content"],
    categories: ["featured"],
  },
  {
    blogID: "z83y45d8l2s",
    slug: "saas-ui-design-key-principles",
    title:
      "Advanced SEO Techniques for 2025 That You Should Not Miss for Maximum Impact",
    description:
      "Stay ahead of the competition with these advanced SEO strategies and techniques.",
    date: "2025-03-25",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRjpDQ_ZgRDEsKYsy9jIWuL5MtmA0R_CliexdzRpxAns7eU27NqLvvNgq7RlvXepZjdoY&usqp=CAU",
    tags: ["SEO", "Techniques", "Growth"],
    categories: ["Strategy"],
  },
  {
    blogID: "s5g9o12w8e4",
    slug: "saas-ui-design-key-principles",
    title:
      "The Power of Video Content in 2025: Why It's the Future of Digital Storytelling",
    description:
      "Why video content is king and how to leverage it for higher traffic and engagement.",
    date: "2024-09-20",
    image:
      "https://cdn.dribbble.com/userupload/4453472/file/original-9aebe1f58808dd2f42ed209c555428df.png?format=webp&resize=400x300&vertical=center",
    tags: ["Content", "Video", "Marketing"],
    categories: ["Video"],
  },
  {
    blogID: "wd3e44r6l2y",
    slug: "saas-ui-design-key-principles",
    title:
      "Building an Email List for Marketing Success: Tactics That Actually Work in 2025",
    description:
      "Effective strategies to build and grow your email list for better marketing outcomes.",
    date: "2025-03-18",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8ZxKfyA1xuGglA4kK-KrXC_u9gU4UdZl_Wg&s",
    tags: ["Marketing", "Email", "Growth"],
    categories: ["featured"],
  },
  {
    blogID: "bf8s56p9u1t",
    slug: "saas-ui-design-key-principles",
    title:
      "SEO for Local Businesses: Optimize Your Website for Better Local Search Visibility",
    description:
      "How to optimize your local business website for better rankings in local search results.",
    date: "2024-03-16",
    image:
      "https://cdn.dribbble.com/userupload/15155542/file/original-95714278fcbbe58b7ea1fe33747b3952.jpg?resize=400x0",
    tags: ["SEO", "Local", "Business"],
    categories: ["Local"],
  },
  {
    blogID: "hj2p56u3s7q",
    slug: "saas-ui-design-key-principles",
    title:
      "Social Media Marketing Strategies for 2025: Planning Campaigns That Convert",
    description:
      "How to craft a social media marketing strategy that drives real business growth.",
    date: "2025-03-14",
    image:
      "https://cdn.prod.website-files.com/63fc977c14aaea404dce4439/66bc89192b3058f92f9b430c_6481d39a6b0c317b4d46da54_image%25202.webp",
    tags: ["Marketing", "Social Media", "Growth"],
    categories: ["featured"],
  },
];



// Time filter constants
const TIME_FILTERS = {
  ALL: "All",
 
  WEEK: "Week",
  MONTH: "Month",
  SIX_MONTHS: "6 Months",
};

const BlogsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageFromUrl = searchParams.get("page");
  const limitFromUrl = searchParams.get("limit");
  const blogsPerPage = parseInt(limitFromUrl || "9", 10);
  const [currentPage, setCurrentPage] = useState(1);

  const timeFromUrl = searchParams.get("time") || TIME_FILTERS.ALL;
  const [timeFilter, setTimeFilter] = useState(timeFromUrl);

  const queryFromUrl = searchParams.get("search") || "";
  const [searchQuery, setSearchQuery] = useState(queryFromUrl);

  const tags = ["All", ...new Set(blogs.flatMap((blog) => blog.tags))];
  const tagFromUrl = tags.includes(searchParams.get("tag") || "")
    ? searchParams.get("tag")!
    : "All";
  const [selectedTag, setSelectedTag] = useState(tagFromUrl);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("tag", selectedTag);
    params.set("time", timeFilter);
    params.set("page", currentPage.toString()); // Use currentPage here instead of hardcoded "1"
    router.replace(`/blogs?${params.toString()}`);
  }, [selectedTag, timeFilter, currentPage, searchParams, router]); // currentPage added

  const filteredBlogs = blogs.filter((blog) => {
    const matchesTag = selectedTag === "All" || blog.tags.includes(selectedTag);

    const blogDate = new Date(blog.date);
    const now = new Date();
    const matchesTime =
      timeFilter === TIME_FILTERS.ALL ||
      (timeFilter === TIME_FILTERS.WEEK &&
        blogDate > new Date(new Date().setDate(now.getDate() - 7))) ||
      (timeFilter === TIME_FILTERS.MONTH &&
        blogDate > new Date(new Date().setMonth(now.getMonth() - 1))) ||
      (timeFilter === TIME_FILTERS.SIX_MONTHS &&
        blogDate > new Date(new Date().setMonth(now.getMonth() - 6)));

    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTag && matchesTime && matchesSearch;
  });

  const sortedBlogs = [...filteredBlogs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredBlogs.length / blogsPerPage)
  );
  const safePage = Math.min(currentPage, totalPages);
  const currentBlogs = sortedBlogs.slice(
    (safePage - 1) * blogsPerPage,
    safePage * blogsPerPage
  );

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    params.set("limit", blogsPerPage.toString());
    router.push(`/blogs?${params.toString()}`); // This will update the URL
  };

  useEffect(() => {
    const page = parseInt(pageFromUrl || "1");
    const safePage = Math.min(Math.max(1, page), totalPages);
    setCurrentPage(safePage); // Update the current page based on URL query params

    // Only update URL if safePage does not match the current page
    if (safePage !== currentPage) {
      const params = new URLSearchParams(searchParams);
      params.set("page", safePage.toString());
      params.set("limit", blogsPerPage.toString());
      router.replace(`/blogs?${params.toString()}`);
    }
  }, [
    pageFromUrl,
    filteredBlogs.length,
    blogsPerPage,
    totalPages,
    searchParams,
    router,
    currentPage,
  ]); // Added currentPage here to remove the warning

  return (
    <main className="min-h-screen py-20  text-foreground">
      <section className="w-full flex flex-col sm:flex-row ">
        {/* Left Section - Blogs List */}
        <section className="flex-1 mx-4 max-w-full sm:w-9/12 ">
          <section className="header-section bg-neutral-100  dark:bg-neutral-900 border border-neutral-400/80 dark:border-neutral-800 shadow-lg shadow-neutral-300 dark:shadow-neutral-900  rounded-lg px-2 py-2 mb-6">
            <h1 className="text-2xl font-bold mb-6">All blogs</h1>

            {/* Filtering Section */}
            <div className="space-y-4 space-x-2 sm:flex md:space-y-0">
              {/* Search Input */}
              <div className="flex  flex-col w-full md:w-1/3">
                <label
                  htmlFor="search"
                  className="text-sm ml-1 font-medium text-muted-foreground "
                >
                  Search
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    id="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search blogs..."
                    className="mt-1  h-7 pl-10 border border-neutral-300 dark:border-neutral-700 rounded-md w-full  text-sm"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              {/* time & tags wraper */}
              <div className="flex w-full sm:w-2/3   space-x-2 ">
                {/* Filter by Time */}
                <div className="flex flex-col w-full ">
                  <label className="text-sm  ml-1 font-medium text-muted-foreground mb-1">
                    Time
                  </label>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex  items-center px-3 py-1 border border-neutral-300 dark:border-neutral-700 rounded-md text-sm w-full">
                      <Clock className="mr-2 h-4 w-4" />
                      {timeFilter}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40">
                      <DropdownMenuItem
                        onClick={() => setTimeFilter(TIME_FILTERS.ALL)}
                      >
                        All
                      </DropdownMenuItem>
                     
                      <DropdownMenuItem
                        onClick={() => setTimeFilter(TIME_FILTERS.WEEK)}
                      >
                        Week
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setTimeFilter(TIME_FILTERS.MONTH)}
                      >
                        Month
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setTimeFilter(TIME_FILTERS.SIX_MONTHS)}
                      >
                        6 Month
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Filter by Tag */}
                <div className="flex flex-col  w-full ">
                  <label className="text-sm  ml-1 font-medium text-muted-foreground mb-1">
                    Tags
                  </label>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        role="combobox"
                        aria-expanded={open}
                        aria-controls="tag-dropdown" // Added aria-controls
                        className="flex w-full items-center justify-between rounded-md border border-neutral-300 dark:border-neutral-700 bg-background px-3 py-1 text-sm"
                      >
                        <div className="flex items-center gap-2">
                          <Tag className="h-4 w-4" />
                          {selectedTag}
                        </div>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 text-muted-foreground" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent id="tag-dropdown" className="w-full p-0">
                      {" "}
                      {/* Added id for aria-controls */}
                      <Command>
                        <CommandInput
                          placeholder="Search tag..."
                          className="h-9"
                        />
                        <CommandEmpty>No tag found.</CommandEmpty>
                        <CommandGroup>
                          {tags.map((tag) => (
                            <CommandItem
                              key={tag}
                              onSelect={() => {
                                setSelectedTag(tag);
                                setOpen(false);
                              }}
                              className="cursor-pointer hover:bg-neutral-300 hover:dark:bg-neutral-600"
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  selectedTag === tag
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {tag}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          </section>
          {/* Blog List */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {currentBlogs.length > 0 ? (
    currentBlogs.map((blog) => (
      <BlogCard key={blog.blogID} blog={blog} />
    ))
  ) : (
    <div className="col-span-full bg-neutral-100 dark:bg-neutral-900 rounded-xl h-[480px] flex justify-center items-center py-10">
      <div className="text-center mx-2 border border-dashed border-border rounded-xl px-6 py-10 bg-muted/40 dark:bg-muted/10 max-w-md w-full">
        <p className="text-lg font-semibold text-muted-foreground">
          No blogs found
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Try adjusting your filters or search terms.
        </p>
      </div>
    </div>
  )}
</div>

          {/* Pagination */}
          <div className="mt-8 w-full flex justify-center ">
            <PaginationContent className="flex items-center gap-1">
              <Button
                disabled={currentPage <= 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className={`px-3 py-1 rounded-md text-sm transition-colors ${
                  currentPage <= 1
                    ? "cursor-not-allowed bg-neutral-200 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-600"
                    : "bg-primary text-white hover:bg-primary/90"
                }`}
              >
                Previous
              </Button>

              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i}>
                  <button
                    onClick={() => handlePageChange(i + 1)}
                    className={`px-3 py-1 rounded-md text-sm transition-colors duration-200 ${
                      currentPage === i + 1
                        ? "bg-primary text-white"
                        : "bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-700"
                    }`}
                  >
                    {i + 1}
                  </button>
                </PaginationItem>
              ))}

              <Button
                disabled={currentPage >= totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className={`px-3 py-1 rounded-md text-sm transition-colors ${
                  currentPage >= totalPages
                    ? "cursor-not-allowed bg-neutral-200 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-600"
                    : "bg-primary text-white hover:bg-primary/90"
                }`}
              >
                Next
              </Button>
            </PaginationContent>
          </div>
        </section>

        {/* Right Section - Featured Blogs */}
        <section className="sm:w-3/12 sm:mt-0 mt-7 max-w-full mx-4">
          <div className="w-full h-fit   ">
            <h2 className="text-xl font-semibold mb-4 bg-neutral-100  dark:bg-neutral-800 shadow-lg shadow-neutral-300 dark:shadow-neutral-900 border border-neutral-400/80 dark:border-neutral-800 rounded-lg px-3 py-2 ">
              Featured Blogs
            </h2>
            <div className="space-y-4">
  {blogs
    .filter((blog) =>
      blog.categories?.some(
        (category) => category === "featured"
      )
    )
    .slice(0, 5)
    .map((blog) => (
      <Link key={blog.blogID} href={`/blogs`} className="group block">
        <Card className="border border-border dark:border-neutral-800 hover:shadow-lg transition-shadow duration-300 h-full flex flex-col justify-between group relative">
          <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-50/80 dark:bg-neutral-950/60 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 shadow-md p-0.5 rounded-md">
            <SquareArrowOutUpRight className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
          </div>

          <div className="relative w-full sm:h-36 h-46 rounded-tl-xl rounded-tr-xl overflow-hidden">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <CardHeader className="px-2 py-1 flex-grow">
            <h3 className="text-sm font-semibold line-clamp-2 h-[40px]">
              {blog.title}
            </h3>
            <p className="text-xs dark:text-neutral-200/70 text-neutral-900/80 text-muted-foreground line-clamp-2 h-[32px]">
              {blog.description}
            </p>
          </CardHeader>
        </Card>
      </Link>
    ))}

  {blogs.filter((blog) =>
    blog.categories?.some(
      (category) => category === "featured"
    )
  ).length > 5 && (
    <div className="pt-2 text-left">
      <Link
        href="/blogs"
        className="group inline-flex items-center gap-1 text-md text-primary hover:underline font-medium"
      >
        Explore more
        <SquareArrowOutUpRight className="w-3.5 h-3.5 transform mt-1 transition-transform duration-200 group-hover:translate-x-1" />
      </Link>
    </div>
  )}
</div>

          </div>
        </section>
      </section>
    </main>
  );
};

export default BlogsPage;
