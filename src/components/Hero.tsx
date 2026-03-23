"use client";

const stats = [
  { value: "8", label: "Projects Built", target: "8", suffix: "" },
  { value: "6+", label: "Months Learning & Building", target: "6", suffix: "+" },
  { value: "2", label: "Used Daily by Family", target: "2", suffix: "" },
  { value: "0", label: "Coding Background", target: "0", suffix: "" },
];

export default function Hero() {
  return (
    <section id="hero" className="bg-light py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Label */}
        <div className="fade-up">
          <span className="uppercase tracking-widest text-sm text-muted font-dm">
            Hi, I&apos;m Nir Moran and this is my AI portfolio
          </span>
        </div>

        {/* Headline */}
        <div className="fade-up mt-8">
          <h1 className="font-playfair text-5xl md:text-7xl font-bold text-dark leading-tight">
            I don&apos;t write code.
            <br />
            <em className="text-primary italic">I build with AI.</em>
          </h1>
        </div>

        {/* Subtitle */}
        <div className="fade-up mt-8">
          <p className="font-dm text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
            8 projects built in 6 months. No coding background. I&apos;m
            the architect — AI is my development team.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="fade-up mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#projects"
            className="bg-primary text-white rounded-full px-8 py-3 font-dm text-sm font-medium hover:opacity-90 transition-opacity duration-200"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="border-2 border-primary text-primary rounded-full px-8 py-3 font-dm text-sm font-medium hover:bg-primary hover:text-white transition-colors duration-200"
          >
            Get in Touch
          </a>
        </div>

        {/* Stats Bar */}
        <div className="fade-up mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-dark/10 pt-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <span
                className="counter font-playfair text-4xl md:text-5xl font-bold text-dark"
                data-target={stat.target}
                data-suffix={stat.suffix}
              >
                {stat.value}
              </span>
              <p className="font-dm text-sm text-muted mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
