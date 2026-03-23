"use client";

export default function Video() {
  return (
    <section id="video" className="bg-light py-24 text-center">
      <div className="max-w-6xl mx-auto px-6">
        <div className="fade-up">
          <p className="uppercase tracking-widest text-sm text-muted mb-4">
            See It In Action
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-12">
            Watch How I Work
          </h2>
        </div>

        <div className="fade-up max-w-4xl mx-auto rounded-2xl shadow-2xl overflow-hidden">
          <iframe
            src="https://drive.google.com/file/d/1GymRkroWIEfd1J28_3qExB6APHQsMqaY/preview"
            className="w-full aspect-video"
            allow="autoplay"
            title="Watch How I Work"
          />
        </div>
      </div>
    </section>
  );
}
