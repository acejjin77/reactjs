'use client'

import * as React from 'react';
import Head from 'next/head';
import Layout from '@/components/layout';
import "@/components/globals.css";

const metadata = {
  title: 'SCL',
  description: 'SCL',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {

  return (
    <html lang="ko">
      <body>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
