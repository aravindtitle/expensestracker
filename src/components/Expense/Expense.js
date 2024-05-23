import React, { useEffect, useState } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import { ExpenseActions } from "../../store/ExpensesReducers";
import { useDispatch } from "react-redux";

const Expense = () => {
  const [postput, setPostPut] = useState(false);
  const [moneySpent, setMoneySpent] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Food");
  const [updatedKey, setUpdatedKey] = useState(null);
  const [ItemList, setItemList] = useState([]);

  const yourDatabaseURL =
    "https://expenses-tracker-2f825-default-rtdb.firebaseio.com";

  const UID = localStorage.getItem("UID");

  const dispatch = useDispatch();

  async function PostData(obj = "defalut value") {
    console.log(postput);
    console.log(updatedKey);

    if (!postput) {
      console.log("this is to add the expenses");
      try {
        const response = await fetch(
          `${yourDatabaseURL}/users/${UID}/expenses.json`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
          }
        );
        if (!response.ok) {
          throw new Error();
        }

        console.log(response);
        dispatch(ExpenseActions.addUpTotal(obj.moneySpent));
        GetData();
      } catch (error) {
        console.log("this was the error" + error);
      }

      //this below code is run when you press on update button
    } else {
      console.log("this is for updating expenses");

      try {
        const response = await fetch(
          `${yourDatabaseURL}/users/${UID}/expenses/${updatedKey}.json`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ moneySpent, description, category }),
          }
        );
        if (!response.ok) {
          throw new Error("got it!");
        }
        GetData();
        console.log("updated");
      } catch (error) {
        console.log("this was the error" + error);
      }
    }
  }

  //here this one is function which is used to get data when function is executing.
  async function GetData() {
    try {
      const response = await fetch(
        `${yourDatabaseURL}/users/${UID}/expenses.json`
      );
      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();
      if (!data) {
        dispatch(ExpenseActions.setExpense([]));
      } else {
        console.log(Object.entries(data));
        setItemList(Object.entries(data));
        dispatch(ExpenseActions.setExpense(Object.entries(data)));
      }
    } catch (error) {
      console.log("this was the error" + error);
    }
  }

  useEffect(() => {
    GetData();
  }, []);

  return (
    <>
      <ExpenseForm
        PostData={PostData}
        moneySpent={moneySpent}
        description={description}
        category={category}
        setMoneySpent={setMoneySpent}
        setDescription={setDescription}
        setCategory={setCategory}
      />
      <ExpenseList
        ListItem={ItemList}
        GetData={GetData}
        moneySpent={moneySpent}
        description={description}
        category={category}
        setMoneySpent={setMoneySpent}
        setDescription={setDescription}
        setCategory={setCategory}
        postput={postput}
        setPostPut={setPostPut}
        PostData={PostData}
        setUpdatedKey={setUpdatedKey}
      />
    </>
  );
};

export default Expense;
