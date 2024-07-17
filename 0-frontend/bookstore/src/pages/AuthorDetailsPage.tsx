import React, { useContext, useEffect, useState } from "react";
import BasePage from "./BasePage";
import { useNavigate, useParams } from "react-router-dom";
import AppContext from "../context/AppContext";
import { Author } from "../domain/Author";
import AuthorImage from "../AuthorImage";
import { Book } from "../domain/Book";
import { Skeleton } from "@nextui-org/react";
import BookCardGrid from "../components/BookCardGrid";
import ErrorMessage from "../components/ErrorMessage";

export default function AuthorDetailsPage() {
  const { id } = useParams();

  const navigate = useNavigate();

  const authorService = useContext(AppContext).authorService;
  const bookService = useContext(AppContext).bookService;

  const [isLoading, setIsLoading] = useState(true);
  const [author, setAuthor] = useState(undefined as Author | undefined);
  const [books, setBooks] = useState(undefined as Book[] | undefined);
  const [isBooksError, setIsBooksError] = useState(false);

  useEffect(() => {
    const doUseEffect = async () => {
      const authorId = id ? parseInt(id) : undefined;
      if (authorId) {
        await authorService
          .getAuthor(authorId)
          .then((author) => setAuthor(author))
          .catch((err) => {
            console.log(err);
            navigate("/404");
          });
        await bookService
          .getBooks(authorId)
          .then((books) => setBooks(books))
          .catch((err) => {
            console.log(err);
            setIsBooksError(true);
          });
        setIsLoading(false);
      }
    };
    doUseEffect();
  }, []);

  return (
    <BasePage>
      <div>
        <Skeleton isLoaded={!isLoading}>
          <h1 className="font-extrabold text-4xl mb-8">
            {author?.name} ({author?.age})
          </h1>
        </Skeleton>
        <div className="flex gap-8 mb-8">
          {author && (
            <Skeleton isLoaded={!isLoading}>
              <AuthorImage author={author} />
            </Skeleton>
          )}
          <Skeleton isLoaded={!isLoading}>
            <div>
              <p className="text-8xl font-black px-4 h-[60px]">"</p>
              <p className="max-w-[640px] px-12 italic text-xl">
                {author?.description}
              </p>
              <p className="text-8xl font-black h-[60px] text-end px-4">"</p>
            </div>
          </Skeleton>
        </div>
        <h2 className="font-extrabold text-2xl mb-2">
          Books by {author?.name}
        </h2>
        {isBooksError && <ErrorMessage message="Unable to get books" />}
        {!isBooksError && <BookCardGrid books={books} max={undefined} />}{" "}
      </div>
    </BasePage>
  );
}
