// import { useState } from "react"
// import { Plus, MoreVertical, Search, Users, X } from "lucide-react"

// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
 
// const ProjectBoard = () => {
//   const [columns, setColumns] = useState([
//     {
//       id: "planning",
//       title: "Planning",
//       tasks: [
//         { id: "1", title: "Design user authentication", assignee: "Rathod", status: "Planning" },
//         { id: "2", title: "Implement API Integration", assignee: "Kumar", status: "Planning" },
//       ],
//     },
//     {
//       id: "in-progress",
//       title: "In-Progress",
//       tasks: [{ id: "3", title: "Optimize database", assignee: "Rathod", status: "In-Progress" }],
//     },
//     {
//       id: "completed",
//       title: "Completed",
//       tasks: [
//         { id: "4", title: "Set up CI/CD pipeline", assignee: "Rathod", status: "Completed" },
//         { id: "5", title: "Create component library", assignee: "Kumar", status: "Completed" },
//       ],
//     },
//     {
//       id: "block",
//       title: "Block",
//       tasks: [],
//     },
//   ])
 
//   const [selectedTask, setSelectedTask] = useState(null)
//   const [showMenu, setShowMenu] = useState(null)
//   const [showTeams, setShowTeams] = useState(false)
//   const [showAddTaskPopup, setShowAddTaskPopup] = useState(false)
//   const [newTaskTitle, setNewTaskTitle] = useState("")
//   const [newTaskAssignee, setNewTaskAssignee] = useState("")
 
//   const statusColors = {
//     Planning: "bg-green-100 text-green-700",
//     "In-Progress": "bg-orange-100 text-orange-700",
//     Completed: "bg-blue-100 text-blue-700",
//     Block: "bg-red-100 text-red-700",
//   }
 
//   const handleAddTask = () => {
//     if (newTaskTitle.trim() && newTaskAssignee.trim()) {
//       const newTask = {
//         id: Date.now().toString(),
//         title: newTaskTitle,
//         assignee: newTaskAssignee,
//         status: "Planning",
//       }
 
//       setColumns((prevColumns) => {
//         return prevColumns.map((col) => {
//           if (col.id === "planning") {
//             return {
//               ...col,
//               tasks: [...col.tasks, newTask],
//             }
//           }
//           return col
//         })
//       })
 
//       setNewTaskTitle("")
//       setNewTaskAssignee("")
//       setShowAddTaskPopup(false)
//     }
//   }
 
//   const handleTaskClick = (task) => {
//     setSelectedTask(task)
//   }
 
//   const handleStatusChange = (task, newStatus) => {
//     setColumns((prev) =>
//       prev.map((col) => ({
//         ...col,
//         tasks: col.tasks.map((t) => (t.id === task.id ? { ...t, status: newStatus } : t)),
//       })),
//     )
//     setShowMenu(null)
//   }
 
//   const handleDragEnd = (result) => {
//     if (!result.destination) return
 
//     const { source, destination } = result
 
//     const sourceColIndex = columns.findIndex((col) => col.id === source.droppableId)
//     const destColIndex = columns.findIndex((col) => col.id === destination.droppableId)
//     const sourceCol = columns[sourceColIndex]
//     const destCol = columns[destColIndex]
 
//     const sourceTasks = [...sourceCol.tasks]
//     const destTasks = [...destCol.tasks]
 
//     const [removed] = sourceTasks.splice(source.index, 1)
//     destTasks.splice(destination.index, 0, { ...removed, status: destCol.title })
 
//     const newColumns = [...columns]
//     newColumns[sourceColIndex] = { ...sourceCol, tasks: sourceTasks }
//     newColumns[destColIndex] = { ...destCol, tasks: destTasks }
 
//     setColumns(newColumns)
//   }
 
//   return (
//     <div className="flex">
//       {/* Sidebar */}
//       <div className="fixed left-0 top-0 w-60 h-screen bg-gray-100 shadow-md">
        
//       </div>
 
//       {/* Main Content */}
//       <div className="ml-60 flex-grow">
//         {/* Header */}
//         <div className="fixed top-14 left-60 right-0 bg-white p-4 flex items-center justify-between z-10">
//           <div className="flex items-center gap-4">
//             <h2 className="text-xl font-semibold">sample_project</h2>
//             <button onClick={() => setShowTeams(!showTeams)} className="text-purple-500 relative">
//               <Users />
//               {showTeams && (
//                 <div className="absolute bg-white shadow-lg rounded p-2 mt-1 right-0 w-48">
//                   <ul className="text-sm text-gray-700">
//                     <li className="hover:bg-gray-100 p-2 cursor-pointer">Team Member 1</li>
//                     <li className="hover:bg-gray-100 p-2 cursor-pointer">Team Member 2</li>
//                     <li className="hover:bg-gray-100 p-2 cursor-pointer">Team Member 3</li>
//                   </ul>
//                 </div>
//               )}
//             </button>
//           </div>
//           <div className="relative">
//             <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <input type="search" placeholder="Search tasks..." className="pl-10 w-64 p-2 border rounded-md" />
//           </div>
//         </div>
 
