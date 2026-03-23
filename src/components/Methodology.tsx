"use client";

const steps = [
  {
    number: "01",
    title: "Discover",
    decide: "Define the problem, users, and constraints",
    execute: "Generates project files and orients in 60 seconds",
  },
  {
    number: "02",
    title: "Architect",
    decide: "Choose the stack, features, priorities",
    execute: "Researches options and maps competitive landscape",
  },
  {
    number: "03",
    title: "Build",
    decide: "Review and approve changes",
    execute: "Writes code, runs tests, deploys to production",
  },
  {
    number: "04",
    title: "Ship",
    decide: "Deploy, gather feedback, iterate",
    execute: "Fixes bugs, optimizes, keeps it running",
  },
];

export default function Methodology() {
  return (
    <section id="method" className="bg-dark text-white py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 fade-up">
          <p className="text-primary uppercase tracking-widest text-sm mb-4">
            My Method
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4">
            How I Build with AI
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Every project follows this chain. I make the decisions — AI handles
            the execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="fade-up glass-card border-t-2 border-primary rounded-xl p-8 relative overflow-hidden hover:-translate-y-1 transition-transform duration-300"
            >
              <span className="text-6xl font-bold opacity-10 absolute top-4 right-4">
                {step.number}
              </span>

              <p className="text-primary text-sm font-semibold mb-1">
                Step {step.number}
              </p>
              <h3 className="font-playfair text-2xl font-bold mb-6">
                {step.title}
              </h3>

              <div className="mb-4">
                <p className="text-sm uppercase tracking-wider text-muted mb-1">
                  I Decide
                </p>
                <p className="text-light">{step.decide}</p>
              </div>

              <div>
                <p className="text-sm uppercase tracking-wider text-muted mb-1">
                  AI Executes
                </p>
                <p className="text-light">{step.execute}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
