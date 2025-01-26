import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Modal,
  Select,
  MenuItem,
  useMediaQuery,
  Tooltip,
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
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const ThemeIcon = darkMode ? WbSunnyIcon : NightlightIcon;

  const appBarVariants = {
    light: { backgroundColor: theme.palette.background.paper, transition: { duration: 0.5 } },
    dark: { backgroundColor: theme.palette.background.paper, transition: { duration: 0.5 } },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={appBarVariants}
        >
          <AppBar
            position="static"
            elevation={0}
            sx={{
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
              transition: 'background-color 0.5s ease',
            }}
          >
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography
                variant="h6"
                component={Link}
                to="/"
                sx={{
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  color: 'inherit',
                  '&:hover': { opacity: 0.8 },
                }}
              >
                {t('appTitle')}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Tooltip title={darkMode ? t('lightMode') : t('darkMode')}>
                  <IconButton onClick={toggleTheme} color="inherit" sx={{ mr: 1 }}>
                    <ThemeIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title={t('changeLanguage')}>
                  <IconButton onClick={() => setLanguageModalOpen(true)} color="inherit">
                    <TranslateIcon />
                    {!isMobile && (
                      <Typography variant="body1" sx={{ ml: 1 }}>
                        {t('changeLanguage')}
                      </Typography>
                    )}
                  </IconButton>
                </Tooltip>
              </Box>
            </Toolbar>
          </AppBar>
        </motion.div>
      </AnimatePresence>

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
        <AnimatePresence>
          {languageModalOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={modalVariants}
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
                  transition: 'background-color 0.5s ease, border-radius 0.3s ease',
                }}
              >
                <IconButton
                  onClick={() => setLanguageModalOpen(false)}
                  sx={{ position: 'absolute', top: 10, right: 10 }}
                >
                  <CloseIcon />
                </IconButton>

                <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
                  {t('selectLanguage')}
                </Typography>

                <Select
                  value={i18n.language}
                  onChange={(e) => changeLanguage(e.target.value)}
                  fullWidth
                  sx={{
                    marginBottom: 2,
                    borderRadius: 1,
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.divider,
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.primary.main,
                    },
                    '& .MuiSvgIcon-root': {
                      color: theme.palette.text.primary,
                    },
                  }}
                >
                  <MenuItem value="tr">
                    <Box display="flex" alignItems="center">
                      <img
                        src="https://flagcdn.com/w40/tr.png"
                        alt="TR"
                        style={{ marginRight: '10px' }}
                      />
                      {t('turkish')}
                    </Box>
                  </MenuItem>
                  <MenuItem value="en">
                    <Box display="flex" alignItems="center">
                      <img
                        src="https://flagcdn.com/w40/us.png"
                        alt="EN"
                        style={{ marginRight: '10px' }}
                      />
                      {t('english')}
                    </Box>
                  </MenuItem>
                </Select>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Modal>
    </>
  );
}

export default Navbar;
