import { useContext, useEffect, useState } from "react";
import BookCardGrid from "../components/BookCardGrid";
import AppContext from "../context/AppContext";
import { Book } from "../domain/Book";
import BasePage from "./BasePage";
import ErrorMessage from "../components/ErrorMessage";

export default function Homepage() {
  const bookService = useContext(AppContext).bookService;

  const [books, setBooks] = useState([] as Book[]);
  const [isBooksError, setIsBooksError] = useState(false);

  useEffect(() => {
    const doUseEffect = async () => {
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
      <h1 className="font-extrabold text-4xl mb-8">Books</h1>
      {isBooksError && <ErrorMessage message="Unable to get books" />}
      {!isBooksError && <BookCardGrid books={books} max={undefined} />}
    </BasePage>
  );
}
