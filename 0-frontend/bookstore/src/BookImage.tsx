import { Image } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Book } from "./domain/Book";

type BookImageProps = {
  book: Book;
};
export default function BookImage(props: BookImageProps) {
  const { book } = props;
  return (
    <Image
      shadow="sm"
      radius="lg"
      width="100%"
      alt="Image of an book"
      className="w-full object-cover h-[300px]"
      src={`/images/${book.image}`}
    />
  );
}
