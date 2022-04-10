import { PostType, PostsWhereType } from './types';
import { postsData } from './Post';
import _ from 'lodash';

const Posts = {
  query: (where: PostsWhereType): PostType[] => {
    return _.map(postsData, (post) => {
      return {
        ...post,
        body: JSON.stringify(post.body),
      }
    });
  }
}

export default Posts;