//         {/* Board */}
//         <div className="mt-40 p-6 bg-gray-50 h-screen overflow-auto">
//           <h2 className="text-xl font-semibold mb-6">Board</h2>
//           <DragDropContext onDragEnd={handleDragEnd}>
//             <div className="flex gap-8">
//               {columns.map((column) => (
//                 <Droppable key={column.id} droppableId={column.id}>
//                   {(provided, snapshot) => (
//                     <div
//                       ref={provided.innerRef}
//                       {...provided.droppableProps}
//                       className={`flex flex-col min-w-[300px] p-4 bg-white rounded-lg shadow-md ${
//                         snapshot.isDraggingOver ? "bg-gray-100" : ""
//                       }`}
//                     >
//                       <div className="flex items-center justify-between pb-2 border-b border-gray-300">
//                         <h3 className="font-medium">{column.title}</h3>
//                         <span className="text-sm text-gray-500">{column.tasks.length}</span>
//                       </div>
//                       <div className="mt-3 flex-grow">
//                         {column.title === "Planning" && (
//                           <button
//                             onClick={() => setShowAddTaskPopup(true)}
//                             className="w-full p-3 border-2 border-dashed border-gray-200 rounded-lg text-gray-500 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
//                           >
//                             <Plus className="w-4 h-4" /> Add task
//                           </button>
//                         )}
//                         {column.tasks.map((task, index) => (
//                           <Draggable key={task.id} draggableId={task.id} index={index}>
//                             {(provided, snapshot) => (
//                               <div
//                                 ref={provided.innerRef}
//                                 {...provided.draggableProps}
//                                 {...provided.dragHandleProps}
//                                 onClick={() => handleTaskClick(task)}
//                                 className={`bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-pointer w-full relative mt-2 ${
//                                   snapshot.isDragging ? "shadow-lg" : ""
//                                 }`}
//                               >
//                                 <div className="flex justify-between items-start mb-2">
//                                   <h3 className="font-medium text-gray-900">{task.title}</h3>
//                                   <button
//                                     onClick={(e) => {
//                                       e.stopPropagation()
//                                       setShowMenu(showMenu === task.id ? null : task.id)
//                                     }}
//                                     className="p-1 hover:bg-gray-100 rounded"
//                                   >
//                                     <MoreVertical className="w-4 h-4 text-gray-500" />
//                                   </button>
//                                 </div>
//                                 <div className="flex items-center justify-between">
//                                   <div className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded">
//                                     {task.assignee}
//                                   </div>
//                                   <div className={`px-2 py-1 text-sm rounded ${statusColors[task.status]}`}>
//                                     {task.status}
//                                   </div>
//                                 </div>
//                                 {showMenu === task.id && (
//                                   <div className="absolute bg-white shadow-lg rounded p-2 right-0 top-8 z-10">
//                                     {["Planning", "In-Progress", "Completed", "Block"].map((status) => (
//                                       <button
//                                         key={status}
//                                         className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
//                                         onClick={(e) => {
//                                           e.stopPropagation()
//                                           handleStatusChange(task, status)
//                                         }}
//                                       >
//                                         {status}
//                                       </button>
//                                     ))}
//                                   </div>
//                                 )}
//                               </div>
//                             )}
//                           </Draggable>
//                         ))}
//                         {provided.placeholder}
//                       </div>
//                     </div>
//                   )}
//                 </Droppable>
//               ))}
//             </div>
//           </DragDropContext>
//         </div>
//       </div>
 
//       {/* Add Task Popup */}
//       {showAddTaskPopup && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-xl w-96">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-semibold">Add New Task</h2>
//               <button onClick={() => setShowAddTaskPopup(false)} className="text-gray-500 hover:text-gray-700">
//                 <X className="w-5 h-5" />
//               </button>
//             </div>
//             <div className="mb-4">
//               <label htmlFor="taskTitle" className="block text-sm font-medium text-gray-700 mb-1">
//                 Task Title
//               </label>
//               <input
//                 type="text"
//                 id="taskTitle"
//                 value={newTaskTitle}
//                 onChange={(e) => setNewTaskTitle(e.target.value)}
//                 className="w-full p-2 border rounded-md"
//                 placeholder="Enter task title"
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="taskAssignee" className="block text-sm font-medium text-gray-700 mb-1">
//                 Assignee
//               </label>
//               <input
//                 type="text"
//                 id="taskAssignee"
//                 value={newTaskAssignee}
//                 onChange={(e) => setNewTaskAssignee(e.target.value)}
//                 className="w-full p-2 border rounded-md"
//                 placeholder="Enter assignee name"
//               />
//             </div>
//             <button
//               onClick={handleAddTask}
//               className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
//             >
//               Add Task
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }
 
// export default ProjectBoard