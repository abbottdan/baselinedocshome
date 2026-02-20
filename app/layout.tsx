import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: 'BaselineDocs - Document Control for Modern Teams',
    template: '%s | BaselineDocs',
  },
  description: 'Streamline your document control process with BaselineDocs. Version control, approval workflows, and compliance tracking made simple.',
  metadataBase: new URL('https://www.baselinedocs.com'),
  openGraph: {
    type: 'website',
    siteName: 'BaselineDocs',
    title: 'BaselineDocs - Document Control for Modern Teams',
    description: 'Version control, approval workflows, and compliance tracking for quality management systems.',
    url: 'https://www.baselinedocs.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BaselineDocs - Document Control for Modern Teams',
    description: 'Version control, approval workflows, and compliance tracking for quality management systems.',
  },
  verification: {
    google: '0aVetCsBxt_WOeXc11C2Kml-8MTYzpkWKvWdOoClBsw',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
