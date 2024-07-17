import { Author } from "../domain/Author";
import { AuthorUpdateRequest } from "../domain/AuthorUpdateRequest";
import { handleServerException } from "./serviceUtil";

export interface AuthorService {
  createAuthor(author: Author): Promise<Author>;
  getAuthor(id: number): Promise<Author | undefined>;
  getAuthors(): Promise<Author[]>;
  fullUpdateAuthor(id: number, author: Author): Promise<Author>;
  partialUpdateAuthor(id: number, author: AuthorUpdateRequest): Promise<Author>;
  deleteAuthor(id: number): Promise<void>;
}

export class AuthorServiceImpl implements AuthorService {
  async getAuthor(id: number): Promise<Author | undefined> {
    const response = await fetch(`/v1/authors/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    handleServerException(response);
    return (await response.json()) as Author;
  }

  async getAuthors(): Promise<Author[]> {
    const response = await fetch(`/v1/authors`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    handleServerException(response);
    return (await response.json()) as Author[];
  }

  async createAuthor(author: Author): Promise<Author> {
    const response = await fetch(`/v1/authors`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(author),
    });
    handleServerException(response);
    return (await response.json()) as Author;
  }

  async fullUpdateAuthor(id: number, author: Author) {
    const response = await fetch(`/v1/authors/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(author),
    });
    handleServerException(response);
    return (await response.json()) as Author;
  }

  async partialUpdateAuthor(id: number, author: AuthorUpdateRequest) {
    const response = await fetch(`/v1/authors/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(author),
    });
    handleServerException(response);
    return (await response.json()) as Author;
  }

  async deleteAuthor(id: number) {
    const response = await fetch(`/v1/authors/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    handleServerException(response);
  }
}
