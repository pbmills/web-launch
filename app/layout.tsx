import localFont from "next/font/local";
import type { Metadata } from "next";
import Image from "next/image";
import "./globals.css";
import {
  ClerkProvider,
  SignIn,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Web Launch",
  description: "Next JS app demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <div className="relative overflow-hidden">
            {/* Background */}
            <div className="fixed inset-0 w-full h-full bg-white dark:bg-black pointer-events-none">
              <Image
                className="absolute inset-0 w-full h-full object-cover z-0"
                src="/rotating.svg"
                alt="Next.js logo"
                fill
                priority
              />
              <div className="min-h-screen w-full backdrop-blur-3xl dark:bg-black/80 absolute inset-0 z-0">
                <Image
                  className="w-full h-full absolute inset-0 object-cover object-center -translate-y-1/4 translate-x-[10%] scale-[2] max-md:hidden transition-transform"
                  src="/decoration.svg"
                  alt="Next.js logo"
                  fill
                  priority
                />
              </div>
            </div>
            {/* Header */}
            <header className="w-full flex justify-between items-center relative z-0 py-3 px-8">
              <h1 className="text-4xl font-semibold px-4 py-2 rounded-full backdrop-blur-sm bg-white/20">
                Web Launch 
              </h1>
              <div className="p-2 pt-1 bg-white/20 backdrop-blur-sm text-xl rounded-full">
                <UserButton showName />
              </div>
            </header>
            {/* Content */}
            <SignedOut>
              <div className="min-h-screen grid place-items-center w-full relative z-0">
                <SignIn routing="hash" />
              </div>
            </SignedOut>
            <SignedIn>
              <div className="min-h-[calc(100vh-5rem)] relative z-0">
                {children}
              </div>
            </SignedIn>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
