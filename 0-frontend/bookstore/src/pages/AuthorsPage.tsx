import { useContext, useEffect, useState } from "react";
import AuthorCardGrid from "../components/AuthorCardGrid";
import AppContext from "../context/AppContext";
import { Author } from "../domain/Author";
import BasePage from "./BasePage";
import ErrorMessage from "../components/ErrorMessage";

export default function Homepage() {
  const authorService = useContext(AppContext).authorService;

  const [authors, setAuthors] = useState([] as Author[]);
  const [isAuthorsError, setIsAuthorsError] = useState(false);

  useEffect(() => {
    const doUseEffect = async () => {
      await authorService
        .getAuthors()
        .then((authors) => setAuthors(authors))
        .catch((err) => {
          console.log(err);
          setIsAuthorsError(true);
        });
    };
    doUseEffect();
  }, []);

  return (
    <BasePage>
      <h1 className="font-extrabold text-4xl mb-8">Authors</h1>
      {isAuthorsError && <ErrorMessage message="Unable to get authors" />}
      {!isAuthorsError && <AuthorCardGrid authors={authors} max={undefined} />}
    </BasePage>
  );
}
