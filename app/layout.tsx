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
import { ConvexClientProvider } from "./ConvexClientProvider";

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
      <ConvexClientProvider>
        <html lang="en">
          <body className="antialiased font-lato text-black dark:text-white">
            {/* Background */}
            <div className="fixed inset-0 w-full h-full bg-white dark:bg-black pointer-events-none">
              <Image
                className="absolute inset-0 w-full h-full object-cover z-0"
                src="/rotating.svg"
                alt="Next.js logo"
                fill
                priority
              />
              <div className="min-h-screen w-full backdrop-blur-3xl bg-black/10 absolute inset-0 z-0">
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
            <SignedIn>
              <header className="w-full flex justify-between items-center z-0 py-3 px-8 sticky top-0 inset-x-0">
                <h1 className="text-2xl px-4 py-2 rounded-full backdrop-blur-sm bg-white/40 dark:bg-black/20">
                  Web Launch
                </h1>
                <div className="p-2 pt-1 bg-white/40 dark:bg-black/20 backdrop-blur-sm text-xl rounded-full">
                  <UserButton showName />
                </div>
              </header>
            </SignedIn>
            {/* Content */}
            <SignedOut>
              <div className="min-h-screen grid place-items-center w-full relative z-0">
                <SignIn
                  routing="hash"
                  appearance={{
                    elements: {
                      formButtonPrimary:
                        "bg-purple-400 hover:bg-purple-500 text-white !ring-0",
                    },
                  }}
                />
              </div>
            </SignedOut>
            {/* Children */}
            <SignedIn>
              <div className="min-h-[calc(100vh-5rem)] relative z-0">
                {children}
              </div>
            </SignedIn>
          </body>
        </html>
      </ConvexClientProvider>
    </ClerkProvider>
  );
}
