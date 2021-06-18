import get from 'lodash/get.js';
import PostModel from '../models/postModel.js';
import { stripHTML, toSlug } from '../utils/utils.js';

export const getPost = async (req, res) => {
  try {
    const posts = await PostModel.find().sort({ updatedAt: 'desc' });
    res.status(200).json({
      data: {
        posts,
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

export const getPostBySlug = async ({ params }, res) => {
  try {
    const posts = await PostModel.find({ slug: params.slug });
    res.status(200).json({
      data: {
        articleDetails: posts[0] || {},
      },
      status: 200,
      message: 'Success',
    });
  } catch (err) {
    console.log(`Func getPostById Line: 33, PARAMS: { err }`, { err });
    res.status(500).json({
      message: err,
    });
  }
};

export const createPost = async (req, res) => {
  const {
    body: {
      title,
      slug,
      featuredImage,
      oldSlug,
      publish,
      author,
      content,
      excerpt,
      tags,
      categoryId,
      metaTitle,
      metaDescription,
    },
  } = req;

  try {
    const docs = {
      title,
      slug: toSlug(slug),
      featuredImage,
      oldSlug: toSlug(oldSlug || slug),
      publish,
      author,
      content,
      excerpt,
      tags,
      categoryId,
      metaTitle: metaTitle || title,
      metaDescription: stripHTML(metaDescription || excerpt),
    };
    const post = new PostModel(docs);
    post.save();
    res.status(200).json({
      data: docs,
      status: 200,
      message: 'Success',
    });
  } catch (err) {
    console.log(`Func createPost Line: 51, PARAMS: { err }`, { err });
    res.status(500).json({
      message: err,
    });
  }
};

export const editPost = async (req, res) => {
  try {
    res.status(500).json({
      data: {},
      status: 500,
      message: 'Success',
    });
    // const posts = await PostModel.find()
    // res.status(200).json({
    //   data: {
    //     posts
    //   },
    //   status: 200,
    //   message: 'Success'
    // });
  } catch (err) {
    console.log(`Func deletePost Line: 69, PARAMS: { err }`, { err });
    res.status(500).json({
      message: err,
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    res.status(500).json({
      data: {},
      status: 500,
      message: 'Success',
    });
    // const posts = await PostModel.find()
    // res.status(200).json({
    //   data: {
    //     posts
    //   },
    //   status: 200,
    //   message: 'Success'
    // });
  } catch (err) {
    console.log(`Func deletePost Line: 69, PARAMS: { err }`, { err });
    res.status(500).json({
      message: err,
    });
  }
};
