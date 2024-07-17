import { AuthorSummary } from "./AuthorSummary";

export type Book = {
  isbn: string;
  title: string;
  description: string;
  author: AuthorSummary;
  image: string;
};
