import { useContext } from "react";
import AdminAuthorForm from "../components/AdminAuthorForm";
import AppContext from "../context/AppContext";
import { Author } from "../domain/Author";
import BasePage from "./BasePage";
import { useNavigate } from "react-router";

export default function AdminAuthorCreatePage() {
  const authorService = useContext(AppContext).authorService;

  const navigate = useNavigate();

  const createAuthor = async (author: Author): Promise<void> => {
    await authorService.createAuthor(author);
    navigate("/admin");
  };

  return (
    <BasePage>
      <div>
        <AdminAuthorForm
          author={undefined}
          save={createAuthor}
          isLoading={false}
        />
      </div>
    </BasePage>
  );
}
