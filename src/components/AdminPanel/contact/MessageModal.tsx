'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { format } from 'date-fns';
import { X, Mail,Clock8  } from 'lucide-react';

interface Message {
  fullName?: string;
  email: string;
  subject?: string;
  createdAt: string | Date;
  message: string;
}

interface MessageModalProps {
  message: Message | null;
  onClose: () => void;
}

export default function MessageModal({ message, onClose }: MessageModalProps) {
  if (!message) return null;

  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-neutral-900/30 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 overflow-y-auto ">
          <div className="flex min-h-full items-center  justify-center p-4 sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative text-neutral-800 dark:text-neutral-200 w-full max-w-xl transform overflow-hidden rounded-2xl bg-neutral-200 dark:bg-neutral-900 shadow-xl transition-all">
                {/* Close Button */}
                <div className="absolute top-4 right-4">
                  <button
                    type="button"
                    className="text-muted cursor-pointer dark:text-dark-muted hover:text-text dark:hover:text-dark-text focus:outline-none"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-2 sm:p-4 space-y-2">
                  {/* Metadata Badge */}
                  <div >
                  
                
                    <span className="text-xs flex w-fit bg-neutral-100 dark:bg-neutral-800 text-muted dark:text-dark-muted px-1 py-1 rounded-md">
                    <Clock8 className="h-3.5 w-3.5 mx-1" />
                      Sent: {format(new Date(message.createdAt), 'PPpp')}
                    </span>
                  </div>

                  {/* Title */}
                  <Dialog.Title
                    as="h2"
                    className="text-xl font-semibold text-text dark:text-dark-text border-b pb-2"
                  >
                    Message from: {message.fullName || 'Unknown Sender'}
                  </Dialog.Title>

                  {/* Meta Info */}
                  <div className="text-sm text-muted dark:text-dark-muted space-y-1">
                    <p><span className="font-medium text-text dark:text-dark-text">Email:</span> {message.email}</p>
                    {message.subject && (
                      <p><span className="font-medium text-text dark:text-dark-text">Subject:</span> {message.subject}</p>
                    )}
                  </div>
                 <div className='flex mt-6 text-xs w-fit border  border-neutral-500 rounded-lg rounded-bl-none rounded-br-none py-1 px-1 bg-neutral-100 dark:bg-neutral-800 '>
                 <Mail className="h-3 w-3 mt-0.5 mx-1" />
                 <span>Message:</span>
                 </div>
                  {/* Message Content */}
                  <div className="rounded-lg -mt-[9px] border border-neutral-500 rounded-tl-none bg-neutral-100 dark:bg-neutral-800 p-4 max-h-[300px] overflow-y-auto">
                    
                    <p className="text-sm text-text dark:text-dark-text whitespace-pre-wrap break-words leading-relaxed">
                      {message.message}
                    </p>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
