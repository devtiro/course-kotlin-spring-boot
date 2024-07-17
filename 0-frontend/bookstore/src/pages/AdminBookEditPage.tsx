import { useContext, useEffect, useState } from "react";
import AdminBookForm from "../components/AdminBookForm";
import AppContext from "../context/AppContext";
import { Book } from "../domain/Book";
import BasePage from "./BasePage";
import { useNavigate, useParams } from "react-router-dom";
import { Author } from "../domain/Author";

export default function AdminBookEditPage() {
  const { isbn } = useParams();

  const bookService = useContext(AppContext).bookService;
  const authorService = useContext(AppContext).authorService;

  const navigate = useNavigate();

  const [book, setBook] = useState(undefined as Book | undefined);

  const [authors, setAuthors] = useState([] as Author[]);
  const [isAuthorsError, setIsAuthorsError] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const doUseEffect = async () => {
      try {
        const possibleBook = isbn ? await bookService.getBook(isbn) : undefined;
        if (!possibleBook) {
          navigate("/404");
        }
        setBook(possibleBook);

        await authorService
          .getAuthors()
          .then((authors) => setAuthors(authors))
          .catch((err) => {
            console.log(err);
            setIsAuthorsError(true);
          });

        setIsLoading(false);
      } catch (ex) {
        navigate("/404");
      }
    };
    doUseEffect();
  }, []);

  const updateBook = async (isbn: string, book: Book): Promise<void> => {
    await bookService.createUpdateBook(isbn, book);
    navigate("/admin");
  };

  return (
    <BasePage>
      <div>
        <AdminBookForm
          book={book}
          save={updateBook}
          isLoading={isLoading}
          authors={authors}
        />
      </div>
    </BasePage>
  );
}
