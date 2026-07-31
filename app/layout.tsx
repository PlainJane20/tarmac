import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IT-PMO Engine",
  description: "Enterprise delivery lifecycle command center"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
