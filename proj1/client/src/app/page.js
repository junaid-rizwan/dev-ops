'use client'
import { useState, useEffect, useCallback } from "react";

export default function Home() {
  const [formdata, setFormData] = useState({
    title: "",
    description: ""
  });
  const [tasks, setTasks] = useState([]);
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;


  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formdata);
    const res = await fetch(`${BASE_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formdata)
    })
    const data = await res.json();
    console.log(data);

    // Refresh the task list and clear the form
    setFormData({ title: "", description: "" });
    getTasks();
  }
  const getTasks = useCallback(async () => {
    const res = await fetch(`${BASE_URL}/tasks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await res.json();
    setTasks(data);
  }, [BASE_URL]);

  const deleteTask = async (id) => {
    const res = await fetch(`${BASE_URL}/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await res.json();
    setTasks([...tasks, data]);
  }

  useEffect(() => {
    getTasks();
  }, [getTasks])

  const handleChange = (e) => {
    setFormData({
      ...formdata,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col items-center py-12 px-4 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700/50 shrink-0 mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-10 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-blue-400 opacity-20 rounded-full blur-2xl"></div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight relative z-10 drop-shadow-md">Task Manager</h1>
          <p className="text-blue-100 mt-3 text-sm font-medium relative z-10 tracking-wide">Streamline and structure your daily workflow</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="group">
              <label htmlFor="title" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors">
                Task Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formdata.title}
                onChange={handleChange}
                placeholder="e.g., Fix homepage navigation bug"
                className="w-full px-5 py-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 shadow-sm hover:border-indigo-300 placeholder:text-gray-400"
                required
              />
            </div>

            <div className="group">
              <label htmlFor="description" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formdata.description}
                onChange={handleChange}
                placeholder="Add more details about this task..."
                rows={4}
                className="w-full px-5 py-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 shadow-sm hover:border-indigo-300 resize-none placeholder:text-gray-400"
                required
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 active:from-indigo-800 active:to-blue-800 text-white font-bold text-lg rounded-xl shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] hover:-translate-y-1 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900"
              >
                Add New Task
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="w-full max-w-lg space-y-4">
        {tasks.length > 0 && (
          <h2 className="text-xl font-extrabold text-gray-800 dark:text-white mb-4 px-2 tracking-tight">Your Tasks</h2>
        )}

        {tasks.length === 0 ? (
          <div className="w-full bg-white/60 dark:bg-gray-800/60 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-3xl p-10 text-center backdrop-blur-sm shadow-sm">
            <div className="mb-4 text-gray-400 dark:text-gray-500 flex justify-center">
              <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-gray-500 dark:text-gray-400 font-medium">No tasks yet. Create one above to get started!</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div key={task._id} className="group bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start justify-between">
                <div className="flex bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-xl h-12 w-12 min-w-[48px] items-center justify-center font-bold text-xl mr-5 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                  ✓
                </div>
                <div className="flex-1 w-full overflow-hidden mr-4">
                  <h1 className="text-xl font-bold text-gray-800 dark:text-white mb-2 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {task.title}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm break-words whitespace-pre-wrap">
                    {task.description}
                  </p>
                </div>
                <button
                  onClick={() => {
                    deleteTask(task._id);
                    // Add a small delay for the backend to process before refreshing
                    setTimeout(getTasks, 100);
                  }}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 shrink-0 self-center"
                  title="Delete task"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
