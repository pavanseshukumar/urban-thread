import Image from "next/image";
import Reveal from "@/src/components/ui/Reveal";

export default function LookbookPage() {
  return (
    <main>
      {/* ── Section 1 · Cinematic Hero ── */}
      <section className="relative h-svh w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1920&q=80"
          alt="Lookbook hero – flowing silhouettes"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/5 via-black/20 to-black/60 dark:from-black/20 dark:via-black/40 dark:to-black/75" />

        <div className="relative flex h-full flex-col items-center justify-end px-6 pb-24 text-center sm:pb-32">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.4em] text-white/60">
              Spring / Summer
            </p>
          </Reveal>
          <Reveal delay={150}>
            <h1 className="mt-5 max-w-3xl text-[clamp(2rem,7vw,4.5rem)] font-light leading-[1.05] tracking-tight text-white">
              The Essence of
              <br />
              Minimal Form
            </h1>
          </Reveal>
        </div>
      </section>

      {/* ── Section 2 · Editorial Split (Image Left) ── */}
      <section className="mx-auto max-w-7xl px-6 py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="relative aspect-3/4 w-full overflow-hidden bg-faint">
              <Image
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=80"
                alt="Lookbook – editorial portrait"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div className="max-w-lg lg:py-12">
            <Reveal delay={100}>
              <p className="text-[11px] uppercase tracking-[0.3em] text-dimmed">
                The Edit
              </p>
            </Reveal>
            <Reveal delay={200}>
              <h2 className="mt-4 text-[28px] font-normal leading-[1.2] tracking-tight text-foreground sm:text-[36px]">
                Quiet Silhouettes,
                <br />
                Worn with Ease
              </h2>
            </Reveal>
            <Reveal delay={300}>
              <p className="mt-6 text-[14px] leading-[1.9] text-muted">
                This season celebrates restraint — clean lines, unhurried
                proportions, fabrics that move with you. Each piece is designed
                to feel as natural as bare skin; nothing demands attention,
                everything earns it.
              </p>
            </Reveal>
            <Reveal delay={400}>
              <a
                href="/products"
                className="mt-8 inline-block text-[12px] uppercase tracking-[0.2em] text-foreground underline underline-offset-4 decoration-subtle transition-colors duration-300 hover:decoration-foreground"
              >
                Shop the Look
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Section 3 · Full-width Image + Caption ── */}
      <section>
        <Reveal>
          <div className="relative aspect-21/9 w-full overflow-hidden bg-faint">
            <Image
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80"
              alt="Lookbook – wide landscape editorial"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={100}>
          <p className="mx-auto mt-8 max-w-xl px-6 text-center text-[13px] leading-relaxed text-muted">
            Linen and silk — materials that soften with every wear, textures
            that tell a story without saying a word.
          </p>
        </Reveal>
      </section>

      {/* ── Section 4 · Alternating Split (Text Left, Image Right) ── */}
      <section className="mx-auto max-w-7xl px-6 py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="order-2 max-w-lg lg:order-1 lg:py-12">
            <Reveal delay={100}>
              <p className="text-[11px] uppercase tracking-[0.3em] text-dimmed">
                Effortless Layers
              </p>
            </Reveal>
            <Reveal delay={200}>
              <h2 className="mt-4 text-[28px] font-normal leading-[1.2] tracking-tight text-foreground sm:text-[36px]">
                Between Light
                <br />
                and Shadow
              </h2>
            </Reveal>
            <Reveal delay={300}>
              <p className="mt-6 text-[14px] leading-[1.9] text-muted">
                Layering isn&apos;t just practical — it&apos;s a language. A
                softly structured blazer over a washed tee, an open shirt
                catching the wind. These combinations feel personal, considered,
                never costumey.
              </p>
            </Reveal>
            <Reveal delay={400}>
              <a
                href="/products"
                className="mt-8 inline-block text-[12px] uppercase tracking-[0.2em] text-foreground underline underline-offset-4 decoration-subtle transition-colors duration-300 hover:decoration-foreground"
              >
                Shop the Look
              </a>
            </Reveal>
          </div>

          <Reveal className="order-1 lg:order-2">
            <div className="relative aspect-3/4 w-full overflow-hidden bg-faint">
              <Image
                src="https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=1200&q=80"
                alt="Lookbook – layered styling"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="h-px bg-subtle/50" />
      </div>

      {/* ── Section 5 · Brand Statement ── */}
      <section className="px-6 py-36">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[clamp(1.25rem,3.5vw,2rem)] font-light leading-normal tracking-tight text-foreground">
              &ldquo;Clothes should disappear into the life you lead —
              invisible in their effort, unforgettable in their feeling.&rdquo;
            </p>
            <p className="mt-8 text-[11px] uppercase tracking-[0.3em] text-dimmed">
              Urban Thread &middot; SS26
            </p>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
