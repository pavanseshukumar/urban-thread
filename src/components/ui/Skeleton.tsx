type SkeletonProps = {
  className?: string;
};

export default function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded bg-faint ${className}`}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div>
      <Skeleton className="aspect-3/4 w-full" />
      <Skeleton className="mt-5 h-3 w-3/4" />
      <Skeleton className="mt-3 h-3 w-1/4" />
    </div>
  );
}

export function ProductGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid gap-16 lg:grid-cols-2">
        <Skeleton className="aspect-3/4 w-full" />
        <div className="flex flex-col justify-center gap-5">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-5 w-1/4" />
          <Skeleton className="mt-4 h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
          <div className="mt-8 flex gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-11 w-14 rounded-md" />
            ))}
          </div>
          <div className="mt-4 flex gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-11 w-20 rounded-md" />
            ))}
          </div>
          <Skeleton className="mt-8 h-12 w-full rounded-md" />
        </div>
      </div>
    </div>
  );
}

export function CartItemSkeleton() {
  return (
    <div className="flex gap-5 py-6">
      <Skeleton className="h-28 w-20 shrink-0" />
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <Skeleton className="h-3 w-32" />
          <Skeleton className="mt-3 h-3 w-20" />
        </div>
        <Skeleton className="h-7 w-24" />
      </div>
    </div>
  );
}
