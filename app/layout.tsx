import type { Metadata } from "next";
import "./globals.css";
import { WebSocketProvider } from "@/lib/websocketProvider";

export const metadata: Metadata = {
  title: "nezha-ascii",
  description: "nezha-ascii",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <WebSocketProvider>{children}</WebSocketProvider>
      </body>
    </html>
  );
}
