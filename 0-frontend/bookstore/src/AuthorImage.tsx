import { Image } from "@nextui-org/react";
import { Author } from "./domain/Author";

type AuthorImageProps = {
  author: Author;
};
export default function AuthorImage(props: AuthorImageProps) {
  const { author } = props;

  const authorToAuthorImage = (author: Author): string => {
    return `/images/${author.image}`;
  };

  return (
    <Image
      shadow="sm"
      radius="lg"
      width="100%"
      alt="Image of an author"
      className="w-full object-cover h-[300px]"
      src={authorToAuthorImage(author)}
    />
  );
}
