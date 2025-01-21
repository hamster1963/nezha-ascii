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
      <head>
        <link
          rel="stylesheet"
          href="https://fastly.jsdelivr.net/gh/lipis/flag-icons@7.0.0/css/flag-icons.min.css"
        />
        <link
          rel="stylesheet"
          href="https://fastly.jsdelivr.net/npm/font-logos@1/assets/font-logos.css"
        />
      </head>
      <body>
        <WebSocketProvider>{children}</WebSocketProvider>
      </body>
    </html>
  );
}
