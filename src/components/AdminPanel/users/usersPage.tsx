"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import UsersTable from "@/components/AdminPanel/users/usersTable";
import AddUserModal from "@/components/AdminPanel/users/addUserModal";
import { Funnel } from "lucide-react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";

import { Button } from "@/components/ui/button";
import { Search, Upload } from "lucide-react";

type User = {
  _id: string;
  userID: string;
  full_name: string;
  email: string;
  role: string;
  isActive: boolean;
  profileImage: string;
  provider: string;
  subscription: {
    plan: string;
    status: string;
  };
  emailVerified: boolean;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("All");
  const [selectedPlan, setSelectedPlan] = useState<string>("All");
  const [loading, setLoading] = useState(true);
  const [tempSelectedRole, setTempSelectedRole] = useState("All");
  const [tempSelectedPlan, setTempSelectedPlan] = useState("All");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const roles = ["All", "admin", "user", "moderator"];
  const plans = ["All", "free", "pro", "business"];

  const searchParams = useSearchParams();
  const router = useRouter();

  const page = parseInt(searchParams.get("page") || "1");
  const perPage = parseInt(searchParams.get("perPage") || "10");

  const totalPages = Math.ceil(filteredUsers.length / perPage);
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * perPage,
    page * perPage
  );

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    params.set("perPage", perPage.toString());
    router.push(`?${params.toString()}`);
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      if (res.ok) {
        setUsers(data.users);
        setFilteredUsers(data.users);
      }
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const q = searchQuery.toLowerCase();
    const filtered = users.filter((user) => {
      const matchQuery =
        user.full_name.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q);

      const matchRole =
        selectedRole === "All" ? true : user.role === selectedRole;
      const matchPlan =
        selectedPlan === "All"
          ? true
          : user.subscription?.plan === selectedPlan;

      return matchQuery && matchRole && matchPlan;
    });

    setFilteredUsers(filtered);
  }, [searchQuery, users, selectedRole, selectedPlan]);

  const exportToCSV = () => {
    const csvHeaders = [
      "Full Name",
      "Email",
      "Role",
      "Account status",
      "Subscription Plan",
      "Subscription Status",
      "Verified",
    ];

    const csvRows = filteredUsers.map((user) =>
      [
        user.full_name,
        user.email,
        user.role,
        user.isActive ? "Yes" : "No",
        user.subscription?.plan ?? "-", // Ensures plan is included or a placeholder if missing
        user.subscription?.status ?? "-", // Ensures status is included or a placeholder if missing
        user.emailVerified ? "Yes" : "No",
      ].join(",")
    );

    const csvContent = [csvHeaders.join(","), ...csvRows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "users_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to add a new user to the users list
  const addUser = (newUser: User) => {
    setUsers((prevUsers) => [newUser, ...prevUsers]);
    setFilteredUsers((prevFilteredUsers) => [newUser, ...prevFilteredUsers]);
  };

  // Update user in real-time
  const handleUserUpdate = (updatedUser: User | undefined) => {
    if (!updatedUser) return;

    setUsers((prev) =>
      prev.map((user) =>
        user.userID === updatedUser.userID ? updatedUser : user
      )
    );
  };

  const handleUserDeleted = (deletedID: string) => {
    setUsers((prevUsers) =>
      prevUsers.filter((user) => user.userID !== deletedID)
    );
  };
  useEffect(() => {
    const roleParam = searchParams.get("role") || "All";
    const planParam = searchParams.get("plan") || "All";
    setSelectedRole(roleParam);
    setSelectedPlan(planParam);
    setTempSelectedRole(roleParam);
    setTempSelectedPlan(planParam);
  }, [searchParams]);

  useEffect(() => {
    const initialSearch = searchParams.get("search") || "";
    setSearchQuery(initialSearch);
  }, [searchParams]);
  return (
    <div className="sm:px-6 sm:py-4  px-2 py-3 space-y-6">
      <div className="flex justify-between gap-4">
        <h1 className="text-3xl font-bold">Users</h1>
        <div className="flex mt-3 space-x-2">
          <AddUserModal onUserAdded={addUser} />
          <Button onClick={exportToCSV} className="!px-1 w-fit py-1  gap-1 mt-2 mr-1 border border-primary hover:bg-primary text-neutral-200 text-xs font-medium rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            <Upload size={16} />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="flex  ">
        {/* Search */}
        <div className="relative   sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => {
                const value = e.target.value;
                setSearchQuery(value);

                const params = new URLSearchParams(searchParams.toString());
                if (value.trim() === "") {
                  params.delete("search");
                } else {
                  params.set("search", value);
                  params.set("page", "1"); // optional: reset to first page on search
                }

                router.push(`?${params.toString()}`);
              }}
              className="pl-9 h-6  border-neutral-500 "
            />
          </div>
        <div className="flex  flex-col sm:flex-row flex-wrap gap-4">
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger asChild>
              <Button
                variant={"ghost"}
                onClick={() => setIsDrawerOpen(true)}
                className="!px-2 mx-1.5 !w-fit sm:gap-1  border border-neutral-500  hover:border-neutral-700 hover:dark:border-neutral-600 "
              >
                <Funnel className=" h-4 w-4 " />
                <span className="sm:flex hidden">Filter</span>
              </Button>
            </DrawerTrigger>

            <DrawerContent className="w-[600px]">
              <DrawerHeader>
                <DrawerTitle>Filter Users</DrawerTitle>
              </DrawerHeader>

              <div className="px-4 py-2 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Role</label>
                  <Select
                    value={tempSelectedRole}
                    onValueChange={(value) => setTempSelectedRole(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Plan</label>
                  <Select
                    value={tempSelectedPlan}
                    onValueChange={(value) => setTempSelectedPlan(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select plan" />
                    </SelectTrigger>
                    <SelectContent>
                      {plans.map((plan) => (
                        <SelectItem key={plan} value={plan}>
                          {plan}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <DrawerFooter className="flex flex-col sm:flex-row sm:justify-end sm:gap-2">
                <Button
                  variant="default"
                  className="text-sm py-0.5 h-fit text-neutral-200"
                  onClick={() => {
                    const params = new URLSearchParams(searchParams.toString());
                    params.set("role", tempSelectedRole);
                    params.set("plan", tempSelectedPlan);
                    params.set("page", "1");
                    router.push(`?${params.toString()}`);
                    setIsDrawerOpen(false);
                  }}
                >
                  Apply
                </Button>

                <Button
                  variant="ghost"
                  className="text-sm text-neutral-800 dark:text-neutral-200 border hover:border-neutral-500"
                  onClick={() => {
                    const params = new URLSearchParams(searchParams.toString());
                    params.delete("role");
                    params.delete("plan");
                    params.set("page", "1");
                    router.push(`?${params.toString()}`);
                    setIsDrawerOpen(false);
                  }}
                >
                  Reset
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          
        </div>
      </div>

      <div>
        <p className="text-md text-muted-foreground">
          Total users:
          <span className=" mx-1 font-semibold text-primary dark:text-primary-light">
            {filteredUsers.length} users
          </span>
        </p>
      </div>

      {/* ✅ Update: pass `handleUserUpdate` to the table */}
      <div className="  overflow-hidden">
        <UsersTable
          users={loading ? [] : paginatedUsers}
          loading={loading}
          onUserUpdate={handleUserUpdate}
          onUserDeleted={handleUserDeleted} // Pass handleUserDeleted here
        />
      </div>

      {/* Pagination */}
      {filteredUsers.length > 0 && (
        <div className="flex justify-center mt-4">
          <Pagination>
            <PaginationContent className="gap-2">
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => changePage(Math.max(1, page - 1))}
                />
              </PaginationItem>
              <PaginationItem className="text-sm px-4 py-2">
                Page {page} of {totalPages}
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={() => changePage(Math.min(totalPages, page + 1))}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
