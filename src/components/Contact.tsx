export default function Contact() {
  return (
    <section id="contact" className="bg-light py-24">
      <div className="max-w-6xl mx-auto px-6 text-center fade-up">
        <p className="uppercase tracking-widest text-sm text-muted mb-4">
          Get in Touch
        </p>
        <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
          Want to Talk?
        </h2>
        <p className="text-muted text-lg max-w-2xl mx-auto">
          I&apos;m looking for my next challenge — whether that&apos;s a role
          on your team or a project worth building. Let&apos;s connect.
        </p>
        <div className="flex gap-4 justify-center mt-8">
          <a
            href="mailto:nirmoran1@gmail.com"
            className="bg-primary text-white rounded-full px-8 py-3 hover:bg-primary/90 transition"
          >
            nirmoran1@gmail.com
          </a>
          <a
            href="https://linkedin.com/in/nir-moran"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-primary text-primary rounded-full px-8 py-3 hover:bg-primary hover:text-white transition"
          >
            LinkedIn →
          </a>
        </div>
        <p className="text-muted text-lg mt-6">
          <a href="tel:+972543163837" className="hover:text-primary transition">
            054-316-3837
          </a>
        </p>
      </div>
    </section>
  );
}
