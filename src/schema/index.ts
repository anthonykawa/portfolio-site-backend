import { gql } from 'apollo-server-express';


const typeDefs = gql`
  scalar Any

  type Query {
    post(id: Int!): Post
    posts(where: Where): [Post]
  }

  type Post {
    id: Int
    Title: String
    Snippet: String
    featured_image: Image
    body: String
    created_at: String
  }

  type Image {
    id: Int
    url: String
    formats: Any
  }

  type Formats {
    small: Format
    medium: Format
    large: Format
  }

  type Body {
    Blocks: [Any]
  }

  type Format {
    url: String
  }

  input Where {
    published: Boolean
  }
`;

export default typeDefs;