'use client'

import * as React from 'react';
import Head from 'next/head';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import "@/components/globals.css";

const drawerWidth = 240;

// 메인 컨텐츠
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));


// 상단 메뉴 바
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

// 좌측 사이드 바
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const metadata = {
  title: 'SCL',
  description: 'SCL',
};

export default function Layout({
  children,
}: {
  children: React.ReactNode,
}) {

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState<boolean>(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleDrawerChange = () => {
    setOpen(!open);
  };

  return (mounted &&
    <html lang="ko">
        <Head>
          <title>
            SCL
          </title>
          <meta name="description" content={metadata.description} />
        </Head>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: 'flex' }}>
              {/* 상단 메뉴 바 컴포넌트 시작 */}
              <AppBar position="fixed" open={open} sx={{ bgcolor: "white" }}>
                <Toolbar>
                  <IconButton
                    color="default"
                    aria-label="open drawer"
                    onClick={handleDrawerChange}
                    edge="start"
                    sx={{ mr: 2 }}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" noWrap component="div" sx={{ color: "black" }}>
                    {metadata.title}
                  </Typography>
                </Toolbar>
              </AppBar>
              {/* 상단 메뉴 바 컴포넌트 종료 */}
              
              {/* 좌측 사이드 바 컴포넌트 시작 */}
              <Drawer
                sx={{
                  width: drawerWidth,
                  flexShrink: 0,
                  '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                  },
                }}
                variant="persistent"
                anchor="left"
                open={open}
              >
                <Divider />
                <List>

                </List>
                <Divider />
                <List>

                </List>
              </Drawer>
              {/* 좌측 사이드 바 컴포넌트 종료 */}

              {/* 메인 컨텐츠 시작 */}
              <Main open={open}>
                <DrawerHeader />
                {children}
              </Main>
              {/* 메인 컨텐츠 종료 */}
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
