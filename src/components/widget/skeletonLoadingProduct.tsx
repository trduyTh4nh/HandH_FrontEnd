import { Skeleton } from "../ui/skeleton";

export default function SkeletonLoadingProduct() {
  return (
    <div className="product_main flex flex-col md:flex-row flex-1 gap-8 px-10 md:px-48 pb-10 w-full relative box-border">
      <div className="w-full md:w-1/2 flex">
        <Skeleton className="flex-1 w-full rounded-lg h-[550px] md:h-[670px]" />
      </div>
      <div className="flex flex-col gap-4 sticky top-[11.5rem] self-start w-full md:w-1/2">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-[3.2rem] w-full" />
          <Skeleton className="h-[1.875rem] w-44" />
        </div>
        <div className="flex flex-col gap-4">
          <Skeleton className="h-[1.875rem] w-7" />
          <div className="flex gap-4">
            <Skeleton className="h-10 w-20 rounded-full" />
            <Skeleton className="h-10 w-20 rounded-full" />
            <Skeleton className="h-10 w-20 rounded-full" />
            <Skeleton className="h-10 w-20 rounded-full" />
          </div>
          <Skeleton className="h-[1.875rem] w-7" />
          <div className="flex gap-4">
            <Skeleton className="h-12 w-20 rounded-full" />
            <Skeleton className="h-12 w-20 rounded-full" />
          </div>
          <div className="flex gap-4">
            <Skeleton className="h-9 w-40 rounded-full" />
            <Skeleton className="h-9 w-32 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
