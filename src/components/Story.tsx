export default function Story() {
  const tools = [
    "Claude (Anthropic)",
    "Next.js / React / Tailwind",
    "Supabase / Prisma / PostgreSQL",
    "Vercel / GitHub",
    "Claude Code / Scheduled Tasks",
    "Base44",
  ];

  return (
    <section id="story" className="bg-dark text-white py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column */}
          <div className="fade-up">
            <p className="text-primary uppercase tracking-widest text-sm mb-4">
              My Story
            </p>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-8">
              From Zero Code to
              <br />
              <span className="italic">Eight Products</span>
            </h2>
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p>
                Six months ago, I&apos;d never written a line of code. I spent
                6+ years at Intel managing manufacturing systems, served as an
                IDF tank commander, and earned a degree in Education.
              </p>
              <p>
                Then I started experimenting with AI tools — and discovered I
                could actually build things.
              </p>
              <p>
                So I kept building. A recipe app for my family. A medication
                tracker for my parents. A management tool for my reserve unit.
                Not all of them became real products — but every one of them
                taught me something and every one of them works.
              </p>
              <p>
                None of them are commercial products — two are used daily by my
                family, the rest are proofs of concept. But every single one
                works, and every one was built from zero to deployed by me and
                AI alone.
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6 fade-up">
            {/* Toolkit Card */}
            <div className="glass-card rounded-xl p-6">
              <h3 className="font-bold text-lg mb-4">Toolkit</h3>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className="bg-white/10 text-sm px-3 py-1.5 rounded-full"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Why Me Card */}
            <div className="glass-card border-l-4 border-primary rounded-xl p-6">
              <h3 className="font-bold text-lg text-primary mb-3">Why Me?</h3>
              <p className="text-gray-300">
                I don&apos;t have traditional dev experience. What I do have
                is the ability to go from idea to working app using AI — and
                the honesty to tell you which ones are real and which are
                experiments. I build for people I know, I learn by shipping,
                and I get better every week.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
