import { Skeleton } from "@/components/ui/skeleton";
import UpdateUserModal from "@/components/AdminPanel/users/updateUserModal";
import DeleteUserModal from "@/components/AdminPanel/users/deleteUserModal";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type User = {
  _id: string;
  userID: string;
  full_name: string;
  email: string;
  role: string;
  profileImage: string;
  isActive: boolean;
  provider: string;
  subscription: {
    plan: string;
    status: string;
  };
  emailVerified: boolean;
};

type UsersTableProps = {
  users: User[];
  loading: boolean;
  onUserUpdate?: (updatedUser: User) => void;
  onUserDeleted?: (userID: string) => void;
};

export default function UsersTable({
  users,
  loading,
  onUserUpdate,
  onUserDeleted,
}: UsersTableProps) {
  return (
    <div
      className={`border border-neutral-500 rounded-xl  overflow-x-auto transition-opacity duration-300 ${
        loading ? "opacity-60" : "opacity-100"
      }`}
    >
      <Table>
        <TableHeader className="bg-neutral-100 dark:bg-neutral-900">
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Account status</TableHead>
            <TableHead>Subscription Plan</TableHead>
            <TableHead>Subscription Status</TableHead>
            <TableHead>Email Verified</TableHead>
            <TableHead>Account type</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={`skeleton-row-${i}`}>
                {[...Array(9)].map((_, j) => (
                  <TableCell key={j}>
                    <Skeleton className="h-4 w-full bg-neutral-400 rounded-md" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : users.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={9}
                className="text-center text-muted-foreground"
              >
                No users found.
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user._id || user.userID}>
               <TableCell className=" ">
  <div className="flex items-center gap-3">
    {user.profileImage ? (
      <Image
        src={user.profileImage}
        width={32}
        height={32}
        alt={user.full_name}
        className="rounded-full w-8 h-8 object-cover"
      />
    ) : (
      <span className="rounded-full w-8 h-8 bg-primary-light text-primary flex items-center justify-center font-semibold text-sm">
        {user.full_name?.[0]?.toUpperCase() ?? "A"}
      </span>
    )}
    <span className="text-sm  font-medium truncate">{user.full_name}</span>
  </div>
</TableCell>


                <TableCell className=" min-w-fit">{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Badge
                    variant={"default"}
                    className={`rounded-md  flex justify-center items-between w-fit h-fit bg-transparent px-1 py-0.5  gap-1 border ${
                      user.isActive ? "border-success" : "border-error"
                    }`}
                  >
                    <span
                      className={` text-2xl h-5 max-w-5 -mt-4  ${
                        user.isActive
                          ? "text-success dark:text-success-l"
                          : "text-error dark:text-error-l"
                      }`}
                    >
                      •
                    </span>
                    <span>{user.isActive ? "Active" : "Inactive"}</span>
                  </Badge>
                </TableCell>

                <TableCell>{user.subscription?.plan ?? "-"}</TableCell>
                <TableCell>
                  {user.subscription?.status ? (
                    <Badge
                      className={`rounded-md  flex justify-center items-between w-fit h-fit bg-transparent px-1 py-0.5  gap-1 border ${
                        user.subscription.status === "active"
                          ? "border-success bg-success-l/50 dark:bg-d-success-l"
                          : user.subscription.status === "trial"
                          ? "border-warning  bg-warning-l/50 dark:bg-d-warning-l"
                          : user.subscription.status === "inactive" ||
                            user.subscription.status === "canceled"
                          ? "border-error bg-error-l/50 dark:bg-d-error-l"
                          : "border-muted"
                      }`}
                    >
                      <span
                        className={`text-xs  ${
                          user.subscription.status === "active"
                            ? "text-success  dark:text-success-l"
                            : user.subscription.status === "trial"
                            ? "text-warning dark:text-warning-l"
                            : user.subscription.status === "inactive" ||
                              user.subscription.status === "canceled"
                            ? "text-error dark:text-error-l"
                            : "text-muted"
                        }`}
                      >
                        {user.subscription.status}
                      </span>
                    </Badge>
                  ) : (
                    "-"
                  )}
                </TableCell>

                <TableCell>{user.emailVerified ? "Yes" : "No"}</TableCell>
                <TableCell>{user.provider}</TableCell>
                <TableCell className="flex items-center gap-2">
                  <UpdateUserModal user={user} onUserUpdate={onUserUpdate} />
                  <DeleteUserModal
                    userID={user.userID}
                    fullName={user.full_name}
                    onUserDeleted={onUserDeleted ?? (() => {})}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
