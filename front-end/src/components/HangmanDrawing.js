import React, { useState, useEffect } from 'react';
import { Box, useTheme, Skeleton } from '@mui/material';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

function HangmanDrawing({ wrongCount }) {
  const theme = useTheme();

  const stage = Math.min(wrongCount, 6);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  const drawParts = [
    <g key="scaffold">
      <motion.line
        x1="10"
        y1="350"
        x2="200"
        y2="350"
        stroke={theme.palette.primary.main}
        strokeWidth="4"
        initial={{ opacity: 0 }}
        animate={{ opacity: stage >= 0 ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />
      <motion.line
        x1="60"
        y1="350"
        x2="60"
        y2="50"
        stroke={theme.palette.primary.main}
        strokeWidth="4"
        initial={{ opacity: 0 }}
        animate={{ opacity: stage >= 0 ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />
      <motion.line
        x1="60"
        y1="50"
        x2="160"
        y2="50"
        stroke={theme.palette.primary.main}
        strokeWidth="4"
        initial={{ opacity: 0 }}
        animate={{ opacity: stage >= 0 ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />
      <motion.line
        x1="160"
        y1="50"
        x2="160"
        y2="100"
        stroke={theme.palette.primary.main}
        strokeWidth="4"
        initial={{ opacity: 0 }}
        animate={{ opacity: stage >= 0 ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />
    </g>,
    <motion.circle
      key="head"
      cx="160"
      cy="130"
      r="30"
      stroke={theme.palette.primary.main}
      strokeWidth="4"
      fill="none"
      initial={{ opacity: 0 }}
      animate={{ opacity: stage >= 1 ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    />,
    <motion.line
      key="body"
      x1="160"
      y1="160"
      x2="160"
      y2="250"
      stroke={theme.palette.primary.main}
      strokeWidth="4"
      initial={{ opacity: 0 }}
      animate={{ opacity: stage >= 2 ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    />,
    <motion.line
      key="leftArm"
      x1="160"
      y1="180"
      x2="120"
      y2="220"
      stroke={theme.palette.primary.main}
      strokeWidth="4"
      initial={{ opacity: 0 }}
      animate={{ opacity: stage >= 3 ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    />,
    <motion.line
      key="rightArm"
      x1="160"
      y1="180"
      x2="200"
      y2="220"
      stroke={theme.palette.primary.main}
      strokeWidth="4"
      initial={{ opacity: 0 }}
      animate={{ opacity: stage >= 4 ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    />,
    <motion.line
      key="leftLeg"
      x1="160"
      y1="250"
      x2="120"
      y2="300"
      stroke={theme.palette.primary.main}
      strokeWidth="4"
      initial={{ opacity: 0 }}
      animate={{ opacity: stage >= 5 ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    />,
    <motion.line
      key="rightLeg"
      x1="160"
      y1="250"
      x2="200"
      y2="300"
      stroke={theme.palette.primary.main}
      strokeWidth="4"
      initial={{ opacity: 0 }}
      animate={{ opacity: stage >= 6 ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    />,
  ];

  return (
    <Box
      sx={{
        width: '100%',
        height: '350px',
        display: 'flex',
        justifyContent: 'center',
        mb: 3,
      }}
    >
      <AnimatePresence>
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ width: '220px', height: '350px' }}
          >
            <Skeleton variant="rectangular" width="100%" height="100%" />
          </motion.div>
        ) : (
          <motion.svg
            width="220"
            height="350"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {drawParts}
          </motion.svg>
        )}
      </AnimatePresence>
    </Box>
  );
}

HangmanDrawing.propTypes = {
  wrongCount: PropTypes.number.isRequired,
};

export default HangmanDrawing;
