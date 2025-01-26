import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Skeleton } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

function Home() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <Box sx={{ p: 2, textAlign: 'center' }}>
      {loading ? (
        <>
          <Skeleton variant="text" height={40} width="60%" sx={{ margin: '0 auto', mb: 3 }} />
          <Skeleton variant="rectangular" height={50} width={200} sx={{ margin: '0.5rem auto' }} />
          <Skeleton variant="rectangular" height={50} width={200} sx={{ margin: '0.5rem auto' }} />
          <Skeleton variant="text" height={20} width="80%" sx={{ margin: '1rem auto' }} />
        </>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
            {t('welcomeTitle')}
          </Typography>
          <Box sx={{ mb: 2 }}>
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              transition={{ type: 'spring', stiffness: 300 }}
              style={{ display: 'inline-block', marginRight: '16px' }}
            >
              <Button
                variant="contained"
                component={Link}
                to="/2p"
                sx={{ mr: 2 }}
              >
                {t('twoPlayerMode')}
              </Button>
            </motion.div>
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              transition={{ type: 'spring', stiffness: 300 }}
              style={{ display: 'inline-block' }}
            >
              <Button
                variant="contained"
                component={Link}
                to="/ai"
              >
                {t('aiMode')}
              </Button>
            </motion.div>
          </Box>
          <Typography variant="body1">
            {t('welcomeText')}
          </Typography>
        </motion.div>
      )}
    </Box>
  );
}

export default Home;
