import CreateFormBtn from "@/components/CreateFormBtn";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { formatDistance } from "date-fns";
import { ArrowDown, Eye, FormInput, MousePointerClick } from 'lucide-react';
import { useState } from "react";

export default function Home() {
  const [stats] = useState<null>(null);
  const [loadingStats] = useState(true);
  const [forms] = useState<[]>([]);
  const [loadingForms] = useState(true);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <div className="container pt-4">
      {loadingStats ? (
        <StatsCards loading={true} />
      ) : (
        <StatsCards data={stats} loading={false} />
      )}

      <Separator className="my-6" />
      <h2 className="text-4xl font-bold col-span-2">Ваши формы</h2>
      <Separator className="my-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CreateFormBtn />
        {loadingForms ? (
          [1, 2, 3, 4].map((el) => <FormCardSkeleton key={el} />)
        ) : (
          <FormCards forms={forms} />
        )}
      </div>
    </div>
    </ThemeProvider>
  );
}

interface StatsCardProps {
  data?: null;
  loading: boolean;
}

function StatsCards(props: StatsCardProps) {
  const { data, loading } = props;

  return (
    <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total visits"
        icon={<Eye className="text-blue-600" />}
        helperText="All time form visits"
        value="45%"
        loading={loading}
        className=""
      />

      <StatsCard
        title="Total submissions"
        icon={<FormInput className="text-yellow-600" />}
        helperText="All time form submissions"
        value="45%"
        loading={loading}
        className=""
      />

      <StatsCard
        title="Submission rate"
        icon={<MousePointerClick className="text-green-600" />}
        helperText="Visits that result in form submission"
        value="45%"
        loading={loading}
        className=""
      />

      <StatsCard
        title="Bounce rate"
        icon={<ArrowDown className="text-red-600" />}
        helperText="Visits that leave without interacting"
        value="45%"
        loading={loading}
        className=""
      />
    </div>
  );
}

function StatsCard({
  title,
  value,
  icon,
  helperText,
  loading,
  className,
}: {
  title: string;
  value: string;
  helperText: string;
  className: string;
  loading: boolean;
  icon: JSX.Element;
}) {
  return (
    <div className={className}>
      <div className="flex flex-row items-center justify-between pb-2">
        <div className="text-sm font-medium text-muted-foreground">{title}</div>
        {icon}
      </div>
      <div>
        <div className="text-2xl font-bold">
          {loading && (
            <Skeleton>
              <div className="opacity-0">0</div>
            </Skeleton>
          )}
          {!loading && value}
        </div>
        <div className="text-xs text-muted-foreground pt-1">{helperText}</div>
      </div>
    </div>
  );
}

function FormCardSkeleton() {
  return <Skeleton className="border-2 border-primary-/20 h-[190px] w-full" />;
}

function FormCards({ forms }: { forms: Form[] }) {
  return (
    <>
      {forms.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </>
  );
}

function FormCard({ form }: { form: Form }) {
  return (
    <div className="w-full p-2 border border-gray-200">
      <div className="flex items-center justify-between">
        <div className="truncate font-bold">{form.name}</div>
        {form.published ? (
          <Badge>Published</Badge>
        ) : (
          <Badge variant={"destructive"}>Draft</Badge>
        )}
      </div>
      <div className="flex items-center justify-between text-muted-foreground text-sm">
        {formatDistance(new Date(form.createdAt), new Date(), {
          addSuffix: true,
        })}
        {form.published && (
          <div className="flex items-center">
            <ArrowDown className="text-muted-foreground" />
            <div>{form.visits.toLocaleString()}</div>
            <FormInput className="text-muted-foreground" />
            <div>{form.submissions.toLocaleString()}</div>
          </div>
        )}
      </div>
      <div className="truncate text-sm text-muted-foreground">
        {form.description || "No description"}
      </div>
      <div className="mt-2">
        {form.published ? (
          <Button asChild className="w-full text-md gap-4">
            View submissions
          </Button>
        ) : (
          <Button asChild variant={"secondary"} className="w-full text-md gap-4">
            Edit form
          </Button>
        )}
      </div>
    </div>
  );
}
function GetFormStats() {
  throw new Error("Function not implemented.");
}

