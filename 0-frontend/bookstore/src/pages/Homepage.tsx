import { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { Author } from "../domain/Author";
import { Book } from "../domain/Book";
import BasePage from "./BasePage";
import AuthorCardGrid from "../components/AuthorCardGrid";
import BookCardGrid from "../components/BookCardGrid";
import ErrorMessage from "../components/ErrorMessage";

export default function Homepage() {
  const authorService = useContext(AppContext).authorService;
  const bookService = useContext(AppContext).bookService;

  const [books, setBooks] = useState([] as Book[]);
  const [isBooksError, setIsBooksError] = useState(false);

  const [authors, setAuthors] = useState([] as Author[]);
  const [isAuthorsError, setIsAuthorsError] = useState(false);

  useEffect(() => {
    const doUseEffect = async () => {
      await authorService
        .getAuthors()
        .then((authors) => setAuthors(authors))
        .catch((err) => {
          console.log(err);
          setIsAuthorsError(true);
        });

      await bookService
        .getBooks()
        .then((books) => setBooks(books))
        .catch((err) => {
          console.log(err);
          setIsBooksError(true);
        });
    };
    doUseEffect();
  }, []);

  return (
    <BasePage>
      <div>
        <div className="mt-8">
          <h2 className="font-bold text-2xl mb-4">Books</h2>
          {isBooksError && <ErrorMessage message="Unable to get books" />}
          {!isBooksError && <BookCardGrid books={books} max={5} />}
        </div>

        <div className="mt-8 pb-16">
          <h2 className="font-bold text-2xl mb-4">Authors</h2>
          {isAuthorsError && <ErrorMessage message="Unable to get authors" />}
          {!isAuthorsError && <AuthorCardGrid authors={authors} max={4} />}
        </div>
      </div>
    </BasePage>
  );
}
