import { useContext, useEffect, useState } from "react";
import AdminAuthorForm from "../components/AdminAuthorForm";
import AppContext from "../context/AppContext";
import { Author } from "../domain/Author";
import BasePage from "./BasePage";
import { useNavigate, useParams } from "react-router-dom";

export default function AdminEditCreatePage() {
  const { id } = useParams();
  const authorService = useContext(AppContext).authorService;

  const navigate = useNavigate();
  const [author, setAuthor] = useState(undefined as Author | undefined);
  const [numericId, setNumericId] = useState(undefined as number | undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const doUseEffect = async () => {
      try {
        const numericId = id ? parseInt(id) : undefined;
        setNumericId(numericId);
        const possibleAuthor = numericId
          ? await authorService.getAuthor(numericId)
          : undefined;
        if (!possibleAuthor) {
          navigate("/404");
        }
        setAuthor(possibleAuthor);
        setIsLoading(false);
      } catch (ex) {
        navigate("/404");
      }
    };
    doUseEffect();
  }, []);

  const updateAuthor = async (author: Author): Promise<void> => {
    if (numericId) {
      await authorService.fullUpdateAuthor(numericId, author);
      navigate("/admin");
    }
  };

  return (
    <BasePage>
      <div>
        <AdminAuthorForm
          author={author}
          save={updateAuthor}
          isLoading={isLoading}
        />
      </div>
    </BasePage>
  );
}
