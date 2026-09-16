import { Roboto_Mono } from "next/font/google";
import "./globals.css";

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "EnVault",
  description: "Securely store and manage your sensitive information with EnVault.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${robotoMono.variable} h-full antialiased`}>
      <body className="h-full">
        {children}
      </body>
    </html>
  );
}
