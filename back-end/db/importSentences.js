const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Sentence = require('../models/Sentence');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/adamAsiyoruz';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB bağlantısı başarılı'))
  .catch(err => {
    console.error('MongoDB bağlantı hatası:', err);
    process.exit(1);
  });

const importData = async () => {
  try {
    const dataPath = path.join(__dirname, 'sentences.json');
    const sentences = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    await Sentence.insertMany(sentences, { ordered: false });
    console.log('Yeni veriler başarıyla eklendi.');

    mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    if (err.code === 11000) {
      console.warn('Başarıyla eklendi.');
    } else {
      console.error('Veri ekleme hatası:', err);
    }
    mongoose.connection.close();
    process.exit(1);
  }
};

importData();
