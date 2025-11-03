import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingCard = () => {
  return (
    <Card className="overflow-hidden border-border">
      <Skeleton className="w-full aspect-[4/3]" />
      <div className="p-6 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-10 w-28" />
        </div>
      </div>
    </Card>
  );
};

export default LoadingCard;
