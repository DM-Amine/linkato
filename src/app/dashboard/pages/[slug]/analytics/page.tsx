import { LineChart } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[60vh] px-4 bg-gradient-to-b from-neutral-200 to-primary-light/20 dark:from-neutral-900  dark:to-d-primary-light/20 transition-colors">
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-primary/80 to-primary-light/20 shadow-lg mb-6">
        <LineChart className="text-white w-10 h-10 drop-shadow-lg" />
      </div>
      <h1 className="text-3xl font-extrabold mb-2 text-neutral-900 dark:text-neutral-100 tracking-tight">
        Analytics Coming Soon...
      </h1>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-6 text-center max-w-md">
  We&apos;re working to bring you powerful analytics, insights, and tracking tools for each page you create to help grow your business.
</p>

      {/* <div className="flex space-x-2 mt-2">
        <span className="w-3 h-3 rounded-full bg-primary dark:bg-d-primary animate-pulse" />
        <span className="w-3 h-3 rounded-full bg-primary dark:bg-d-primary  animate-pulse delay-150" />
        <span className="w-3 h-3 rounded-full bg-primary dark:bg-d-primary  animate-pulse delay-300" />
      </div> */}
    </div>
  );
}