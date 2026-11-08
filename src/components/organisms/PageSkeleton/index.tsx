import { cn } from "@/lib/utils";

const Block = ({ className }: { className?: string }) => <div aria-hidden="true" className={cn("skeleton", className)} />;

/**
 * Elegant loading shells shown during instant navigation while a dynamic
 * route resolves its URL data.
 */
export function PageSkeleton({ variant }: { variant: "product" | "listing" | "editorial" | "information" }) {
  return (
    <div role="status" aria-label="Loading" className="animate-fade-in">
      {variant === "product" && (
        <div className="container-luxe grid gap-10 pb-24 pt-10 lg:grid-cols-12 lg:gap-16">
          <Block className="aspect-[4/5] lg:col-span-7" />
          <div className="flex flex-col gap-5 lg:col-span-5 lg:pt-6">
            <Block className="h-3 w-32" />
            <Block className="h-10 w-4/5" />
            <Block className="h-4 w-1/2" />
            <Block className="mt-4 h-6 w-28" />
            <Block className="mt-6 h-24 w-full" />
            <Block className="mt-6 h-14 w-full" />
          </div>
        </div>
      )}
      {variant === "listing" && (
        <>
          <div className="bg-champagne/60">
            <div className="container-luxe grid gap-10 py-14 md:grid-cols-2">
              <div className="flex flex-col justify-end gap-5">
                <Block className="h-3 w-28" />
                <Block className="h-14 w-3/4" />
                <Block className="h-16 w-full max-w-md" />
              </div>
              <Block className="aspect-[4/3]" />
            </div>
          </div>
          <div className="container-luxe grid grid-cols-2 gap-x-5 gap-y-12 py-16 md:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <Block className="aspect-[4/5] w-full" />
                <Block className="mt-2 h-3 w-16" />
                <Block className="h-4 w-36" />
              </div>
            ))}
          </div>
        </>
      )}
      {variant === "editorial" && (
        <>
          <div className="h-[72svh] bg-noir md:h-[78vh]" />
          <div className="container-luxe flex max-w-[720px] flex-col gap-4 py-20">
            <Block className="h-6 w-full" />
            <Block className="h-6 w-5/6" />
            <Block className="h-6 w-2/3" />
          </div>
        </>
      )}
      {variant === "information" && (
        <div className="container-luxe flex max-w-[760px] flex-col items-center gap-5 py-20">
          <Block className="h-3 w-24" />
          <Block className="h-14 w-3/4" />
          <Block className="h-16 w-full" />
        </div>
      )}
      <span className="sr-only">Loading</span>
    </div>
  );
}
