
const Todo = ({_id, title, description, date, priority}) => {
    const dateObj = new Date(date)
  return (
    <div className="p-2 border min-h-[5em] bg-white rounded-md text-sm">
        {priority ? (<div className="text-xs p-1 rounded full bg-red-200">Priority: {priority}</div>): ""}
        <div className="flex justify-between">
          <div>
            <span>{title ? `${title}`:(<span className="italic">No title</span>)}</span>
          </div>
          <div className="flex gap-1">
            <span>Date: {dateObj?.toLocaleDateString()} {dateObj?.toLocaleTimeString()}</span>
          </div>
        </div>
        <div>{description ? `${description}`: (<span className="italic">No description</span>)}</div>
      </div>
  )
}

export default Todo