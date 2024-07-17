import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Input,
  Textarea,
} from "@nextui-org/react";
import { Author } from "../domain/Author";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import AppContext from "../context/AppContext";

type AdminAuthorTableProps = {
  authors: Author[];
  deleteAuthor: (author: Author) => Promise<void>;
  refreshAuthors: () => Promise<void>;
};
export default function AdminAuthorTable(props: AdminAuthorTableProps) {
  const { authors, deleteAuthor, refreshAuthors } = props;
  const navigate = useNavigate();

  const authorService = useContext(AppContext).authorService;

  const [deleteId, setDeleteId] = useState(undefined as number | undefined);
  const [deleteError, setDeleteError] = useState(
    undefined as undefined | string
  );

  const [newName, setNewName] = useState(undefined as string | undefined);
  const [nameEditId, setNameEditId] = useState(undefined as number | undefined);
  const [nameEditError, setNameEditError] = useState(
    undefined as string | undefined
  );

  const [newAge, setNewAge] = useState(undefined as number | undefined);
  const [ageEditId, setAgeEditId] = useState(undefined as number | undefined);
  const [ageEditError, setAgeEditError] = useState(
    undefined as string | undefined
  );

  const [newDescription, setNewDescription] = useState(
    undefined as string | undefined
  );
  const [descriptionEditId, setDescriptionEditId] = useState(
    undefined as number | undefined
  );
  const [descriptionEditError, setDescriptionEditError] = useState(
    undefined as string | undefined
  );

  const doDelete = async (author: Author) => {
    setDeleteError(undefined);
    setDeleteId(author.id);
    await deleteAuthor(author)
      .then(() => setDeleteId(undefined))
      .catch((err) => setDeleteError(err.toString()));
  };

  const disableEditName = async () => {
    await setNameEditId(undefined);
    await setNewName(undefined);
  };

  const disableEditAge = async () => {
    await setAgeEditId(undefined);
    await setNewAge(undefined);
  };

  const disableEditDescription = () => {
    setDescriptionEditId(undefined);
    setDescriptionEditError(undefined);
    setNewDescription(undefined);
  };

  const enableEditName = (author: Author) => {
    if (!nameEditId) {
      disableEditAge();
      disableEditDescription();
      setNewName(author.name);
      setNameEditId(author.id);
    }
  };

  const saveEditName = async () => {
    if (nameEditId) {
      await authorService
        .partialUpdateAuthor(nameEditId, {
          name: newName,
          age: undefined,
          description: undefined,
          image: undefined,
        })
        .then(async () => {
          disableEditName();
          await refreshAuthors();
        })
        .catch((err) => {
          setNameEditError(err.toString());
        });
    }
  };

  const enableEditAge = (author: Author) => {
    if (!nameEditId) {
      disableEditName();
      disableEditDescription();
      setNewAge(author.age);
      setAgeEditId(author.id);
    }
  };

  const saveEditAge = async () => {
    if (ageEditId) {
      await authorService
        .partialUpdateAuthor(ageEditId, {
          name: undefined,
          age: newAge,
          description: undefined,
          image: undefined,
        })
        .then(async () => {
          disableEditAge();
          await refreshAuthors();
        })
        .catch((err) => {
          setAgeEditError(err.toString());
        });
    }
  };

  const enableEditDescription = (author: Author) => {
    if (!descriptionEditId) {
      disableEditName();
      disableEditAge();
      setNewDescription(author.description);
      setDescriptionEditId(author.id);
    }
  };

  const saveEditDescription = async () => {
    if (descriptionEditId) {
      await authorService
        .partialUpdateAuthor(descriptionEditId, {
          name: undefined,
          age: undefined,
          description: newDescription,
          image: undefined,
        })
        .then(async () => {
          disableEditDescription();
          await refreshAuthors();
        })
        .catch((err) => {
          setDescriptionEditError(err.toString());
        });
    }
  };
  const navigateToEditAuthorPage = (author: Author) => {
    navigate(`/admin/authors/${author.id}`);
  };

  const safelySetAge = (value: string) => {
    try {
      setNewAge(parseInt(value));
    } catch (ex) {
      console.log(`Invalid age '${value}'`);
    }
  };

  return (
    <div>
      <Table aria-label="Authors Table">
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>NAME</TableColumn>
          <TableColumn>AGE</TableColumn>
          <TableColumn>DESCRIPTION</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {authors.map((author) => (
            <TableRow key={author.id}>
              <TableCell>{author.id}</TableCell>
              <TableCell onClick={() => enableEditName(author)}>
                {author.id !== nameEditId && author.name}
                {author.id === nameEditId && nameEditError === undefined && (
                  <>
                    <Input
                      label="Name"
                      value={newName}
                      onValueChange={setNewName}
                      className="mb-4"
                    />
                    <Button
                      size="sm"
                      className="w-full mb-2"
                      onClick={saveEditName}
                    >
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="bordered"
                      className="w-full"
                      onClick={disableEditName}
                    >
                      Cancel
                    </Button>
                  </>
                )}
                {author.id === nameEditId && nameEditError !== undefined && (
                  <>
                    <p className="text-danger text-tiny text-center mb-2">
                      {nameEditError}
                    </p>
                    <Button
                      size="sm"
                      variant="bordered"
                      className="w-full"
                      onClick={() => {
                        setNameEditError(undefined);
                      }}
                    >
                      Ok
                    </Button>
                  </>
                )}
              </TableCell>
              <TableCell onClick={() => enableEditAge(author)}>
                {author.id !== ageEditId && author.age}
                {author.id === ageEditId && ageEditError === undefined && (
                  <>
                    <Input
                      type="number"
                      label="Age"
                      value={newAge?.toString()}
                      onValueChange={safelySetAge}
                      className="mb-4"
                    />
                    <Button
                      size="sm"
                      className="w-full mb-2"
                      onClick={saveEditAge}
                    >
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="bordered"
                      className="w-full"
                      onClick={disableEditAge}
                    >
                      Cancel
                    </Button>
                  </>
                )}
                {author.id === ageEditId && ageEditError !== undefined && (
                  <>
                    <p className="text-danger text-tiny text-center mb-2">
                      {ageEditError}
                    </p>
                    <Button
                      size="sm"
                      variant="bordered"
                      className="w-full"
                      onClick={() => {
                        setAgeEditError(undefined);
                      }}
                    >
                      Ok
                    </Button>
                  </>
                )}
              </TableCell>
              <TableCell onClick={() => enableEditDescription(author)}>
                {author.id !== descriptionEditId && (
                  <span className="italic text-tiny">{author.description}</span>
                )}
                {author.id === descriptionEditId &&
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
                {author.id === descriptionEditId &&
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
              <TableCell>
                <Button
                  className="mb-2"
                  size="sm"
                  onClick={() => {
                    navigateToEditAuthorPage(author);
                  }}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  color="danger"
                  onClick={() => {
                    doDelete(author);
                  }}
                >
                  Delete
                </Button>
                {deleteError !== undefined && author.id === deleteId && (
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
