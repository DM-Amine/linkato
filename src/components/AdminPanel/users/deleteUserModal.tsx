"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Trash2, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

type Props = {
  userID: string;
  fullName: string;
  onUserDeleted: (userID: string) => void;
};


export default function DeleteUserModal({
  userID,
  fullName,
  onUserDeleted,
}: Props) {
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/users/${userID}`, {
        method: "DELETE",
      });
  
      if (!res.ok) {
        throw new Error("Failed to delete user.");
      }
  
      onUserDeleted(userID); // This will update the frontend
      toast.success(`User "${fullName}" deleted successfully.`);
      setOpen(false);
 
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Something went wrong while deleting the user.");
    } finally {
      setDeleting(false);
    }
  };
  
  return (
    <>
      <Button  variant="ghost"
      className="p-0 h-6 w-6 border border-neutral-600 hover:border-neutral-400 hover:text-error hover:dark:text-d-error dark:hover:border-neutral-400"
      size="icon" onClick={() => setOpen(true)}>
        <Trash2 size={20} />
      </Button>

      <Dialog open={open} onOpenChange={setOpen} >
        <DialogContent className="sm:max-w-md bg-neutral-100 dark:bg-neutral-800 px-3 py-2">
          <DialogHeader>
          <TriangleAlert className="h-12 w-12 text-error " />
            <DialogTitle>Delete User</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete{" "}
            <span className="font-medium">{fullName}</span>? This action cannot
            be undone.
          </p>
          <DialogFooter className="mt-4">
            <Button
              variant="ghost"
              onClick={() => setOpen(false)}
              disabled={deleting}
              className="bg-neutral-200 dark:bg-neutral-900  border border-neutral-500 hover:border-neutral-400"
            >
              Cancel
            </Button>
            <Button
  variant="destructive"
  onClick={handleDelete}
  disabled={deleting}
  className={`bg-error-l text-error dark:bg-d-error-l dark:text-error-l ${deleting && 'cursor-not-allowed opacity-50'}`}
>
  {deleting ? "Deleting..." : "Delete"}
  <Trash2 size={20} />
</Button>

          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
