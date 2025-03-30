import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
  Modal,
  Select,
  MenuItem,
  useMediaQuery,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightlightIcon from '@mui/icons-material/Nightlight';
import TranslateIcon from '@mui/icons-material/Translate';
import { motion, AnimatePresence } from 'framer-motion';

function Navbar({ darkMode, toggleTheme }) {
  const theme = useTheme();
  const { t, i18n } = useTranslation();

  const [languageModalOpen, setLanguageModalOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setLanguageModalOpen(false);
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          boxShadow: 3,
          backgroundColor: theme.palette.background.default,
          transition: 'background-color 0.5s ease, color 0.5s ease',
        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingX: { xs: 1, sm: 2 },
          }}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  color: theme.palette.text.primary,
                }}
              >
                {t('appTitle')}
              </Typography>
            </Link>
          </Box>

          <Box display="flex" alignItems="center" gap={2}>
            <IconButton onClick={toggleTheme} sx={{ color: theme.palette.text.primary }}>
              <AnimatePresence mode="wait" initial={false}>
                {darkMode ? (
                  <motion.div
                    key="light"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <WbSunnyIcon />
                  </motion.div>
                ) : (
                  <motion.div
                    key="dark"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <NightlightIcon />
                  </motion.div>
                )}
              </AnimatePresence>
            </IconButton>

            {!isMobile ? (
              <Button
                onClick={() => setLanguageModalOpen(true)}
                startIcon={<TranslateIcon />}
                variant="outlined"
                sx={{
                  color: theme.palette.text.primary,
                  textTransform: 'none',
                  borderColor: theme.palette.text.primary,
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                    borderColor: theme.palette.text.primary,
                  },
                }}
              >
                {t('changeLanguage')}
              </Button>
            ) : (
              <IconButton onClick={() => setLanguageModalOpen(true)} sx={{ color: theme.palette.text.primary }}>
                <TranslateIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Modal
        open={languageModalOpen}
        onClose={() => setLanguageModalOpen(false)}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backdropFilter: 'blur(5px)',
        }}
      >
        <Box
          sx={{
            backgroundColor: theme.palette.background.paper,
            padding: 3,
            borderRadius: 1,
            boxShadow: 24,
            width: 300,
            textAlign: 'center',
            position: 'relative',
          }}
        >
          <IconButton onClick={() => setLanguageModalOpen(false)} sx={{ position: 'absolute', top: 10, right: 10 }}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
            {t('selectLanguage')}
          </Typography>
          <Select
            value={i18n.language}
            onChange={(e) => changeLanguage(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
          >
            <MenuItem value="tr">
              <Box display="flex" alignItems="center">
                <img src="https://flagcdn.com/w40/tr.png" alt="TR" style={{ marginRight: '10px' }} />
                Türkçe
              </Box>
            </MenuItem>
            <MenuItem value="en">
              <Box display="flex" alignItems="center">
                <img src="https://flagcdn.com/w40/us.png" alt="EN" style={{ marginRight: '10px' }} />
                English
              </Box>
            </MenuItem>
          </Select>
        </Box>
      </Modal>
    </>
  );
}

export default Navbar;
