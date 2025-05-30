"use client";

import { useState, useEffect, useCallback } from "react";

import MessageModal from "@/components/AdminPanel/contact/MessageModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DeleteModal from "@/components/AdminPanel/contact/DeleteModal";
import { formatDistanceToNow } from "date-fns";
import { Search, Trash2, Eye, Upload, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface ContactType {
  _id: string;
  fullName: string;
  email: string;
  message: string;
  subject: string;
  status: "read" | "unread";
  createdAt: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactType[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<ContactType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedMessage, setSelectedMessage] = useState<ContactType | null>(
    null
  );
  const [messageToDelete, setMessageToDelete] = useState<
    ContactType | ContactType[] | null
  >(null);
  const [selectedMessages, setSelectedMessages] = useState<Set<string>>(
    new Set()
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(9);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedMessages = filteredMessages.slice(startIndex, endIndex);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showReadFilter, setShowReadFilter] = useState<boolean>(false);
  const [showUnreadFilter, setShowUnreadFilter] = useState<boolean>(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch("/api/contact");
      if (!response.ok) throw new Error("Failed to fetch messages");
      const data: ContactType[] = await response.json();

      setMessages(data);
      setFilteredMessages(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching messages:", error);
      setIsLoading(false);
    }
  };

  const searchInField = (
    field: string | undefined,
    searchValue: string
  ): boolean => {
    if (!field) return false;
    return field.toString().toLowerCase().includes(searchValue.toLowerCase());
  };

  const filterMessages = useCallback(() => {
    let filtered = [...messages];

    if (showReadFilter && !showUnreadFilter) {
      filtered = filtered.filter((message) => message.status === "read");
    } else if (!showReadFilter && showUnreadFilter) {
      filtered = filtered.filter((message) => message.status === "unread");
    }

    if (searchTerm.trim()) {
      const searchValue = searchTerm.trim();
      filtered = filtered.filter(
        (message) =>
          searchInField(message.fullName, searchValue) ||
          searchInField(message.email, searchValue) ||
          searchInField(message.message, searchValue) ||
          searchInField(message.subject, searchValue)
      );
    }

    setFilteredMessages(filtered);
  }, [messages, searchTerm, showReadFilter, showUnreadFilter]);

  useEffect(() => {
    filterMessages();
  }, [filterMessages]);

  const handleMessageClick = async (message: ContactType) => {
    try {
      await fetch(`/api/contact/${message._id}`, {
        method: "PUT",
        body: JSON.stringify({ status: "read" }),
      });

      setMessages((prevMessages) =>
        prevMessages.map((m) =>
          m._id === message._id ? { ...m, status: "read" } : m
        )
      );

      setSelectedMessage(message);
    } catch (error) {
      console.error("Error updating message status:", error);
    }
  };

  const toggleMessageSelection = (
    messageId: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.stopPropagation();
    const newSelected = new Set(selectedMessages);
    if (newSelected.has(messageId)) {
      newSelected.delete(messageId);
    } else {
      newSelected.add(messageId);
    }
    setSelectedMessages(newSelected);
  };

  const handleSelectAll = (event: React.MouseEvent) => {
    event.preventDefault();
    if (selectedMessages.size === filteredMessages.length) {
      setSelectedMessages(new Set());
    } else {
      setSelectedMessages(new Set(filteredMessages.map((msg) => msg._id)));
    }
  };

  const handleBulkDelete = () => {
    if (selectedMessages.size === 0) return;

    const messagesToDelete = filteredMessages.filter((msg) =>
      selectedMessages.has(msg._id)
    );

    setMessageToDelete(messagesToDelete);
  };

  const handleDelete = async () => {
    if (
      !messageToDelete ||
      (Array.isArray(messageToDelete) && messageToDelete.length === 0)
    )
      return;

    try {
      const isMultiDelete = Array.isArray(messageToDelete);

      const idsToDelete = isMultiDelete
        ? messageToDelete.map((msg) => msg._id)
        : [(messageToDelete as ContactType)._id];

      const deletePromises = idsToDelete.map((id) =>
        fetch(`/api/contact/${id}`, { method: "DELETE" })
      );

      const results = await Promise.all(deletePromises);
      const allSuccessful = results.every((response) => response.ok);

      if (allSuccessful) {
        setMessages(messages.filter((msg) => !idsToDelete.includes(msg._id)));
        setMessageToDelete(null);
        setSelectedMessages(new Set());
      } else {
        throw new Error("Failed to delete some messages");
      }
    } catch (error) {
      console.error("Error deleting messages:", error);
    }
  };
  const exportToCSV = () => {
    if (filteredMessages.length === 0) {
      alert("No messages to export.");
      return;
    }

    const headers = [
      "Full Name",
      "Email",
      "Subject",
      "Message",
      "Status",
      "Created At",
    ];

    const csvRows = [
      headers.join(","), // headers row
      ...filteredMessages.map((msg) =>
        [
          `"${msg.fullName}"`,
          `"${msg.email}"`,
          `"${msg.subject}"`,
          `"${msg.message.replace(/"/g, '""')}"`, // escape quotes
          `"${msg.status}"`,
          `"${new Date(msg.createdAt).toLocaleString()}"`,
        ].join(",")
      ),
    ];

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "messages.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen sm:px-6 sm:py-4  px-2 py-3">
        <div className="w-full mx-auto  ">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen sm:px-6 sm:py-4  px-2 py-3">
      <div className="w-full mx-auto ">
        <div className="flex justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="min-w-full   flex justify-between">
              <h1 className="text-2xl font-semibold text-text dark:text-dark-text">
                Messages
              </h1>
              {selectedMessages.size > 0 && (
                <span className="text-xs font-semibold mt-2 ml-2  whitespace-nowrap border border-neutral-500 rounded-md h-fit py-1 px-1 text-muted dark:text-dark-muted">
                  {selectedMessages.size} Selected
                </span>
              )}
            </div>
          </div>

          <Button
  onClick={exportToCSV}
  variant="default"
  className="!px-1 w-fit py-1 mt-2 mr-1 border border-primary hover:bg-primary text-neutral-200 text-xs font-medium rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
>
  <Upload size={16} />
  Export CSV
</Button>
        </div>
        <div className="w-full my-3 sm:w-auto flex flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-4">
            <Label className="flex items-center space-x-2 text-sm text-text dark:text-dark-text">
              <Input
                type="checkbox"
                checked={showReadFilter}
                onChange={(e) => setShowReadFilter(e.target.checked)}
                className="form-checkbox h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
              />
              <span>Read</span>
            </Label>
            <Label className="flex items-center space-x-2 text-sm text-text dark:text-dark-text">
              <Input
                type="checkbox"
                checked={showUnreadFilter}
                onChange={(e) => setShowUnreadFilter(e.target.checked)}
                className="form-checkbox h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
              />
              <span>Unread</span>
            </Label>
          </div>
          <div className="relative w-full sm:w-64">
            <Input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 h-7 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2  dark:bg-dark-surface dark:border-dark-border dark:text-dark-text"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted dark:text-dark-muted" />
          </div>
        </div>
        <div className="mb-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={handleSelectAll}
              className=" cursor-pointer text-sm text-primary dark:text-dark-primary hover:text-primary-dark dark:hover:text-dark-primary-dark"
            >
              {selectedMessages.size === filteredMessages.length
                ? "Deselect All"
                : "Select All"}
            </button>
            {(showReadFilter || showUnreadFilter) && (
             <button
             onClick={() => setMessageToDelete(filteredMessages)}
             className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-error hover:bg-error/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
           >
             <Trash2 className="h-4 w-4 mr-1" />
             Delete {showReadFilter ? "Read" : "Unread"} Messages
           </button>
           
            )}
          </div>
          {selectedMessages.size > 0 && (
            <button
              onClick={handleBulkDelete}
              className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-error hover:bg-error/80 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete Selected ({selectedMessages.size})
            </button>
          )}
        </div>

        <div className="rounded-md  overflow-hidden">
          <ul role="list" className="space-y-4 ">
            {filteredMessages.length > 0 ? (
              paginatedMessages.map((message) => (
                <li
                  key={message._id}
                  onClick={(e) => {
                    const target = e.target as HTMLElement;
                    const isCheckbox =
                      (target as HTMLInputElement).type === "checkbox";
                    const insideButton = target.closest("button");

                    if (isCheckbox || insideButton) return;
                    handleMessageClick(message);
                  }}
                  className={`w-full rounded-md border border-neutral-500 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-100/50 dark:hover:bg-neutral-700 transition-colors cursor-pointer ${
                    message.status === "unread"
                      ? "bg-primary/20 hover:bg-primary/10  dark:bg-primary/20 dark:hover:bg-primary/10"
                      : ""
                  }`}
                >
                  <div className="px-2  py-2">
                    {/* Header Section */}
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-3 min-w-0">
                        <input
                          type="checkbox"
                          checked={selectedMessages.has(message._id)}
                          onChange={(e) =>
                            toggleMessageSelection(message._id, e)
                          }
                          className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
                        />
                        <div className="min-w-0 flex space-x-2">
                          <p className="text-sm text-muted dark:text-dark-muted truncate">
                            <span className="text-sm font-medium text-text dark:text-dark-text truncate">
                              {" "}
                              From:{" "}
                            </span>
                            {message.fullName || "Unknown Sender"}
                          </p>
                          <p className="text-sm text-muted dark:text-dark-muted truncate">
                            <span className="text-sm font-medium text-text dark:text-dark-text truncate">
                              {" "}
                              Email:{" "}
                            </span>
                            {message.email || "No email provided"}
                          </p>
                          <p className="text-sm text-muted dark:text-dark-muted truncate">
                            <span className="text-sm font-medium text-text dark:text-dark-text truncate">
                              {" "}
                              subject:{" "}
                            </span>
                            {message.subject || "No email provided"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs text-muted dark:text-dark-muted whitespace-nowrap">
                          {formatDistanceToNow(new Date(message.createdAt), {
                            addSuffix: true,
                          })}
                        </span>
                        {message.status === "unread" && (
                          <span className="inline-flex  items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary dark:bg-dark-primary/10 dark:text-dark-primary">
                            New <Mail size={16} className="ml-1"/>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Message Content */}
                    <p className="mt-2 border-t border-neutral-600 dark:border-neutral-400 pt-2 text-sm text-text dark:text-dark-text line-clamp-2 whitespace-normal break-words">
                      {message.message || "No message content"}
                    </p>

                    {/* Action Buttons */}
                    <div className="mt-3 flex justify-end gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setMessageToDelete([message]);
                        }}
                        className="inline-flex items-center px-1.5 cursor-pointer py-0.5 text-xs font-medium rounded-md text-white bg-error hover:bg-error/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-error"
                      >
                        <Trash2 className="h-3.5 w-3.5 mr-1" />
                        Delete
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMessageClick(message);
                        }}
                        className="inline-flex cursor-pointer items-center px-1.5 py-0.5 text-xs font-medium rounded-md text-white bg-primary hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:bg-dark-primary dark:hover:bg-dark-primary-dark"
                      >
                        <Eye className="h-3.5 w-3.5 mr-1" />
                        View
                      </button>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className="px-4 py-8 text-center text-muted dark:text-dark-muted">
                {searchTerm.trim()
                  ? "No messages found matching your search."
                  : "No messages found."}
              </li>
            )}
          </ul>
        </div>
      </div>
      {filteredMessages.length > itemsPerPage && (
        <div className="mt-6">
          <Pagination>
            <PaginationContent className="flex justify-center">
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  className={
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>
              <PaginationItem>
                <span className="text-sm px-4 py-2 text-muted-foreground dark:text-dark-muted">
                  Page {currentPage} of{" "}
                  {Math.ceil(filteredMessages.length / itemsPerPage)}
                </span>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((prev) =>
                      prev < Math.ceil(filteredMessages.length / itemsPerPage)
                        ? prev + 1
                        : prev
                    )
                  }
                  className={
                    currentPage ===
                    Math.ceil(filteredMessages.length / itemsPerPage)
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {selectedMessage && (
        <MessageModal
          message={selectedMessage}
          onClose={() => setSelectedMessage(null)}
        />
      )}

      {messageToDelete && (
        <DeleteModal
          messages={
            Array.isArray(messageToDelete)
              ? messageToDelete.map((m) => m._id)
              : [messageToDelete._id]
          }
          onConfirm={handleDelete}
          onCancel={() => setMessageToDelete(null)}
          isMultiple={Array.isArray(messageToDelete)}
          count={Array.isArray(messageToDelete) ? messageToDelete.length : 1}
        />
      )}
    </div>
  );
}
