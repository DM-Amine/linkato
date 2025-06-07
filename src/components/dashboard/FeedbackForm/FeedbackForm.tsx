'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, XCircle } from 'lucide-react';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';

// Schema for Feedback form
const feedbackSchema = z.object({
  subject: z.string().trim().min(1, 'Subject is required').max(100),
  message: z.string().trim().min(1, 'Message is required').max(500, 'Message exceeds 500 characters'),
});

type FeedbackFormData = z.infer<typeof feedbackSchema>;

export default function FeedbackForm() {
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      subject: '',
      message: '',
    },
  });

  const messageValue = watch('message');

  const onSubmit = async (data: FeedbackFormData) => {
    if (!session?.user?.email || !session?.user?.name) {
      toast.error('You must be signed in to send feedback.', {
        icon: <XCircle className="text-red-500" />,
      });
      return;
    }

    const payload = {
      fullName: session.user.name,
      email: session.user.email.toLowerCase(),
      subject: data.subject,
      message: data.message,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Failed to send feedback');

      reset();
      toast.success('Feedback sent successfully!', {
        icon: <CheckCircle className="text-green-500" />,
      });
    } catch (error) {
      console.error(error);
      toast.error('Failed to send feedback. Please try again later.', {
        icon: <XCircle className="text-red-500" />,
      });
    }
  };

  return (
    <div className="bg-neutral-100 dark:bg-neutral-900 rounded-2xl shadow-lg border border-neutral-400 dark:border-neutral-600 overflow-hidden">
      <form onSubmit={handleSubmit(onSubmit)} className="px-3 py-3 sm:px-4 sm:py-3 sm:space-y-5 space-y-3">
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-neutral-800 dark:text-neutral-300">
            Subject
          </label>
          <Input
            id="subject"
            {...register('subject')}
            placeholder="Feedback subject"
            maxLength={100}
            className={clsx({ 'border-red-500': errors.subject })}
          />
          {errors.subject && <p className="text-sm text-red-500 mt-1">{errors.subject.message}</p>}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-neutral-800 dark:text-neutral-300">
            Message
          </label>
          <Textarea
            id="message"
            {...register('message')}
            placeholder="Your message here..."
            maxLength={500}
            rows={5}
            className={clsx({ 'border-red-500': errors.message })}
          />
          <div className="flex justify-between mt-2 text-sm">
            <span
              className={clsx(
                'text-sm',
                messageValue.length > 450
                  ? 'text-warning dark:text-warning-light'
                  : 'text-muted-foreground'
              )}
            >
              {messageValue?.length || 0}/500 characters
            </span>
            {errors.message && <span className="text-red-500">{errors.message.message}</span>}
          </div>
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center h-8 py-3 px-4 border border-transparent rounded-lg
              text-sm font-semibold 
              focus:outline-none focus:ring-2 focus:ring-offset-2
              disabled:opacity-50 disabled:cursor-not-allowed transition duration-150
              shadow-sm hover:shadow"
          >
            {isSubmitting ? 'Sending...' : 'Send Feedback'}
          </Button>
        </div>
      </form>
    </div>
  );
}
