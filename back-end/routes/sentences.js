const express = require('express');
const router = express.Router();
const Sentence = require('../models/Sentence');

/**
 * GET /sentences/random?difficulty=easy
 * Rastgele bir cümle döndürür.
 * Query param (difficulty) 'easy', 'medium', 'hard' gelebilir.
 */
router.get('/random', async (req, res) => {
  try {
    const { difficulty } = req.query;
    const filter = {};

    if (difficulty && ['easy', 'medium', 'hard'].includes(difficulty)) {
      filter.difficulty = difficulty;
    }
    const count = await Sentence.countDocuments(filter);
    if (count === 0) {
      return res.status(404).json({ message: "Bu zor/kolaylıkta cümle bulunamadı." });
    }

    const randomIndex = Math.floor(Math.random() * count);
    const sentence = await Sentence.findOne(filter).skip(randomIndex);

    return res.json({ sentence });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Sunucu hatası" });
  }
});

/**
 * POST /sentences
 * Body: { text: "Yeni cümle", difficulty: "easy" }
 * Zaten varsa 400 döndürür, yoksa ekler
 */
router.post('/', async (req, res) => {
  try {
    const { text, difficulty } = req.body;
    if (!text) {
      return res.status(400).json({ message: "Cümle (text) gereklidir." });
    }
    const newSentence = new Sentence({ text, difficulty });

    await newSentence.save();
    return res.status(201).json({ message: "Cümle eklendi.", sentence: newSentence });

  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Bu cümle zaten var." });
    }
    console.error(err);
    return res.status(500).json({ error: "Sunucu hatası" });
  }
});

module.exports = router;
