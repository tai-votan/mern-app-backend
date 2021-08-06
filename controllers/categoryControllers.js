import CategoryModel from '../models/categoryModel.js';
import { toSlug, stripHTML } from '../utils/utils.js';

export const getCategory = async (req, res) => {
  try {
    const categories = await CategoryModel.find().sort({ updatedAt: 'desc' });
    res.status(200).json({
      data: {
        categories,
      },
      status: 200,
      message: 'Success',
    });
  } catch (err) {
    console.log(`Func getPost Line: 15, PARAMS: { err }`, { err });
    res.status(500).json({
      message: err,
    });
  }
};

export const createCategory = async (req, res) => {
  const { body } = req;
  try {
    const docs = {
      title: body.title,
      slug: toSlug(body.slug || body.title),
      oldSlug: toSlug(body.oldSlug || body.slug || body.title),
      featuredImage: body.featuredImage,
      content: body.content,
      tags: body.tags,
      metaTitle: stripHTML(body.metaTitle || body.title),
      metaDescription: stripHTML(body.metaDescription || body.content),
    };

    const category = new CategoryModel(docs);
    await category.save();
    res.status(200).json({
      data: docs,
      status: 200,
      message: 'Success',
    });
  } catch (err) {
    console.log(`Func createCategory Line: 44, PARAMS: { err }`, { err });
    res.status(500).json({
      message: err,
    });
  }
};

export const getCategoryBySlug = async ({ params }, res) => {
  try {
    const category = await CategoryModel.find({ slug: params.slug });
    res.status(200).json({
      data: {
        category: category[0] || {},
      },
      status: 200,
      message: 'Success',
    });
  } catch (err) {
    console.log(`Func getCategoryBySlug Line: 62, PARAMS: { err }`, { err });
    res.status(500).json({
      message: err,
    });
  }
};
