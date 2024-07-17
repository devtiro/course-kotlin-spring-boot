import {
  Avatar,
  Button,
  Input,
  Select,
  SelectItem,
  Skeleton,
  Textarea,
} from "@nextui-org/react";
import { Key, useEffect, useMemo, useState } from "react";
import { Book } from "../domain/Book";
import { Author } from "../domain/Author";

type AdminBookFormProps = {
  book: Book | undefined;
  authors: Author[];
  save: (isbn: string, book: Book) => Promise<void>;
  isLoading: boolean;
};
export default function AdminBookForm(props: AdminBookFormProps) {
  const { book, save, authors, isLoading } = props;

  const [isbn, setIsbn] = useState(undefined as string | undefined);
  const [title, setTitle] = useState(undefined as string | undefined);
  const [description, setDescripton] = useState(
    undefined as string | undefined
  );
  const [image, setImage] = useState(undefined as string | undefined);
  const [author, setAuthor] = useState(undefined as string | undefined);
  const [formValid, setFormValid] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    undefined as string | undefined
  );
  useEffect(() => {
    console.log(JSON.stringify(book));
    if (book !== undefined) {
      const matchingAuthors = authors.filter(
        (author) => book.author.id === author.id
      );
      setIsbn(book.isbn);
      setTitle(book.title);
      setDescripton(book.description);
      setImage(book.image);
      setAuthor(
        matchingAuthors.length > 0
          ? matchingAuthors[0].id?.toString()
          : undefined
      );
    }
  }, [book, authors]);

  useEffect(() => {
    setFormValid(isFormValid());
  }, [isbn, title, description, image, author]);

  const isBook = (): boolean => {
    return undefined !== book;
  };

  const isTitleInvalid = useMemo(() => {
    return !(title !== undefined && title.length > 0 && title.length < 512);
  }, [title]);

  const isDescriptionInvalid = useMemo(() => {
    return !(
      description !== undefined &&
      description.length > 0 &&
      description.length < 2048
    );
  }, [description]);

  const isIsbnInvalid = useMemo(() => {
    if (undefined === isbn) {
      return true;
    }
    // Check if the ISBN matches the pattern with optional hyphens
    const isbnPattern = /^(?:\d{3}-?\d{1,5}-?\d{1,7}-?\d{1,7}-?\d|^\d{1,13})$/;
    return !isbnPattern.test(isbn);
  }, [isbn]);

  const isAuthorInvalid = useMemo(() => {
    return author === undefined;
  }, [author]);

  const isImageInvalid = useMemo(() => {
    return image === undefined;
  }, [image]);

  const isFormValid = (): boolean => {
    return (
      !isIsbnInvalid &&
      !isTitleInvalid &&
      !isDescriptionInvalid &&
      !isAuthorInvalid &&
      !isImageInvalid
    );
  };

  const doSave = async () => {
    if (formValid) {
      setIsSaving(true);
      if (isbn && author) {
        save(isbn, {
          isbn: isbn,
          title: title ? title : "",
          description: description ? description : "",
          author: {
            id: parseInt(author),
          },
          image: image ? image : "",
        })
          .then(() => setIsSaving(false))
          .catch((ex) => {
            setErrorMessage(ex.toString());
            setIsSaving(false);
          });
      } else {
        setErrorMessage("Form not valid.");
      }
    } else {
      setErrorMessage("Form not valid.");
    }
  };

  const setAuthorFromAuthors = (keys: "all" | Set<Key>) => {
    setAuthor((keys as Set<Key>).values().next().value);
  };

  function generateRandomISBN(): string {
    const prefix = "978"; // The common prefix for most ISBN-13 numbers
    const randomDigits = Math.floor(Math.random() * 100000000000); // 12 random digits

    // Concatenate the prefix and random digits
    const isbnWithoutCheckDigit =
      prefix + randomDigits.toString().padStart(12, "0");

    // Calculate the check digit using the ISBN-13 algorithm
    const checkDigit = calculateISBN13CheckDigit(isbnWithoutCheckDigit);

    // Concatenate the check digit to the ISBN without check digit
    const isbn = isbnWithoutCheckDigit + checkDigit;

    // Insert hyphens to format the ISBN
    const formattedISBN = `${isbn.substring(0, 3)}-${isbn.substring(
      3,
      6
    )}-${isbn.substring(6, 12)}-${isbn.substring(12)}`;

    return formattedISBN;
  }

  function calculateISBN13CheckDigit(isbnWithoutCheckDigit: string): number {
    let sum = 0;

    for (let i = 0; i < 12; i++) {
      const digit = parseInt(isbnWithoutCheckDigit[i], 10);
      sum += i % 2 === 0 ? digit : digit * 3;
    }

    const remainder = sum % 10;
    const checkDigit = remainder === 0 ? 0 : 10 - remainder;

    return checkDigit;
  }

  return (
    <div>
      <Skeleton isLoaded={!isLoading}>
        <div className="flex gap-4">
          <Input
            label="ISBN"
            value={isbn}
            onValueChange={setIsbn}
            className="mb-4"
            isInvalid={isIsbnInvalid}
          />
          <Button
            className="color-foreground mt-2"
            variant="bordered"
            onClick={() => {
              setIsbn(generateRandomISBN());
            }}
          >
            Generate
          </Button>
        </div>
      </Skeleton>

      <Skeleton isLoaded={!isLoading}>
        <Input
          label="Title"
          placeholder="Enter Book Title"
          value={title}
          onValueChange={setTitle}
          className="mb-4"
          isInvalid={isTitleInvalid}
        />
      </Skeleton>

      <Skeleton isLoaded={!isLoading}>
        <Textarea
          label="Description"
          placeholder="Enter book description"
          value={description}
          onValueChange={setDescripton}
          className="mb-4"
          isInvalid={isDescriptionInvalid}
        />
      </Skeleton>

      <Skeleton isLoaded={!isLoading}>
        <Select
          label="Select Author"
          className="mb-4"
          selectedKeys={author ? [author] : []}
          onSelectionChange={setAuthorFromAuthors}
          selectionMode="single"
          isInvalid={isAuthorInvalid}
        >
          {authors.map((author, index) => {
            return (
              <SelectItem
                key={author.id ? author.id : index}
                startContent={
                  <Avatar
                    alt={author.name}
                    className="w-6 h-6"
                    src={`/images/${author.image}`}
                  />
                }
              >
                {author.name}
              </SelectItem>
            );
          })}
        </Select>
      </Skeleton>

      <Skeleton isLoaded={!isLoading}>
        <Input
          label="Image"
          placeholder="Enter the image"
          value={image}
          onValueChange={setImage}
          isInvalid={isImageInvalid}
        />
      </Skeleton>

      <div className="mt-4 text-right">
        <Skeleton isLoaded={!isLoading}>
          {errorMessage && (
            <span className="text-danger mr-4">{errorMessage}</span>
          )}
          <Button disabled={!formValid} isLoading={isSaving} onClick={doSave}>
            {isBook() ? "Update Book" : "Create Book"}
          </Button>
        </Skeleton>
      </div>
    </div>
  );
}
