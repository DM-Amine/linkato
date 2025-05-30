'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Plus, User, Mail, Eye, EyeOff, Lock } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type User = {
  _id: string;
  userID: string;
  full_name: string;
  email: string;
  profileImage: string;
  role: string;
  isActive: boolean;
  provider: string;
  subscription: {
    plan: string;
    status: string;
  };
  emailVerified: boolean;

};

type AddUserModalProps = {
  onUserAdded: (newUser: User) => void;
};

export default function AddUserModal({ onUserAdded }: AddUserModalProps) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    role: 'user',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Validate the required fields
    if (!formData.full_name || !formData.email || !formData.password) {
      toast.error('Name, email, and password are required.');
      return;
    }
  
    // Add provider field
    const newUserData = {
      ...formData,  // Spread the existing form data
      provider: "credentials",  // Add the provider field with the default value
    };
  
    setIsSubmitting(true);
  
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUserData),  // Send the new user data with provider
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        toast.error(data.error || 'Something went wrong.');
      } else {
        toast.success('User added successfully!');
        onUserAdded(data.user);
        setShowModal(false);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to add user.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div>
      <Button
        variant={"default"}
        className="!px-1 w-fit py-1 mt-2 gap-0.5 mr-1 border border-primary hover:bg-primary text-neutral-200 text-xs font-medium rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        size="default"
        onClick={() => setShowModal(true)}
      >
        <Plus size={18} className="p-0" />
        <span className='hidden sm:flex '>Add new</span>
      </Button>

      {showModal && (
        <div className="modal-bg absolute inset-0 z-[50] flex items-center justify-center bg-neutral-300/20 dark:bg-neutral-800/40 backdrop-blur-sm">
          <div className="w-full max-w-2xl mx-2 rounded-2xl bg-neutral-200 dark:bg-neutral-900 shadow-xl border border-neutral-300 dark:border-neutral-700">
            <h1 className="text-md flex w-full border rounded-tr-xl rounded-tl-xl border-neutral-500 px-4 py-2 text-neutral-700 dark:text-neutral-300 font-bold mb-4 pb-2">
              <User size={18} strokeWidth={1.5} className="mt-1 mr-1.5" />
              Add New User
            </h1>
            <div className="px-4 py-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div className="relative flex items-center space-x-3">
                  <User size={20} className="absolute left-3 mt-6 text-neutral-500 dark:text-neutral-400" />
                  <div className="flex-1">
                    <Label
                      htmlFor="full_name"
                      className="block text-sm text-neutral-800 dark:text-neutral-300 mb-1"
                    >
                      Name
                    </Label>
                    <Input
                      id="full_name"
                      name="full_name"
                      placeholder="John Doe"
                      className="pl-10 bg-neutral-200 dark:bg-neutral-800 border border-neutral-500"
                      value={formData.full_name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="relative flex items-center space-x-3">
                  <Mail size={20} className="absolute left-3 mt-6 text-neutral-500 dark:text-neutral-400" />
                  <div className="flex-1">
                    <Label
                      htmlFor="email"
                      className="block text-sm text-neutral-800 dark:text-neutral-300 mb-1"
                    >
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      className="pl-10 bg-neutral-200 dark:bg-neutral-800 border border-neutral-500"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="relative flex items-center space-x-3">
                  <Lock size={20} className="absolute left-3 mt-6 text-neutral-500 dark:text-neutral-400" />
                  <div className="flex-1">
                    <Label
                      htmlFor="password"
                      className="block text-sm text-neutral-800 dark:text-neutral-300 mb-1"
                    >
                      Password
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 pr-10 bg-neutral-200 dark:bg-neutral-800 border border-neutral-500"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center justify-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff size={20} className="text-neutral-500 mt-6 mr-3 dark:text-neutral-400" />
                    ) : (
                      <Eye size={20} className="text-neutral-500 mt-6 mr-3 dark:text-neutral-400" />
                    )}
                  </button>
                </div>

                {/* Role */}
                <div className="relative flex items-center space-x-3">
                  <div className="flex-1">
                    <Label
                      htmlFor="role"
                      className="block text-sm text-neutral-800 dark:text-neutral-300 mb-1"
                    >
                      Role
                    </Label>
                    <Select
                      value={formData.role}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, role: value }))
                      }
                    >
                      <SelectTrigger className="w-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-500 text-sm text-neutral-800 dark:text-neutral-300">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent className="bg-neutral-100 dark:bg-neutral-900 text-sm text-neutral-800 dark:text-neutral-200">
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
                </div>
              </form>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 py-2 px-4">
              <Button
                variant="outline"
                type="button"
                className="bg-neutral-200 dark:bg-neutral-800"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                onClick={handleSubmit}
                className="bg-primary text-white hover:bg-primary/90"
              >
                {isSubmitting ? "Adding..." : "Add User"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
