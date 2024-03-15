import React from "react";
import { useSelector } from "react-redux";

const ExpenseList = ({
  ListItem,
  GetData,
  moneySpent,
  description,
  category,
  setMoneySpent,
  setDescription,
  setCategory,
  postput,
  setPostPut,
  PostData,
  setUpdatedKey,
}) => {
  const UID = localStorage.getItem("UID");
  const yourDatabaseURL =
    "https://expenses-tracker-2f825-default-rtdb.firebaseio.com";

  const ExpenseList = useSelector((state) => state.Expence.ExpenseItem);
  console.log(ExpenseList);

  async function deleteHandler(id) {
    console.log(id);
    try {
      const response = await fetch(
        `${yourDatabaseURL}/users/${UID}/expenses/${id}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("got it!");
      }
      GetData();
      console.log(response);
    } catch (error) {
      console.log("this was the error" + error);
    }
  }

  async function updateHandler(obj) {
    console.log(obj);
    setMoneySpent(obj.moneySpent);
    setDescription(obj.description);
    setCategory(obj.category);
    setPostPut(true);
    setUpdatedKey(obj.key);
    // PostData(obj.key)
  }

  return (
    <div className="container">
      <ul className="list-group">
        {ExpenseList.map(([key, item]) => (
          <li key={key} className="list-group-item">
            <div className="d-flex justify-content-between">
              <div>
                <strong>Money Spent:</strong> ${item.moneySpent}
              </div>
              <div>
                <button
                  className="btn btn-primary"
                  onClick={() => updateHandler({ key, ...item })}
                >
                  Update
                </button>
                <button
                  onClick={() => deleteHandler(key)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
            <div>
              <strong>Description:</strong> {item.description}
            </div>
            <div>
              <strong>Category:</strong> {item.category}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
