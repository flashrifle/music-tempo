import type { Metadata } from 'next';
import styles from '@/app/page.module.css';

export const metadata: Metadata = {
  title: '음원 인식 메트로놈',
  description: '음원 인식 메트로놈',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={styles.container}>{children}</body>
    </html>
  );
}
