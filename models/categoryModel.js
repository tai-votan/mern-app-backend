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
    oldSlug: {
      type: String,
      require: true,
    },
    featuredImage: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
    tags: {
      type: String,
      default: '',
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

const CategoryModel = mongoose.model('Categories', schema);

export default CategoryModel;
