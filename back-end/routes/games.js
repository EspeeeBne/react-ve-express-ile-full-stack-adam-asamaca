const express = require('express');
const router = express.Router();
const Sentence = require('../models/Sentence');

let currentGame = null;

const ALPHABET = "abcçdefgğhıijklmnoöprsştuüvyz";

// --------------------------------------------------
// [POST] /api/games
// Body: { mode: "2P" | "AI", difficulty?: "easy|medium|hard", sentence?: "..." }
// Cevap: { message, currentGame }
// --------------------------------------------------
router.post('/', async (req, res) => {
  try {
    const { mode, difficulty = 'medium', sentence } = req.body;

    if (!mode || !['2P', 'AI'].includes(mode)) {
      return res.status(400).json({ message: "invalidMode" });
    }

    let finalSentence = '';
    let finalDifficulty = difficulty;

    currentGame = {
      mode,
      difficulty: finalDifficulty,
      sentence: '',
      discoveredLetters: [],
      wrongLetters: [],
      remainingLives: 6,
      isOver: false,
      isWin: false
    };

    if (mode === '2P') {
      if (!sentence) {
        return res.status(400).json({ message: "sentenceRequired" });
      }
      finalSentence = sentence.trim();
      await addSentenceIfNotExists(finalSentence, 'medium');

    } else {
      const count = await Sentence.countDocuments({ difficulty: finalDifficulty });
      if (count === 0) {
        return res.status(404).json({
          message: "noSentencesForDifficulty"
        });
      }
      const randomIndex = Math.floor(Math.random() * count);
      const randomSentence = await Sentence.findOne({ difficulty: finalDifficulty }).skip(randomIndex);
      finalSentence = randomSentence.text;
    }

    currentGame.sentence = finalSentence;

    return res.status(201).json({
      message: "gameStarted",
      currentGame
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "internalServerError" });
  }
});

// --------------------------------------------------
// [GET] /api/games
// Şu anki oyunun durumunu döndürür
// Cevap: { currentGame } veya { message: "noActiveGame" }
// --------------------------------------------------
router.get('/', (req, res) => {
  if (!currentGame) {
    return res.status(404).json({ message: "noActiveGame" });
  }
  return res.json({ currentGame });
});

// --------------------------------------------------
// [PUT] /api/games/guess
// Body: { letter: "a" }
// Kullanıcının bir harf tahmini
// Cevap: { message, currentGame }
// --------------------------------------------------
router.put('/guess', (req, res) => {
  if (!currentGame) {
    return res.status(400).json({ message: "noActiveGame" });
  }
  if (currentGame.isOver) {
    return res.status(400).json({ message: "gameAlreadyOver" });
  }

  const { letter } = req.body;
  if (!letter || letter.length !== 1) {
    return res.status(400).json({ message: "invalidLetter" });
  }
  const lowerLetter = letter.toLocaleLowerCase('tr-TR');

  if (currentGame.discoveredLetters.includes(lowerLetter) ||
      currentGame.wrongLetters.includes(lowerLetter)) {
    return res.status(400).json({ message: "letterAlreadyGuessed" });
  }

  if (currentGame.sentence.toLocaleLowerCase('tr-TR').includes(lowerLetter)) {
    currentGame.discoveredLetters.push(lowerLetter);
  } else {
    currentGame.wrongLetters.push(lowerLetter);
    currentGame.remainingLives--;
  }

  checkGameOver();

  return res.json({
    message: "guessProcessed",
    currentGame
  });
});

// --------------------------------------------------
// [PUT] /api/games/ai-guess
// => Sadece mode=AI ise "bilgisayar harf tahmini"
// Cevap: { message, currentGame, aiLetter }
// --------------------------------------------------
router.put('/ai-guess', (req, res) => {
  if (!currentGame) {
    return res.status(400).json({ message: "noActiveGame" });
  }
  if (currentGame.mode !== 'AI') {
    return res.status(400).json({ message: "notAIMode" });
  }
  if (currentGame.isOver) {
    return res.status(400).json({ message: "gameAlreadyOver" });
  }

  const guessLetter = simpleAIGuess(
    currentGame.discoveredLetters,
    currentGame.wrongLetters,
    currentGame.difficulty
  );
  if (!guessLetter) {
    return res.status(400).json({ message: "aiNoMoreLetters" });
  }

  if (currentGame.sentence.toLocaleLowerCase('tr-TR').includes(guessLetter)) {
    currentGame.discoveredLetters.push(guessLetter);
  } else {
    currentGame.wrongLetters.push(guessLetter);
    currentGame.remainingLives--;
  }

  checkGameOver();

  return res.json({
    message: "aiGuessed",
    currentGame,
    aiLetter: guessLetter.toLocaleUpperCase('tr-TR')
  });
});

// --------------------------------------------------
// yapay zeka ayarları için get put falan yok burada
// --------------------------------------------------

function checkGameOver() {
  if (!currentGame) return;
  const lettersInSentence = extractUniqueLetters(currentGame.sentence);
  const allDiscovered = lettersInSentence.every(ch => currentGame.discoveredLetters.includes(ch));

  if (allDiscovered) {
    currentGame.isOver = true;
    currentGame.isWin = true;
  } else if (currentGame.remainingLives <= 0) {
    currentGame.isOver = true;
    currentGame.isWin = false;
  }
}

function extractUniqueLetters(sentence) {
  return sentence
    .toLocaleLowerCase('tr-TR')
    .split('')
    .filter(ch => ALPHABET.includes(ch))
    .filter((v,i,a) => a.indexOf(v) === i);
}

function simpleAIGuess(discovered, wrong, difficulty) {
  const used = discovered.concat(wrong);
  const remaining = ALPHABET.split('').filter(h => !used.includes(h));
  if (remaining.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * remaining.length);
  return remaining[randomIndex];
}

async function addSentenceIfNotExists(text, diff = 'medium') {
  try {
    const found = await Sentence.findOne({ text });
    if (!found) {
      await Sentence.create({ text, difficulty: diff });
    }
  } catch (err) {
    console.error('addSentenceIfNotExists hatası:', err);
  }
}

module.exports = router;
