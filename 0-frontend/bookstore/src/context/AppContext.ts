import { createContext } from "react";
import { AuthorServiceImpl } from "../services/authorService";
import { BookServiceImpl } from "../services/bookService";

const AppContext = createContext({
  authorService: new AuthorServiceImpl(),
  bookService: new BookServiceImpl(),
});

export default AppContext;
