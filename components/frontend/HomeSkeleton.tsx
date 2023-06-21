import { Skeleton } from "../ui/skeleton";

function HomeSkeleton() {
  return (
    <>
      <div className="flex justify-center flex-col items-center">
        <Skeleton className="bg-gray-400 w-[20em] lg:w-[28em] mt-8 h-[22em] lg:h-[32em]" />
        <Skeleton className="bg-gray-400 w-[12em] h-[3em] mt-4" />
        <Skeleton className="bg-gray-400 w-[10em] h-[2em] mt-4" />
        <Skeleton className="bg-gray-400 w-[11em] h-[2em] mt-4" />
      </div>
    </>
  );
}

export default HomeSkeleton;
