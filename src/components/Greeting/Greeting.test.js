import { fireEvent, getByText, render, screen } from "@testing-library/react"
import Greeting from "./Greeting"

// test('cheking greeting is available or not',()=>{
//     render(<Greeting/>)
//     let a=screen.getByText('Greeting');
//     expect(a).toBeInTheDocument();

// })


test('renders initial greeting message', () => {
    render(<Greeting />);
    const greetingText = screen.getByText('It is good to see you!');
    expect(greetingText).toBeInTheDocument();
  });
  
  // Optionally, you can write a test for the button click event and the changed text
//   test('changes greeting message after button click', () => {
//     render(<Greeting />);
//     const button = screen.getByText('Change Text!');
//     fireEvent.click(button);
//     const changedGreetingText = screen.getByText('Changes!');
//     expect(changedGreetingText).toBeInTheDocument();
//   });
test('change gettting after button click',()=>{
    render(<Greeting/>)

    const button=screen.getByText('Change Text!');
    fireEvent.click(button);
    const changegreetingtest=screen.getByText('Changes!');
    expect(changegreetingtest).toBeInTheDocument();
})