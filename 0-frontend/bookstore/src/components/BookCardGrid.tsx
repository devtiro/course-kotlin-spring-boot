import { Avatar, Card, CardBody, CardFooter, Link } from "@nextui-org/react";
import { Book as BookIcon } from "react-feather";
import { useNavigate } from "react-router-dom";
import { Book } from "../domain/Book";
import BookImage from "../BookImage";

type BookCardGridProps = {
  books: Book[] | undefined;
  max: number | undefined;
};
export default function BookCardGrid(props: BookCardGridProps) {
  const { books, max } = props;

  const navigate = useNavigate();

  var booksToDisplay = books;
  if (max !== undefined && books !== undefined && max < books?.length) {
    booksToDisplay = books?.slice(0, max - 1);
  }

  if (books && books.length > 0) {
    return (
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
        {booksToDisplay?.map((item, index) => (
          <Card
            shadow="sm"
            key={index}
            isPressable
            onPress={() => navigate(`/books/${item.isbn}`)}
          >
            <CardBody className="overflow-visible p-0">
              <BookImage book={item} />
            </CardBody>
            <CardFooter className="flex justify-center">
              <div className="flex gap-4 text-small">
                <Avatar
                  src={`/images/${item.author.image}`}
                  className="min-w-[40px] mt-2"
                ></Avatar>
                <div className="text-left">
                  <b className="line-clamp-1">{item.title}</b>
                  <p className="text-default-400">{item.isbn}</p>
                  <p>
                    By{" "}
                    <Link
                      href={`/authors/${item.author.id}`}
                      color="foreground"
                      className="font-semibold"
                    >
                      {item.author.name}
                    </Link>
                  </p>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  } else {
    return (
      <div className="p-8 text-center">
        <BookIcon className="mx-auto mb-4 text-default-500" size={40} />
        <h2 className="text-xl font-bold text-default-500">No Books yet!</h2>
      </div>
    );
  }
}
