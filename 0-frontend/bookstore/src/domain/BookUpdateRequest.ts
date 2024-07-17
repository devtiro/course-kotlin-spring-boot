import { AuthorSummary } from "./AuthorSummary";

export type BookUpdateRequest = {
  isbn: string|undefined;
  title: string|undefined;
  description: string|undefined;
  author: AuthorSummary|undefined;
  image: string|undefined;
};
