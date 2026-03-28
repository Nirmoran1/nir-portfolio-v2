import { Heebo } from "next/font/google";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
});

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      dir="rtl"
      lang="he"
      className={heebo.variable}
      style={{ fontFamily: "var(--font-heebo), sans-serif" }}
    >
      {children}
    </div>
  );
}
