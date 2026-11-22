import type { Metadata } from "next";
import { Poppins, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { CartProvider } from "@/lib/cart-context";
// import RoleDemoBar from "@/components/RoleDemoBar";

const sans = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const fontTitle = Bricolage_Grotesque({
  variable: "--font-title",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "HUBMART | Multi-Category E-Commerce & China Import Hub",
  description: "Next-generation import retail platform with integrated CRM and dynamic catalog.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sans.variable} ${sans.className} ${fontTitle.variable} antialiased bg-white text-zinc-900 min-h-screen flex flex-col`}
      >
        <AuthProvider>
          <CartProvider>
      
            <main className="flex-1">{children}</main>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
