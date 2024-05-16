'use client'

import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import PageContent from './page';
import theme from '@/theme';
import SideBar from './sidebar'

export default function Layout() {
  
  const [sideOpen, setSideOpen] = React.useState(false);

  return (
    <html lang="ko">
      <head>
        <title>SCL</title>
      </head>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <SideBar open={sideOpen} />
            <main>
              <PageContent />
            </main>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
