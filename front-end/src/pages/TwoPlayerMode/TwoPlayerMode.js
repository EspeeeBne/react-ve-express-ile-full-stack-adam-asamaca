    import React, { useState } from 'react';
    import {
    Box,
    TextField,
    Button,
    Typography,
    Grid,
    Paper,
    Alert,
    CircularProgress,
    Skeleton
    } from '@mui/material';
    import { useTranslation } from 'react-i18next';
    import { useTheme } from '@mui/material/styles';
    import axios from '../../utils/axios';
    import { GAMES_ENDPOINT } from '../../api-routes';
    import HangmanDrawing from '../../components/HangmanDrawing';
    import { motion } from 'framer-motion';

    function TwoPlayerMode() {
    const { t } = useTranslation();
    const theme = useTheme();

    const [sentence, setSentence] = useState('');
    const [gameData, setGameData] = useState(null);
    const [guessLetter, setGuessLetter] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [guessing, setGuessing] = useState(false);

    const getDisplayWord = (sentence, discoveredLetters) => {
        return sentence
        .split('')
        .map((char, index) => {
            if (char === ' ') return ' ';
            return discoveredLetters.includes(char.toLocaleLowerCase('tr-TR')) || discoveredLetters.includes(char.toLocaleUpperCase('tr-TR'))
            ? char
            : '_';
        })
        .join(' ');
    };

    const startGame = async () => {
        if (!sentence.trim()) {
        setMessage(t('pleaseEnterSentence'));
        return;
        }
        try {
        setLoading(true);
        setMessage('');
        const res = await axios.post(GAMES_ENDPOINT, {
            mode: '2P',
            sentence
        });
        setGameData(res.data.currentGame);
        setSentence('');
        } catch (err) {
        console.error(err);
        setMessage(err.response?.data?.message ? t(err.response.data.message) : t('serverError'));
        } finally {
        setLoading(false);
        }
    };

    const guess = async () => {
        if (!gameData || !guessLetter.trim()) {
        setMessage(t('pleaseEnterLetter'));
        return;
        }
        try {
        setGuessing(true);
        const res = await axios.put(`${GAMES_ENDPOINT}/guess`, {
            letter: guessLetter.toLocaleLowerCase('tr-TR')
        });
        setGameData(res.data.currentGame);
        setGuessLetter('');
        setMessage(res.data.message ? t(res.data.message) : '');
        } catch (err) {
        console.error(err);
        setMessage(err.response?.data?.message ? t(err.response.data.message) : t('serverError'));
        } finally {
        setGuessing(false);
        }
    };

    const resetGame = () => {
        setGameData(null);
        setMessage('');
        setGuessLetter('');
        setSentence('');
    };

    const wrongCount = gameData ? gameData.wrongLetters?.length : 0;
    const displayWord = gameData ? getDisplayWord(gameData.sentence, gameData.discoveredLetters) : '';

    const handleSubmit = (e) => {
        e.preventDefault();
        if (guessLetter.trim()) {
        guess();
        }
    };

    return (
        (<Box
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            sx={{ p: { xs: 2, md: 4 }, maxWidth: 800, mx: 'auto' }}
            >
            <Paper elevation={3} sx={{ p: { xs: 2, md: 4 } }}>
                <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
                {t('twoPlayerMode')}
                </Typography>

                {!gameData && (
                <Box sx={{ mt: 4 }}>
                    <TextField
                    label={t('enterSentence')}
                    variant="outlined"
                    fullWidth
                    value={sentence}
                    onChange={(e) => setSentence(e.target.value)}
                    sx={{ mb: 3 }}
                    />
                    <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={startGame}
                    disabled={loading}
                    startIcon={loading && <CircularProgress size={20} />}
                    >
                    {loading ? t('startingGame') : t('startGame')}
                    </Button>
                </Box>
                )}

                {loading && !gameData && (
                <Box sx={{ mt: 4 }}>
                    <Skeleton variant="rectangular" height={200} />
                </Box>
                )}

                {gameData && (
                <Box sx={{ mt: 4 }}>
                    <HangmanDrawing wrongCount={wrongCount} />

                    <Box sx={{ mt: 4, mb: 3 }}>
                    <Typography variant="h6">{t('guessTheWord')}:</Typography>
                    <Typography variant="h4" sx={{ letterSpacing: '4px', mt: 1 }}>
                        {displayWord.split('').map((char, index) => (
                        <Box
                            component="span"
                            key={index}
                            sx={{
                            mx: 0.5,
                            fontWeight: char !== '_' ? 'bold' : 'normal',
                            color: char !== '_' ? theme.palette.primary.main : 'inherit'
                            }}
                        >
                            {char}
                        </Box>
                        ))}
                    </Typography>
                    </Box>

                    <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1">
                        {t('remainingLives')}: {gameData.remainingLives}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1">
                        {t('wrongLetters')}: {gameData.wrongLetters?.join(', ')}
                        </Typography>
                    </Grid>
                    </Grid>

                    {gameData.isOver ? (
                    <>
                        <Alert severity={gameData.isWin ? 'success' : 'error'} sx={{ mt: 2 }}>
                        {gameData.isWin ? t('youWon') : t('youLost')}
                        </Alert>
                        <Typography variant="body1" sx={{ mt: 2 }}>
                        {t('theSentenceWas')}: "{gameData.sentence}"
                        </Typography>
                        <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={resetGame}
                        sx={{ mt: 2 }}
                        >
                        {t('startNewGame')}
                        </Button>
                    </>
                    ) : (
                    <Box sx={{ mt: 2 }}>
                        <form onSubmit={handleSubmit}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} sm={6}>
                            <TextField
                                label={t('guessALetter')}
                                variant="outlined"
                                value={guessLetter}
                                onChange={(e) => {
                                const value = e.target.value;
                                if (/^[a-zA-ZçğıöşüÇĞIÖŞÜ]?$/.test(value)) {
                                    setGuessLetter(value.toLocaleUpperCase('tr-TR'));
                                }
                                }}
                                sx={{ width: '100%' }}
                                inputProps={{ maxLength: 1 }}
                            />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                disabled={guessing}
                                startIcon={guessing && <CircularProgress size={20} />}
                            >
                                {guessing ? t('guessing') : t('guess')}
                            </Button>
                            </Grid>
                        </Grid>
                        </form>
                    </Box>
                    )}

                    {message && (
                    <Alert severity="info" sx={{ mt: 2 }}>
                        {message}
                    </Alert>
                    )}
                </Box>
                )}
            </Paper>
        </Box>)
    );
    }

    export default TwoPlayerMode;
