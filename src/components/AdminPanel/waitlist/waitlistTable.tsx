"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useEffect, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

import { useRouter, useSearchParams } from "next/navigation";

export type WaitlistEntry = {
  email?: string;
  browser?: string;
  os?: string;
  isMobile?: boolean;
  language?: string;
  location?: {
    country?: string;
    city?: string;
  };
  createdAt: string;
 
  utm?: {
    source?: string;
    medium?: string;
    campaign?: string;
  };
  [key: string]: unknown;
};

export function WaitlistTable({ waitlist }: { waitlist: WaitlistEntry[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const perPage = parseInt(searchParams.get("perPage") || "10", 10);
  const totalPages = Math.ceil(waitlist.length / perPage);
  const startIndex = (currentPage - 1) * perPage;

  const paginatedData = useMemo(
    () => waitlist.slice(startIndex, startIndex + perPage),
    [waitlist, startIndex, perPage]
  );

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      const params = new URLSearchParams(searchParams);
      params.set("page", "1");
      router.replace(`?${params.toString()}`);
    }
  }, [currentPage, waitlist.length, perPage, totalPages, searchParams, router]);

  const exportToCSV = () => {
    const headers = [
      "Email",
      "Country",
      "City",
      "Join Date",
      "Language",
      "Device",
      "Browser",
      "OS",
      "UTM Source",
      "UTM Medium",
      "UTM Campaign",
    ];
  
    const rows = waitlist.map((entry) => [
      entry.email ?? "-",
      entry.location?.country ?? "-",
      entry.location?.city ?? "-",
      new Date(entry.createdAt).toLocaleString(),
      entry.language ?? "-",
      entry.isMobile ? "Mobile" : "Desktop",
      entry.browser ?? "-",
      entry.os ?? "-",
      entry.utm?.source ?? "-",
      entry.utm?.medium ?? "-",
      entry.utm?.campaign ?? "-",
    ]);
  
    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");
  
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "waitlist.csv");
    link.click();
  };
  

  const updatePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.replace(`?${params.toString()}`);
  };

  const updatePerPage = (value: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("perPage", value.toString());
    params.set("page", "1");
    router.replace(`?${params.toString()}`);
  };

  return (
    <div className="space-y-3 px-3 py-2 bg-neutral-100 dark:bg-neutral-900 border border-neutral-500 dark:border-neutral-500 rounded-xl">
      <div className="flex md:flex-row flex-col mt-2 md:justify-between justify-start md:items-center items-start ">
        <h1 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
          Users Details:
        </h1>
        <div className="flex w-full justify-between  sm:items-center items-start md:mt-1 mt-3 gap-2 ">
          <Select
            value={perPage.toString()}
            onValueChange={(value) => updatePerPage(parseInt(value))}
          >
            <SelectTrigger className="w-fit max-h-6">
              <SelectValue placeholder="Per page" />
            </SelectTrigger>
            <SelectContent className="bg-neutral-100 dark:bg-neutral-800">
              {[5, 10, 20, 50].map((num) => (
                <SelectItem
                  key={num}
                  value={num.toString()}
                  className="hover:bg-neutral-300 dark:hover:bg-neutral-700"
                >
                  {num} Per page
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            onClick={exportToCSV}
            className="!px-1 w-fit py-1 mt-2 mr-1 border border-primary hover:bg-primary text-neutral-200 text-xs font-medium rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            variant="default"
          >
            <Upload size={16} />
            Export CSV
          </Button>
        </div>
      </div>

      {waitlist.length === 0 ? (
        <div className="text-center text-sm text-neutral-600 dark:text-neutral-300 py-10">
          No users found.
        </div>
      ) : (
        <>
          <div className="rounded-xl border border-neutral-600 dark:border-neutral-600 overflow-x-auto">
          <Table>
  <TableHeader className="bg-neutral-100 dark:bg-neutral-700">
    <TableRow>
      {[
        "Email",
        "Country",
        "City",
        "Join Date",
        
        "Language",
        "Device",
        "Browser",
        "OS",
        "UTM Source",
        "UTM Medium",
        "UTM Campaign",
      ].map((heading) => (
        <TableHead key={heading} className="px-6 py-3">
          {heading}
        </TableHead>
      ))}
    </TableRow>
  </TableHeader>
  <TableBody>
    {paginatedData.map((entry, index) => (
      <TableRow
        key={index}
        className="hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
      >
        <TableCell className="px-6 py-3">{entry.email}</TableCell>
        <TableCell className="px-6 py-3">
          {entry.location?.country ?? "-"}
        </TableCell>
        <TableCell className="px-6 py-3">
          {entry.location?.city ?? "-"}
        </TableCell>
        <TableCell className="px-6 py-3">
          {new Date(entry.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </TableCell>

       
        <TableCell className="px-6 py-3">
          {entry.language ?? "-"}
        </TableCell>
        <TableCell className="px-6 py-3">
          {entry.isMobile ? "Mobile" : "Desktop"}
        </TableCell>
        <TableCell className="px-6 py-3">
          {entry.browser ?? "-"}
        </TableCell>
        <TableCell className="px-6 py-3">
          {entry.os ?? "-"}
        </TableCell>

        {/* Access UTM Parameters */}
        <TableCell className="px-6 py-3">
          {entry.utm?.source ?? "-"}
        </TableCell>
        <TableCell className="px-6 py-3">
          {entry.utm?.medium ?? "-"}
        </TableCell>
        <TableCell className="px-6 py-3">
          {entry.utm?.campaign ?? "-"}
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>

          </div>

          <div className="flex justify-between whitespace-nowrap items-center px-2 py-1 text-sm text-neutral-700 dark:text-neutral-300">
            <span>
              Showing{" "}
              <strong>
                {startIndex + 1}-
                {Math.min(startIndex + perPage, waitlist.length)}
              </strong>{" "}
              of {waitlist.length}
            </span>

            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => updatePage(Math.max(currentPage - 1, 1))}
                    className={
                      currentPage === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      updatePage(Math.min(currentPage + 1, totalPages))
                    }
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </>
      )}
    </div>
  );
}
