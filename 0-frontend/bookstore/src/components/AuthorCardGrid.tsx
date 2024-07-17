import { Author } from "../domain/Author";
import AuthorCard from "../components/AuthorCard";
import { User } from "react-feather";

type AuthorCardGridProps = {
  authors: Author[] | undefined;
  max: number | undefined;
};
export default function AuthorCardGrid(props: AuthorCardGridProps) {
  const { authors, max } = props;

  var authorsToDisplay = authors;
  if (max !== undefined && authors !== undefined && max < authors.length) {
    authorsToDisplay = authors.slice(0, max - 1);
  }

  if (authors && authors.length > 0) {
    return (
      <div className="gap-4 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {authorsToDisplay?.map((item) => <AuthorCard author={item} />)}
      </div>
    );
  } else {
    return (
      <div className="p-8 text-center">
        <User className="mx-auto mb-4 text-default-500" size={40} />
        <h2 className="text-xl font-bold text-default-500">No Authors yet!</h2>
      </div>
    );
  }
}
