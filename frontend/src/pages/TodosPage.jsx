import AddTodo from "../components/AddTodo";
import Todos from "../components/Todos";

const TodosPage = () => {  
  return (
    <div className="h-screen w-screen">
      <div className="flex justify-center gap-3 items-center h-full">
        <AddTodo />
        <Todos />
      </div>
    </div>
  );
};

export default TodosPage;
