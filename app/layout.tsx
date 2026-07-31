import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TARMAC | Enterprise Delivery Control Plane",
  description: "Technology Alignment, Readiness, Milestones, Assurance & Control"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
