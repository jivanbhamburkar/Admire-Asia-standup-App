import { useState } from "react";
import "./App.css";
import data from "./mock-data.json";
import { nanoid } from "nanoid";

export default function App() {
  const [contacts, setContacts] = useState(data);
  const [formData, setFormdata] = useState({
    date: "",
    name: "",
    yesterday: "",
    yesterdayStatus: "",
    yesterdayBlockers: "",
    today: "",
    todayStatus: "",
    todayBlockers: ""
  });
  const handleCheckBox = (e) => {
    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.checked;
    // console.log(e.target.checked);
    console.log(`${fieldName} ${fieldValue}`);
    const newFormData = { ...formData };
    newFormData[fieldName] = fieldValue;
    setFormdata(newFormData);
  };
  const handleAddFormChange = (e) => {
    e.preventDefault();

    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;
    // console.log(`${fieldName} , ${fieldValue}`);
    const newFormData = { ...formData };
    newFormData[fieldName] = fieldValue;
    setFormdata(newFormData);
  };

  const handleAddFormSubmit = (e) => {
    if (!formData.name || !formData.yesterday || !formData.today) {
      alert("Please fill necessary information");
      return;
    }
    e.preventDefault();
    // console.log(contacts);
    // let today = new Date();
    // let date = `${today.getDate()}/${parseInt(
    //   today.getMonth() + 1
    // )}/${today.getFullYear()}, ${today.get}:${today.getMinutes()}:${today.getSeconds()}`;
    let date = new Date().toLocaleDateString();
    const newContact = {
      id: nanoid(),
      date: date,
      name: formData.name,
      yesterday: formData.yesterday,
      yesterdayStatus: formData.yesterdayStatus,
      yesterdayBlockers: formData.yesterdayBlockers,
      today: formData.today,
      todayStatus: formData.todayStatus,
      todayBlockers: formData.todayBlockers
    };
    const newContacts = [newContact, ...contacts];
    setContacts(newContacts);
  };

  return (
    <div className="app-container">
      <h1> Daily Standup App </h1>
      <form>
        <input
          type="text"
          name="name"
          required="required"
          placeholder="Enter a Name"
          onChange={handleAddFormChange}
        />
        <br />
        <input
          type="text"
          name="yesterday"
          required="required"
          placeholder="Yesterday's Task"
          onChange={handleAddFormChange}
        />
        <br />
        <input
          type="checkbox"
          name="yesterdayStatus"
          onChange={handleCheckBox}
        />
        Completed
        <br />
        <input
          type="text"
          name="yesterdayBlockers"
          required="required"
          placeholder="Blockers"
          onChange={handleAddFormChange}
        />
        <br />
        <br />
        <input
          type="text"
          name="today"
          required="required"
          placeholder="Today's Task"
          onChange={handleAddFormChange}
        />
        <br />
        <input type="checkbox" name="todayStatus" onChange={handleCheckBox} />
        Completed
        <br />
        <input
          type="text"
          name="todayBlockers"
          required="required"
          placeholder="Blockers"
          onChange={handleAddFormChange}
        />
        <br />
        <button onClick={handleAddFormSubmit}>Add</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Yesterday's Task</th>
            <th>Completed</th>
            <th>Blockers</th>
            <th>Today's Task</th>
            <th>Completed</th>
            <th>Blockers</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((curr) => {
            return (
              <tr>
                <td>{curr.date}</td>
                <td>{curr.name}</td>
                <td>{curr.yesterday}</td>
                <td>{curr.yesterdayStatus ? "Completed" : "Pending"}</td>
                <td>{curr.yesterdayBlockers}</td>
                <td>{curr.today}</td>
                <td>{curr.todayStatus ? "Completed" : "Pending"}</td>
                <td>{curr.todayBlockers}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
