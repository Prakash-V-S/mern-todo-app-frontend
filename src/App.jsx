import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@popperjs/core/dist/umd/popper.min.js";
import AxiosInstance from "./Utility/AxiosInstance.js";
import { useEffect, useState } from "react";
import Card from "./Card";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [cardDetails, setCardDetails] = useState([]);
  const [buttonAdd, setButtonAdd] = useState("Add ToDo");
  const [editingCardId, setEditingCardId] = useState(null);

  useEffect(() => {
    getAllToDos();
  }, []);

  const getAllToDos = async () => {
    try {
      const response = await AxiosInstance.get("/todos");
      setCardDetails(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const Add_UpdateToDo = async (todoN, todoD) => {
    if (buttonAdd === "Add ToDo") {
      try {
        const response = await AxiosInstance.post("todos", {
          title: todoN,
          description: todoD,
        });
        const res = await AxiosInstance.get("todos");
        setCardDetails(res.data);
        setButtonAdd("Add ToDo");
        setEditingCardId(null);
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    } else if (buttonAdd === "Update ToDo") {
      try {
        const updateTodo = await AxiosInstance.put(`/todos/${editingCardId}`, { //if i click edit button means it shows ststus pending 6631e3c771e3a434b7334e59	(pending)
          title: todoN,
          description: todoD,
        });
        updateCard();
      } catch (error) {
        console.error("Error updating todo:", error);
      }
    }
    setTitle("");
    setDescription("");
  };

  const updateCard = async () => {
    try {
      const res = await AxiosInstance.get("todos");
      setCardDetails(res.data);
      setButtonAdd("Add ToDo");
      setEditingCardId(null);
    } catch (error) {
      console.error("Error updating card:", error);
    }
  };

  const cardUpdate = (name, des, id) => {
    setButtonAdd("Update ToDo");
    setTitle(name);
    setDescription(des);
    setEditingCardId(id);
  };

  const cardDelete = async (id) => {
    try {
      await AxiosInstance.delete(`/todos/${id}`);
      updateCard()
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="app">
      <Header />
      <div className="container">
        <form className="row mt-4 g-4 d-flex justify-content-center">
          <div className="col-md-6 col-lg-4 d-flex justify-content-center">
            <label htmlFor="title" className="visually-hidden">
              ToDo Name
            </label>
            <input
              type="text"
              className="form-control w-100"
              id="title"
              placeholder="ToDo Name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="col-md-6 col-lg-4 d-flex justify-content-center">
            <label htmlFor="description" className="visually-hidden">
              ToDo Description
            </label>
            <input
              type="text"
              className="form-control w-100"
              id="description"
              placeholder="ToDo Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="col-md-12 col-lg-3 d-flex justify-content-center">
            <button
              type="button"
              disabled={title === "" || description === ""}
              className={`btn w-75 ${
                buttonAdd === "Add ToDo" ? "btn-success" : "btn-primary"
              }`}
              onClick={() => Add_UpdateToDo(title, description)}
            >
              {buttonAdd}
            </button>
          </div>
        </form>
        <div className="row mt-5 px-md-5 px-lg-5 d-flex align-items-center">
          <div className="col-12 col-md-5 col-lg-4 d-flex justify-content-center">
            <h4 className="h4 m-0">My Todos</h4>
          </div>
          <div className="col-12 col-md-1 col-lg-3 mb-3"></div>
          <div className="col-12 col-md-6 col-lg-5 d-flex align-items-center justify-content-center"></div>
        </div>
        <div className="row todo-cards-row py-5 d-flex justify-content-center">
          {cardDetails.length === 0 ? (
            <h3 className="h3 text-center mb-4">ToDo is Empty 😁.</h3>
          ) : (
            cardDetails.map((card) => {
              return (
                <Card
                  key={card.id}
                  card={card}
                  cardUpdate={cardUpdate}
                  cardDelete={cardDelete}
                />
              );
            })
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
