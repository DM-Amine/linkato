'use client';

import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { X, Trash2, TriangleAlert  } from 'lucide-react';

interface DeleteModalProps {
  messages?: string[]; 
  onConfirm: () => void;
  onCancel: () => void;
  isMultiple?: boolean;
  count?: number;
}


const DeleteModal: React.FC<DeleteModalProps> = ({
  onConfirm,
  onCancel,
  isMultiple = false,
  count = 1,
}) => {
  return (
    <AlertDialog open onOpenChange={(open) => !open && onCancel()}>
      <AlertDialogContent className='bg-neutral-200 dark:bg-neutral-900 px-3 py-2'>
        <div className="absolute right-4 top-4">
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="h-5 w-5 " />
            <span className="sr-only">Close</span>
          </Button>
        </div>
        <AlertDialogHeader>
          <AlertDialogTitle>
          <TriangleAlert className="h-12 w-12 text-error " />
            {isMultiple ? `Delete ${count} Messages` : 'Delete Message'}
          </AlertDialogTitle>
          <AlertDialogDescription>
          
            {isMultiple
              ? `Are you sure you want to delete ${count} selected messages? This action cannot be undone.`
              : 'Are you sure you want to delete this message? This action cannot be undone.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="bg-neutral-200 dark:bg-neutral-900  border border-neutral-500 hover:border-neutral-400"
            onClick={onCancel}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-error  text-neutral-300  hover:bg-error/70"
            onClick={onConfirm}
          >
            <Trash2 className="h-5 w-5 " />
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteModal;
