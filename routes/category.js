import express from 'express';

import {
  getCategory,
  createCategory,
  getCategoryBySlug,
} from '../controllers/categoryControllers.js';

const category = express.Router();

category.get('/', getCategory);

category.post('/', createCategory);

category.get('/:slug', getCategoryBySlug);

export default category;
