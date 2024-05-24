import { useEffect, useState } from "react";
import env from "../../config/env";
import axios from "axios";
import Todo from "./Todo";

const Todos = () => {
  const [todos, setTodos] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todosResponse = await axios.get(`${env.BASE_URL}/api/todos`, {
          withCredentials: true,
        });
        const todos = todosResponse.data.data;
        setTodos(todos);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTodos();
  }, [todos]);
  return (
    <div className="bg-blue-100 border min-w-[60%] h-[90vh] border-gray-300 rounded-md p-2 pb-4">
      <h2 className="text-center font-semibold text-xl">Todos</h2>

      {/* Todo */}
      <div className="flex flex-col gap-1 overflow-y-auto h-[95%]">
        {todos?.map((todo) => (
          <div key={todo._id}>
            <Todo
              id={todo._id}
              title={todo.title}
              description={todo.description}
              date={todo.updatedAt}
              priority={todo.priority}
            />
          </div>
        ))}
      </div>

      {/* <Todo /> */}
    </div>
  );
};

export default Todos;
