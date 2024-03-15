import { render, screen } from "@testing-library/react"
import Home from "./Home"

test('renders name correctly in the h1 element', () => {
    // Render the component
    render(<Home />);
  
    // Get the h1 element by its text content
    const nameElement = screen.getByText('this one is home page');
  
    // Assert that the h1 element is present
    expect(nameElement).toBeInTheDocument();
  });