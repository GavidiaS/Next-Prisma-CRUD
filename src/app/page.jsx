import { prisma } from "@/libs/prisma"
import TaskCard from "@/components/TaskCard";

async function loadTasks() {
  // Dos enfoques para llamar tareas
  // 1. Obteniendo de la base de datos
  return await prisma.task.findMany();

  // 2. Haciedo una peticion HTTP api/tasks
  /*const res = await fetch("http://localhost:3000/api/tasks")
  const data = await res.json();*/
}

// export const revalidate = 60; // Recarga la memoria cache cada cierto segundos que se le indique
export const dynamic = 'force-dynamic'; // Recarga todo por cada cambio que se haga (crear, actualizar, eliminar)

export default async function Home() {
  const tasks = await loadTasks();
  return (
    <main className="container mx-auto">
      <h1 className="text-center my-6 text-6xl">Tareas</h1>
      <section className="grid grid-cols-3 gap-3">
        {
          tasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))
        }
      </section>
    </main>
  )
}
