"use client";

import "./content.css";


type BlogContentProps = {
  html: string;
};

export default function BlogContent({ html }: BlogContentProps) {
  return (
    <div className="relative bg-neutral-50/80 dark:bg-neutral-800/80 my-1 sm:px-2 px-0.5 sm:py-1 rounded-xl">
      <div
        className="ProseMirror "
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
