import { render, screen } from "@testing-library/react";
import Todo from "./pages/MainPage/Components/Todo/Todo.js";

test("renders learn react link", () => {
  render(<Todo />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
