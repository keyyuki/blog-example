export default interface Post {
  id: number;
  title: string;
  corverImage?: string;
  shortDescription?: string;
  content?: string;
  publishDateTime?: number;
  createdById?: number;
  createdDateTime?: number;
}
