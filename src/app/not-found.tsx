import { Button } from "@/components/atoms/Button";
import { Divider } from "@/components/atoms/Divider";

export default function NotFound() {
  return (
    <section className="container-luxe flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="eyebrow text-gold-deep">Error 404</p>
      <h1 className="mt-5 font-serif text-[2.75rem] font-light leading-tight md:text-[4rem]">This page cannot be found.</h1>
      <Divider variant="ornament" className="my-8" />
      <p className="max-w-[440px] text-[0.9375rem] leading-relaxed text-stone">
        The piece or page you are looking for may have moved. Allow us to guide you back to the collections.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Button href="/collections" variant="primary">
          Explore the Collections
        </Button>
        <Button href="/" variant="outline">
          Return Home
        </Button>
      </div>
    </section>
  );
}
