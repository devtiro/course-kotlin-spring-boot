import { Button, Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminAuthorTable from "../components/AdminAuthorTable";
import AppContext from "../context/AppContext";
import { Author } from "../domain/Author";
import { Book } from "../domain/Book";
import BasePage from "./BasePage";
import ErrorMessage from "../components/ErrorMessage";
import AdminBookForm from "../components/AdminBookForm";
import AdminBooksTable from "../components/AdminBooksTable";

export default function Admin() {
  const navigate = useNavigate();

  const authorService = useContext(AppContext).authorService;
  const bookService = useContext(AppContext).bookService;

  const [books, setBooks] = useState([] as Book[]);
  const [isBooksError, setIsBooksError] = useState(false);

  const [authors, setAuthors] = useState([] as Author[]);
  const [isAuthorsError, setIsAuthorsError] = useState(false);

  const refreshAuthors = async () => {
    await authorService
      .getAuthors()
      .then((authors) => setAuthors(authors))
      .catch((err) => {
        console.log(err);
        setIsAuthorsError(true);
      });
  };

  const refreshBooks = async () => {
    await bookService
      .getBooks()
      .then((books) => setBooks(books))
      .catch((err) => {
        console.log(err);
        setIsBooksError(true);
      });
  };

  useEffect(() => {
    const doUseEffect = async () => {
      await refreshAuthors();
      await refreshBooks();
    };
    doUseEffect();
  }, []);

  const deleteAuthor = async (author: Author) => {
    if (author.id !== undefined) {
      await authorService.deleteAuthor(author.id);
    }
    setAuthors(await authorService.getAuthors());
  };

  const deleteBook = async (book: Book) => {
    if (book.isbn !== undefined) {
      await bookService.deleteBook(book.isbn);
    }
    setBooks(await bookService.getBooks());
  };
  return (
    <BasePage>
      <Tabs variant="underlined" aria-label="Options">
        <Tab key="authors" title="Authors">
          {isAuthorsError && <ErrorMessage message="Unable to get authors" />}
          {!isAuthorsError && (
            <AdminAuthorTable
              authors={authors}
              deleteAuthor={deleteAuthor}
              refreshAuthors={refreshAuthors}
            />
          )}
          <div className="mt-4 text-right">
            <Button
              onClick={() => {
                navigate("/admin/authors");
              }}
            >
              Add Author
            </Button>
          </div>
        </Tab>
        <Tab key="books" title="Books">
          {isBooksError && <ErrorMessage message="Unable to get books" />}
          {!isBooksError && (
            <AdminBooksTable
              books={books}
              deleteBook={deleteBook}
              refreshBooks={refreshBooks}
            />
          )}
          <div className="mt-4 text-right">
            <Button
              onClick={() => {
                navigate("/admin/books");
              }}
            >
              Add Book
            </Button>
          </div>
        </Tab>
      </Tabs>
    </BasePage>
  );
}
