import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  ChartBarBig,
  AppWindow,
  Smartphone,
  Cpu,
  Languages,
} from "lucide-react";

type InsightItem = {
  name: string;
  count: number;
  percentage: number;
};

export function TopInsightsTabsCard({
  browsers,
  devices,
  os,
  languages,
}: {
  browsers: InsightItem[];
  devices: InsightItem[];
  os: InsightItem[];
  languages: InsightItem[];
}) {
  const tabData = [
    { key: "browsers", label: "Browsers", icon: <AppWindow size={14} /> },
    { key: "devices", label: "Devices", icon: <Smartphone size={14} /> },
    { key: "os", label: "OS", icon: <Cpu size={14} /> },
    { key: "languages", label: "Languages", icon: <Languages size={14} /> },
  ];

  const renderItems = (items: InsightItem[]) =>
    items.map((item) => (
      <div
        key={item.name}
        className="relative w-full rounded-md overflow-hidden bg-neutral-200 dark:bg-neutral-800"
      >
        <div
          className="absolute top-0 left-0 h-full bg-primary opacity-30 dark:opacity-40"
          style={{ width: `${item.percentage}%` }}
        />
        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center px-3 py-1.5 text-sm gap-1 sm:gap-4">
          <span className="font-medium text-neutral-800 dark:text-neutral-100">
            {item.name}
          </span>
          <div className="flex items-center text-xs gap-2 text-neutral-600 dark:text-neutral-300">
            <span>{item.count} users</span>
            <span className="font-semibold text-primary dark:text-primary-light">
              {item.percentage.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
    ));

  return (
    <Card className="w-full my-3 py-2 bg-neutral-100 dark:bg-neutral-900 border border-neutral-500 shadow-none">
  <CardHeader className="px-3 py-2">
    <CardTitle className="text-base text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
      <ChartBarBig size={18} />
      Top Insights
    </CardTitle>
  </CardHeader>
  <CardContent className="max-w-full px-2 sm:px-3">
    <Tabs defaultValue="browsers" className="w-full">
    <div className="w-full overflow-x-auto no-scrollbar">
  <TabsList
    className="inline-flex min-w-max gap-1 mb-3 px-2 py-1 rounded-md 
      dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700"
  >
    {tabData.map((tab) => (
      <TabsTrigger
        key={tab.key}
        value={tab.key}
        className="flex-shrink-0 text-xs sm:text-sm cursor-pointer text-neutral-800 dark:text-neutral-100 py-1 px-2 rounded-md transition-colors duration-200
        hover:bg-neutral-300 dark:hover:bg-neutral-700
        data-[state=active]:bg-neutral-400/40 data-[state=active]:border data-[state=active]:border-neutral-500 dark:data-[state=active]:bg-neutral-600
        data-[state=active]:text-black dark:data-[state=active]:text-white"
      >
        <div className="flex items-center gap-1">
          {tab.icon}
          <span>{tab.label}</span>
        </div>
      </TabsTrigger>
    ))}
  </TabsList>
</div>


      <TabsContent value="browsers">
        <div className="space-y-1.5">{renderItems(browsers)}</div>
      </TabsContent>
      <TabsContent value="devices">
        <div className="space-y-1.5">{renderItems(devices)}</div>
      </TabsContent>
      <TabsContent value="os">
        <div className="space-y-1.5">{renderItems(os)}</div>
      </TabsContent>
      <TabsContent value="languages">
        <div className="space-y-1.5">{renderItems(languages)}</div>
      </TabsContent>
    </Tabs>
  </CardContent>
</Card>

  );
}
