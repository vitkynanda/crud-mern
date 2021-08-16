import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";

function App() {
  const [item, setItem] = useState({
    title: "",
    description: "",
  });

  const [updatedItem, setUpdatedItem] = useState({
    title: "",
    description: "",
    id: "",
  });
  const [dataItem, setDataItem] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    function fetchData() {
      const result = axios.get("http://localhost:3001/items").then((res) => {
        setDataItem(res.data);
      });
      return result;
    }
    return fetchData();
  }, [dataItem]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setItem((prevItem) => {
      return {
        ...prevItem,
        [name]: value,
      };
    });
  };

  const openUpdate = (id) => {
    setIsUpdate(true);
    setUpdatedItem((prevItem) => {
      return {
        ...prevItem,
        id: id,
      };
    });
  };

  const handleChangeUpdate = (event) => {
    const { name, value } = event.target;
    setUpdatedItem((prevItem) => {
      return {
        ...prevItem,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      title: item.title,
      description: item.description,
    };
    axios
      .post("http://localhost:3001/newItem", newItem)
      .then((res) => console.log(res));
    setItem({
      title: "",
      description: "",
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put("http://localhost:3001/put/" + updatedItem.id, updatedItem);
    setIsUpdate((isUpdate) => !isUpdate);
  };

  const deleteItem = (id) => {
    axios
      .delete("http://localhost:3001/delete/" + id)
      .then((res) => console.log(res));
  };

  return (
    <div className="App">
      <h1>CRUD MERN</h1>
      {!isUpdate ? (
        <>
          <form>
            <div className="input">
              <input
                onChange={handleChange}
                name="title"
                value={item.title}
                placeholder="Title"
              />
              <input
                onChange={handleChange}
                name="description"
                value={item.description}
                placeholder="Description"
              />
            </div>
            <button onClick={handleSubmit} className="btn-submit">
              Submit
            </button>
          </form>
        </>
      ) : (
        <>
          <form>
            <div className="input">
              <input
                onChange={handleChangeUpdate}
                name="title"
                value={updatedItem.title}
                placeholder="Title"
              />
              <input
                onChange={handleChangeUpdate}
                name="description"
                value={updatedItem.description}
                placeholder="Description"
              />
            </div>
            <button onClick={handleUpdate} className="btn-submit">
              Update
            </button>
          </form>
        </>
      )}
      <div>
        {dataItem.map((item) => (
          <div className="item-wrap" key={item._id}>
            <div className="item-content">
              <p>{item.title}</p>
              <p>{item.description}</p>
            </div>
            <div className="btn-wrap">
              <button
                onClick={() => {
                  deleteItem(item._id);
                }}
              >
                Delete
              </button>
              <button onClick={() => openUpdate(item._id)}>Update</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
