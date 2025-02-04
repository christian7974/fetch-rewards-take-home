import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Find Your Dream Dog",
    description: "Let us help find your forever friend using this tool",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <link rel="icon" href="/icon.png"></link>
            <body
                className={`antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
