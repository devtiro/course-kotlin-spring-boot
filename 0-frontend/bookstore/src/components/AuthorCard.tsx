import { Card, CardBody } from "@nextui-org/react";
import AuthorImage from "../AuthorImage";
import { useNavigate } from "react-router-dom";
import { Author } from "../domain/Author";

type AuthorCardProps = {
  author: Author;
};
export default function AuthorCard(props: AuthorCardProps) {
  const { author } = props;
  const navigate = useNavigate();

  return (
    <Card
      shadow="sm"
      key={author.id}
      isPressable
      onPress={() => navigate(`/authors/${author.id}`)}
      className=""
    >
      <CardBody className="overflow-visible p-0">
        <AuthorImage author={author} />
        <div className="p-4">
          <p className="mb-2 font-bold">
            {author.name} ({author.age})
          </p>
          <p className="text-tiny font-light weight-300 line-clamp-2">
            {author.description}
          </p>
        </div>
      </CardBody>
    </Card>
  );
}
