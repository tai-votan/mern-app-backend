import mongoose from 'mongoose';

const schema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    slug: {
      type: String,
      require: true,
    },
    featuredImage: {
      type: String,
      default: '',
    },
    oldSlug: {
      type: String,
      require: true,
    },
    publish: {
      type: Boolean,
      require: true,
    },
    author: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      default: '',
    },
    excerpt: {
      type: String,
      default: '',
    },
    tags: {
      type: String,
      default: '',
    },
    categoryId: {
      type: String,
      require: true,
    },
    metaTitle: {
      type: String,
      require: true,
    },
    metaDescription: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const PostModel = mongoose.model('Post', schema);

export default PostModel;
