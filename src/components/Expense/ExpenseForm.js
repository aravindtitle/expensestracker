import React, { useState } from "react";

const ExpenseForm = ({
  PostData,
  moneySpent,
  description,
  category,
  setMoneySpent,
  setDescription,
  setCategory,
}) => {
  // const [moneySpent, setMoneySpent] = useState('');
  // const [description, setDescription] = useState('');
  // const [category, setCategory] = useState('Food');
  // trying to select item
  const changeMoneyHandler = (event) => {
    setMoneySpent(event.target.value);
  };
  const changeDescriptionHandler = (event) => {
    setDescription(event.target.value);
  };
  const changeCategoryHandler = (event) => {
    setCategory(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Form submitted:", { moneySpent, description, category });
    PostData({ moneySpent, description, category });
    setMoneySpent("");
    setCategory("");
    setDescription("");
  };
  return (
    <div className="container">
      <h2>Expense Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="moneySpent" className="form-label">
              Money Spent:
            </label>
            <input
              type="text"
              className="form-control"
              id="moneySpent"
              placeholder="Enter amount spent"
              value={moneySpent}
              onChange={changeMoneyHandler}
            />
          </div>
          <div className="col">
            <label htmlFor="expenseCategory" className="form-label">
              Expense Category:
            </label>
            <select
              className="form-control"
              id="expenseCategory"
              value={category}
              onChange={changeCategoryHandler}
            >
              <option value="Food">Food</option>
              <option value="Petrol">Petrol</option>
              <option value="Salary">Salary</option>
              {/* Add more options as needed */}
            </select>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="expenseDescription" className="form-label">
            Expense Description:
          </label>
          <textarea
            className="form-control"
            id="expenseDescription"
            rows="3"
            placeholder="Enter expense description"
            value={description}
            onChange={changeDescriptionHandler}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
