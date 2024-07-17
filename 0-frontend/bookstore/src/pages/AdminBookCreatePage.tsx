import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AdminBookForm from "../components/AdminBookForm";
import AppContext from "../context/AppContext";
import { Book } from "../domain/Book";
import BasePage from "./BasePage";
import { Author } from "../domain/Author";

export default function AdminAuthorCreatePage() {
  const bookService = useContext(AppContext).bookService;
  const authorService = useContext(AppContext).authorService;

  const navigate = useNavigate();

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
    };
    doUseEffect();
  }, []);

  const createBook = async (isbn: string, book: Book): Promise<void> => {
    await bookService.createUpdateBook(isbn, book);
    navigate("/admin");
  };

  return (
    <BasePage>
      <div>
        <AdminBookForm
          book={undefined}
          save={createBook}
          isLoading={false}
          authors={authors}
        />
      </div>
    </BasePage>
  );
}
