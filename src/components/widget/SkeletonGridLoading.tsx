import { Skeleton } from "../ui/skeleton";

export default function SkeletonLoadingProductGrid() {
  return (
    <div className="pt-4 w-full px-4 grid grid-cols-3 md:grid-cols-3 gap-6">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="flex flex-col gap-3">
          <Skeleton className="w-full h-80 rounded-lg" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-5 w-1/2" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-10 rounded-full" />
            <Skeleton className="h-8 w-10 rounded-full" />
            <Skeleton className="h-8 w-10 rounded-full" />
          </div>
          <Skeleton className="w-full h-80 rounded-lg" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-5 w-1/2" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-10 rounded-full" />
            <Skeleton className="h-8 w-10 rounded-full" />
            <Skeleton className="h-8 w-10 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
