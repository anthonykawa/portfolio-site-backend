export interface PostType {
  id: number,
  Title: string,
  Snippet: string,
  featured_image: Image,
  body: string,
}

interface Body {
  blocks: Block[],
}

interface Block {
  type: string,
  data: Data,
}

interface Data {
  text?: string,
  level?: number,
  code?: string,
  file?: File,
  alignment?: string,
}

interface File {
  url: string,
  caption: string,
}

interface Image {
  id: number,
  url: string,
  formats: Formats,
}

interface Formats {
  small?: Format,
  medium?: Format,
  Large?: Format
}

interface Format {
  url: string,
}

export interface PostsWhereType {
  published: boolean,
}