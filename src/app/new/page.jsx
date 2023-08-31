'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NewPage({ params }) {
  const router = useRouter();
  const [task, setTask] = useState({ title: "", description: "" });
  useEffect(() => {
    if (params.id) {
      fetch(`/api/tasks/${params.id}`)
        .then(res => res.json())
        .then(data => setTask({ title: data.title, description: data.description }))
    }
  }, [])
  async function onSubmit(e) {
    e.preventDefault();
    if (params.id) {
      await fetch(`/api/tasks/${params.id}`, {
        method: 'PUT',
        body: JSON.stringify({ title: task.title, description: task.description }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    } else {
      await fetch("/api/tasks", {
        method: 'POST',
        body: JSON.stringify(task),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
    router.refresh();
    router.push('/');
  }
  function onDelete() {
    fetch(`/api/tasks/${params.id}`, {
      method: 'DELETE'
    })
    router.refresh();
    router.push('/');
  }
  return (
    <main className="h-screen flex justify-center items-center">
      <form className="bg-slate-800 p-10 w-3/4 lg:w-1/4" onSubmit={onSubmit}>
        <label htmlFor="title"
          className="font-bold text-sm"
        >Titulo de la tarea</label>
        <input
          type="text"
          id="title"
          className="border border-gray-400 p-2 mb-4 w-full text-black"
          placeholder="Titulo"
          onChange={(e) => setTask({...task, title: e.target.value})}
          value={task.title}
        />
        <label htmlFor="description"
          className="font-bold text-sm"
        >Descripción de la tarea</label>
        <textarea
          id="description"
          className="border border-gray-400 p-2 mb-4 w-full resize-none text-black"
          placeholder="Describe tu tarea"
          onChange={(e) => setTask({...task, description: e.target.value})}
          value={task.description}
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
        >{params.id ? "Actualizar" : "Crear"}</button>
        {
          params.id  && (
            <button
              type="button"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4"
              onClick={onDelete}
            >Delete</button>
          )
        }
      </form>
    </main>
  );
}