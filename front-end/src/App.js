import React, { useState, Suspense, lazy } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import darkTheme from './themes/darkTheme';
import lightTheme from './themes/lightTheme';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loading from './components/Loading';
import InitialLoading from './components/InitialLoading';

import { useSiteStatus } from './contexts/SiteStatusContext';

import './i18n';

const Home = lazy(() => import('./pages/Home'));
const TwoPlayerMode = lazy(() => import('./pages/TwoPlayerMode'));
const AIMode = lazy(() => import('./pages/AIMode'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const toggleTheme = () => setDarkMode((prev) => !prev);

  const { loading, status } = useSiteStatus();

  if (loading) {
    return (
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <InitialLoading error={false} />
      </ThemeProvider>
    );
  }

  if (!status) {
    return (
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <InitialLoading error={true} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Navbar
        toggleTheme={toggleTheme}
        darkMode={darkMode}
        />
        <Suspense fallback={<Loading size={60} disableShrink />}>
          <Routes>
              <Route
                path="/"
                element={<Home />}
              />
              <Route
                path="/2p"
                element={<TwoPlayerMode />}
              />
              <Route
                path="/ai"
                element={<AIMode />}
              />
              <Route
                path="*"
                element={<NotFound />}
              />
          </Routes>
        </Suspense>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
