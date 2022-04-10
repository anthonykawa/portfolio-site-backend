import { PostType } from './types';
import { BaseContext } from 'apollo-server-types';
import _ from 'lodash';
export const postsData = [
  {
    id: 1,
    Title: 'This is the title',
    Snippet: 'This is the snipped',
    featured_image: {
      id: 1,
      url: 'https://example.com/img.jpeg',
      formats: {
        medium: {
          url: 'https://wallpaperaccess.com/full/154009.jpg'
        }
      },
    },
    body: {
      blocks: [
        {
          type: 'paragraph',
          data: {
            text: 'Here\'s some random text to show what I can do.'
          }
        }
      ]
    },
    created_at: 'April 21, 2021'
  },
  {
    id: 2,
    Title: 'This is another post',
    Snippet: 'Lorem ipsum',
    featured_image: {
      id: 1,
      url: 'https://example.com/img.jpeg',
      formats: {
        medium: {
          url: 'https://wallpaperaccess.com/full/154009.jpg'
        }
      },
    },
    body: {
      blocks: [
        {
          type: 'header',
          data: {
            level: 1,
            text: 'This is a header',
          }
        }
      ]
    },
    created_at: 'January 21, 2021'
  }
]

const Post = {
  query: (parent: any, { id }: { id: number }, { datasource }: { datasource: any }): PostType => {
    const postIndex = _.findIndex(postsData, { id } );
    if (postIndex !== -1) {
      const post = postsData[postIndex];
      return {
        ...post,
        body: JSON.stringify(post.body),
      };
    }
    return null;
  },
  mutation: (id: number): any => {
    return null;
  }
}

export default Post;