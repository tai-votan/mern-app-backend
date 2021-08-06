import user from './user.js';
import post from './post.js';
import category from './category.js';

const routers = {
  '/api/user': user,
  '/api/post': post,
  '/api/category': category,
};

export default routers;
