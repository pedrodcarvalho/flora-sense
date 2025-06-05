const express = require('express');
const { analyzePlantImage } = require('../controllers/plantInfoController');
const multer = require('multer');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

router.post('/analyze-plant-image', upload.single('plantImage'), analyzePlantImage);

module.exports = router;
