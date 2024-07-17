import {
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Textarea,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { Book } from "../domain/Book";
import { useContext, useState } from "react";
import AppContext from "../context/AppContext";

type AdminBookTableProps = {
  books: Book[];
  deleteBook: (author: Book) => Promise<void>;
  refreshBooks: () => Promise<void>;
};
export default function AdminBookTable(props: AdminBookTableProps) {
  const { books, deleteBook, refreshBooks } = props;
  const navigate = useNavigate();

  const bookService = useContext(AppContext).bookService;

  const navigateToEditBookPage = (book: Book) => {
    navigate(`/admin/books/${book.isbn}`);
  };

  const [deleteId, setDeleteId] = useState(undefined as string | undefined);
  const [deleteError, setDeleteError] = useState(
    undefined as undefined | string
  );

  const [newTitle, setNewTitle] = useState(undefined as string | undefined);
  const [titleEditId, setTitleEditId] = useState(
    undefined as string | undefined
  );
  const [titleEditError, setTitleEditError] = useState(
    undefined as string | undefined
  );

  const [newDescription, setNewDescription] = useState(
    undefined as string | undefined
  );
  const [descriptionEditId, setDescriptionEditId] = useState(
    undefined as string | undefined
  );
  const [descriptionEditError, setDescriptionEditError] = useState(
    undefined as string | undefined
  );

  const doDelete = async (book: Book) => {
    setDeleteError(undefined);
    setDeleteId(book.isbn);
    await deleteBook(book)
      .then(() => setDeleteId(undefined))
      .catch((err) => setDeleteError(err.toString()));
  };

  const disableEditTitle = async () => {
    await setTitleEditId(undefined);
    await setNewTitle(undefined);
  };

  const disableEditDescription = async () => {
    await setDescriptionEditId(undefined);
    await setNewDescription(undefined);
  };

  const enableEditTitle = (book: Book) => {
    if (!descriptionEditId) {
      disableEditDescription();
      setNewTitle(book.title);
      setTitleEditId(book.isbn);
    }
  };

  const enableEditDescription = (book: Book) => {
    if (!descriptionEditId) {
      disableEditTitle();
      setNewDescription(book.description);
      setDescriptionEditId(book.isbn);
    }
  };

  const saveEditTitle = async () => {
    if (titleEditId) {
      await bookService
        .partialUpdateBook(titleEditId, {
          isbn: undefined,
          title: newTitle,
          description: undefined,
          author: undefined,
          image: undefined,
        })
        .then(async () => {
          disableEditTitle();
          await refreshBooks();
        })
        .catch((err) => {
          setTitleEditError(err.toString());
        });
    }
  };

  const saveEditDescription = async () => {
    if (descriptionEditId) {
      await bookService
        .partialUpdateBook(descriptionEditId, {
          isbn: undefined,
          title: undefined,
          description: newDescription,
          author: undefined,
          image: undefined,
        })
        .then(async () => {
          disableEditDescription();
          await refreshBooks();
        })
        .catch((err) => {
          setDescriptionEditError(err.toString());
        });
    }
  };

  return (
    <div>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>ISBN</TableColumn>
          <TableColumn>TITLE</TableColumn>
          <TableColumn>DESCRIPTION</TableColumn>
          <TableColumn>AUTHOR</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book.isbn}>
              <TableCell>{book.isbn}</TableCell>
              <TableCell onClick={() => enableEditTitle(book)}>
                {book.isbn !== titleEditId && book.title}
                {book.isbn === titleEditId && titleEditError === undefined && (
                  <>
                    <Input
                      label="Title"
                      value={newTitle}
                      onValueChange={setNewTitle}
                      className="mb-4"
                    />
                    <Button
                      size="sm"
                      className="w-full mb-2"
                      onClick={saveEditTitle}
                    >
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="bordered"
                      className="w-full"
                      onClick={disableEditTitle}
                    >
                      Cancel
                    </Button>
                  </>
                )}
                {book.isbn === titleEditId && titleEditError !== undefined && (
                  <>
                    <p className="text-danger text-tiny text-center mb-2">
                      {titleEditError}
                    </p>
                    <Button
                      size="sm"
                      variant="bordered"
                      className="w-full"
                      onClick={() => {
                        setTitleEditError(undefined);
                      }}
                    >
                      Ok
                    </Button>
                  </>
                )}
              </TableCell>
              <TableCell onClick={() => enableEditDescription(book)}>
                {book.isbn !== descriptionEditId && (
                  <span className="italic text-tiny line-clamp-3">
                    {book.description}
                  </span>
                )}
                {book.isbn === descriptionEditId &&
                  descriptionEditError === undefined && (
                    <>
                      <Textarea
                        label="Description"
                        value={newDescription}
                        onValueChange={setNewDescription}
                        className="mb-4"
                      />
                      <Button
                        size="sm"
                        className="w-full mb-2"
                        onClick={saveEditDescription}
                      >
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="bordered"
                        className="w-full"
                        onClick={() => disableEditDescription()}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                {book.isbn === descriptionEditId &&
                  descriptionEditError !== undefined && (
                    <>
                      <p className="text-danger text-tiny text-center mb-2">
                        {descriptionEditError}
                      </p>
                      <Button
                        size="sm"
                        variant="bordered"
                        className="w-full"
                        onClick={() => {
                          setDescriptionEditError(undefined);
                        }}
                      >
                        Ok
                      </Button>
                    </>
                  )}
              </TableCell>
              <TableCell>{book.author?.name}</TableCell>
              <TableCell>
                <Button
                  className="mb-2"
                  size="sm"
                  onClick={() => {
                    navigateToEditBookPage(book);
                  }}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  color="danger"
                  onClick={() => {
                    doDelete(book);
                  }}
                >
                  Delete
                </Button>
                {deleteError !== undefined && book.isbn === deleteId && (
                  <p className="text-danger text-tiny mt-2">{deleteError}</p>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
