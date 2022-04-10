import Post from './Post';
import Posts from './Posts';

const resolvers = {
  Query: {
    post: Post.query,
    posts: Posts.query,
  }
}

export default resolvers;