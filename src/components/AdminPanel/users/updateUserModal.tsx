'use client';

import { useState, useEffect } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pencil } from 'lucide-react';
import { toast } from 'sonner';

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

export default function UpdateUserModal({
  user,
  onUserUpdate,
}: {
  user: User;
  onUserUpdate?: (updatedUser: User) => void;
}) {
  const [open, setOpen] = useState(false);
  const [fullName, setFullName] = useState(user.full_name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [isActive, setIsActive] = useState(user.isActive);
  const [password, setPassword] = useState(''); // To store password
  const [subscriptionPlan, setSubscriptionPlan] = useState(user.subscription.plan);
  const [subscriptionStatus, setSubscriptionStatus] = useState(user.subscription.status);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFullName(user.full_name);
    setEmail(user.email);
    setRole(user.role);
    setIsActive(user.isActive);
    setSubscriptionPlan(user.subscription.plan);
    setSubscriptionStatus(user.subscription.status);
  }, [user]);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/users/${user.userID}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName,
          email,
          role,
          isActive,
          password: password ? password : undefined, // Only send password if provided
          subscription: {
            plan: subscriptionPlan,
            status: subscriptionStatus,
          },
        }),
      });

      if (!res.ok) throw new Error('Failed to update user');
      const data = await res.json();

      toast.success('User updated successfully!');

      onUserUpdate?.(data.updatedUser);

      setOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} key={open ? 'open' : 'closed'}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="p-0 h-6 w-6 border border-neutral-600 hover:border-neutral-400 dark:hover:border-neutral-400"
          size="icon"
        >
          <Pencil size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[500px] overflow-y-auto bg-neutral-100 dark:bg-neutral-800">
        <DialogHeader>
          <DialogTitle>Update User</DialogTitle>
          <DialogDescription>Edit user information and save changes.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div>
            <Label htmlFor="full_name" className="mb-2">
              Full Name
            </Label>
            <Input
              id="full_name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter full name"
            />
          </div>
          <div>
            <Label htmlFor="email" className="mb-2">
              Email
            </Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </div>
          <div>
            <Label htmlFor="role" className="mb-2">
              Role
            </Label>
            <Select value={role} onValueChange={(value) => setRole(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent className="bg-neutral-100 dark:bg-neutral-800">
                <SelectItem value="admin" className="hover:bg-neutral-300 hover:dark:bg-neutral-700">
                  Admin
                </SelectItem>
                <SelectItem value="user" className="hover:bg-neutral-300 hover:dark:bg-neutral-700">
                  User
                </SelectItem>
                
                <SelectItem value="moderator" className="hover:bg-neutral-300 hover:dark:bg-neutral-700">
                  Moderator
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="isActive" className="mb-2">
            Account status
            </Label>
            <Select
              value={isActive ? 'active' : 'inactive'}
              onValueChange={(value) => setIsActive(value === 'active')}
            >
              <SelectTrigger id="isActive" className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-neutral-100 dark:bg-neutral-800">
                <SelectItem value="active" className="hover:bg-neutral-300 dark:hover:bg-neutral-700">
                  Active
                </SelectItem>
                <SelectItem value="inactive" className="hover:bg-neutral-300 dark:hover:bg-neutral-700">
                  Inactive
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="password" className="mb-2">
              New Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
            />
          </div>

          <div>
            <Label htmlFor="subscriptionPlan" className="mb-2">
              Subscription Plan
            </Label>
            <Select value={subscriptionPlan} onValueChange={(value) => setSubscriptionPlan(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select plan" />
              </SelectTrigger>
              <SelectContent className="bg-neutral-100 dark:bg-neutral-800">
                <SelectItem value="free" className="hover:bg-neutral-300 hover:dark:bg-neutral-700">
                  Free
                </SelectItem>
                <SelectItem value="pro" className="hover:bg-neutral-300 hover:dark:bg-neutral-700">
                  Pro
                </SelectItem>
                <SelectItem value="business" className="hover:bg-neutral-300 hover:dark:bg-neutral-700">
                  Business
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="subscriptionStatus" className="mb-2">
              Subscription Status
            </Label>
            <Select value={subscriptionStatus} onValueChange={(value) => setSubscriptionStatus(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-neutral-100 dark:bg-neutral-800">
                <SelectItem value="active" className="hover:bg-neutral-300 hover:dark:bg-neutral-700">
                  Active
                </SelectItem>
                <SelectItem value="inactive" className="hover:bg-neutral-300 hover:dark:bg-neutral-700">
                  Inactive
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleUpdate} disabled={loading}>
            {loading ? 'Updating...' : 'Update User'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
