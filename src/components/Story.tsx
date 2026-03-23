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
                6+ years at Intel managing complex manufacturing systems, led
                training programs in the IDF as a tank commander, and earned a
                degree in Education.
              </p>
              <p>
                Then I discovered AI-powered development — and everything
                changed.
              </p>
              <p>
                I started building. Not tutorials — real products for real
                people. A bilingual recipe app for my family. A medication
                tracker for my parents. A platoon management system for my
                reserve unit.
              </p>
              <p>
                Not all of them are commercial products — some are used by my
                family, some are proofs of concept. But every one of them works,
                and every one was built from zero to deployed by me and AI alone.
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
                I don&apos;t have traditional dev experience — but I build
                functional apps faster than most dev teams. I understand users
                because I build for people I know. I understand AI because
                it&apos;s my entire workflow. And I&apos;m honest about
                what&apos;s a real product and what&apos;s a proof of concept.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
