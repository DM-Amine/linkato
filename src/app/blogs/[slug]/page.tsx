import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogs } from "./blogData";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Tag, Clock8, Calendar } from "lucide-react";
import BlogContent from "@/components/blogs/content";



export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug); // use `slug` now
  if (!blog) return {};

  return {
    title: blog.title,
    description: blog.description || blog.excerpt || "",
    keywords: [...blog.tags, ...blog.categories].join(", "),
    alternates: {
      canonical: `/blogs/${slug}`,
    },
    openGraph: {
      title: blog.title,
      description: blog.description || blog.excerpt || "",
      url: `/blogs/${slug}`,
      type: "article",
      images: blog.coverImage
        ? [
            {
              url: blog.coverImage,
              alt: blog.title,
              width: 1200,
              height: 600,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description || blog.excerpt || "",
      images: blog.coverImage ? [blog.coverImage] : [],
    },
  };
}

export default async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug); // use `slug` now
  if (!blog) notFound();

  return (
    <div className="w-full mx-auto sm:px-20 sm:py-7 pb-4">
      {/* Header */}
      <div className="header text-neutral-800 dark:text-neutral-200 relative mb-8 sm:rounded-2xl overflow-hidden border border-neutral-500  sm:shadow-lg shadow-neutral-500/30 dark:shadow-neutral-800/50 ">
        <div className="cover-image">
          {blog.coverImage && (
            <Image
              src={blog.coverImage}
              alt={blog.title}
              width={1200}
              height={600}
              className="w-full h-[300px] sm:h-[300px] object-cover"
            />
          )}
        </div>
        <div className=" ml-4 blog-info flex -mt-5 text-sm">
          <div className="author-card flex ">
            <div className="author-avatar-image-warpper rounded-full border w-fit">
              <Image
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFuJTIwYXZhdGFyfGVufDB8fDB8fHww"
                alt="avatar"
                height={60}
                width={60}
                className="author-avatar-image min-h-12 min-w-12 rounded-full"
              />
            </div>
          </div>
          <div className="detailts justify-start items-center text-xs font-medium  ml-2 flex  space-x-2 mt-6  px-1 rounded-lg bg-neutral-100  dark:bg-neutral-800  border border-neutral-500 h-fit">
            <span className="autore-name  ">{blog.author}</span>
            <span className="-mt-0.5">|</span>
            <span className="reding-time flex">
              <Clock8 className="m-1 " size={12} strokeWidth={2} />
              <span className="pt-0.5"> {blog.readingTime}</span>
            </span>
            <span className="-mt-0.5">|</span>
            <span className="reding-time flex">
              <Calendar className="m-1" size={12} strokeWidth={2} />
              <span className="pt-0.5">
                {new Date(blog.updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </span>

          </div>
        </div>
        <div className="px-3 sm:py-1 ">
          <h1 className="text-4xl font-bold leading-tight text-text dark:text-dark-text mb-2">
            {blog.title}
          </h1>

          <p className=" text-sm mb-2">{blog.description}</p>
          <div className="flex flex-wrap gap-2 mb-2">
            {blog.tags.map((tag, index) => (
              <Link key={index} href={`/blogs?tag=${encodeURIComponent(tag)}`}>
                <Badge
                  className="cursor-pointer transition-all duration-300 ease-in-out
                            bg-neutral-50 dark:bg-neutral-700 
                            text-neutral-900 dark:text-neutral-200 
                            border-white dark:border-neutral-600 
                            hover:bg-primary-light dark:hover:bg-d-primary-light 
                            hover:shadow-md hover:shadow-neutral-400/80 
                            dark:hover:shadow-neutral-800"
                >
                  <Tag size={16} strokeWidth={1.5} className="mr-1" />
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className=" border border-neutral-400  dark:border-neutral-600  dark:prose-invert max-w-none bg-neutral-50/80 dark:bg-neutral-800/80 px-2 py-1 rounded-xl ">
      <BlogContent html={blog.content.html} />
      </div>
    </div>
  );
}
