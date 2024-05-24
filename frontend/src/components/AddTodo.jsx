import axios from "axios";
import { useState } from "react";
import env from "../../config/env";

const AddTodo = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "low",
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${env.BASE_URL}/api/todos`, formData, {
        withCredentials: true,
      });
    } catch (error) {
      console.log(err.message);
    }
  };

  return (
    <div className="bg-green-100 border border-gray-300 rounded-md p-2 pb-4">
      <h2 className="text-center font-semibold text-xl">Add todo</h2>
      <form className="px-5 flex flex-col gap-2" onSubmit={submitHandler}>
        {/* Title input */}
        <div className="flex flex-col gap-1">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="rounded focus:outline-blue-500 py-1 px-2 border border-gray-300"
          />
        </div>

        {/* Description input */}
        <div className="flex flex-col gap-1">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            rows={4}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="rounded focus:outline-blue-500 py-1 px-2 border border-gray-300"
          ></textarea>
        </div>

        <div>
          <div>Priority</div>
          <div>
            <input type="checkbox" name="high"/> <label htmlFor="high">High</label> <br />
            <input type="checkbox" name="medium" /> <label htmlFor="medium">Medium</label> <br />
            <input type="checkbox" name="low" /> <label htmlFor="low">Low</label> <br />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md w-fit"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTodo;
