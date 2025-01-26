import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Loading from './Loading';

export default function InitialLoading({ error }) {
  const { t } = useTranslation();
  const theme = useTheme();

  if (!error) {
    return <Loading size={50} disableShrink />;
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="50vh"
      textAlign="center"
      sx={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        transition: 'background-color 0.5s ease, color 0.5s ease',
      }}
    >
      <Box display="flex" alignItems="center" gap={1} mb={3}>
        <img
          src="/favicon.ico"
          alt="Logo"
          style={{
            width: 40,
            height: 40,
          }}
        />
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            color: theme.palette.text.primary,
          }}
        >
          {t('hangmanApp')} 
        </Typography>
      </Box>
      <Typography
        variant="body1"
        sx={{
          color: theme.palette.error.main,
          fontWeight: 'bold'
        }}
      >
        {t('error.siteOffline')}
      </Typography>
    </Box>
  );
}
