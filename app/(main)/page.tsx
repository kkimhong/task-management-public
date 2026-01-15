import { DataTableDemo } from "@/app/(main)/data-table";
import { SectionCards } from "@/components/section-card";

export default async function Page() {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-2 md:gap-6 md:py-6">
          <SectionCards />
          <div className="px-6">
            <DataTableDemo />
          </div>
        </div>
      </div>
    </div>
  );
}
