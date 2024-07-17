import React, { useContext, useEffect, useState } from "react";
import BasePage from "./BasePage";
import { useNavigate, useParams } from "react-router-dom";
import AppContext from "../context/AppContext";
import { Author } from "../domain/Author";
import { Book } from "../domain/Book";
import BookImage from "../BookImage";
import { Button, Link } from "@nextui-org/react";
import { Bookmark, ShoppingBag } from "react-feather";

export default function BookDetailsPage() {
  const { isbn } = useParams();

  const bookService = useContext(AppContext).bookService;

  const navigate = useNavigate();

  const [book, setBook] = useState(undefined as Book | undefined);

  useEffect(() => {
    const doUseEffect = async () => {
      if (isbn) {
        await bookService
          .getBook(isbn)
          .then((book) => setBook(book))
          .catch((err) => {
            console.log(err);
            console.log(err);
            navigate("/404");
          });
      }
    };
    doUseEffect();
  }, []);

  return (
    <BasePage>
      <div className="flex gap-10">
        <div className="min-w-[300px]">{book && <BookImage book={book} />}</div>
        <div className="pr-10">
          <div className="mb-4">
            <h1 className="font-bold text-3xl mb-2">{book?.title}</h1>
            <Link href={`/authors/${book?.author?.id}`} color="foreground">
              {book?.author?.name}
              <span className="ml-1 text-default-500">(Author)</span>
            </Link>
          </div>

          <div className="flex gap-4 mb-8">
            <Button color="success">
              <ShoppingBag /> Add to Basket
            </Button>
            <Button variant="bordered">
              <Bookmark /> Add to Wishlist
            </Button>
          </div>

          <h2 className="font-bold text-2xl mb-2">Description</h2>
          <p>{book?.description}</p>
        </div>
      </div>
    </BasePage>
  );
}
