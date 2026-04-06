import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MIST Ai",
  description: "从 AI 原生出发，定义下一代产品。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
