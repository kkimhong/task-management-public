/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from "next/link";

// 1. Define the props correctly for Next.js 15
interface PageProps {
  params: Promise<{ id: string }>;
}

async function getProjectData(id: string) {
  try {
    // 2. Fetch specific project by ID
    const projectRes = await fetch(`http://localhost:3001/projects/${id}`, { cache: 'no-store' });
    
    // 3. Fetch tasks filtered by projectId
    const tasksRes = await fetch(`http://localhost:3001/tasks?projectId=${id}`, { cache: 'no-store' });

    if (!projectRes.ok) return null;

    const project = await projectRes.json();
    const tasks = await tasksRes.json();

    return { project, tasks };
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

export default async function ProjectDetails({ params }: PageProps) {
  // 4. Await the params to get the ID
  const { id } = await params;
  const data = await getProjectData(id);

  if (!data) {
    return (
      <div className="p-8">
        <h1 className="text-xl font-bold">Project not found</h1>
        <p className="text-gray-500">Could not find project with ID: {id}</p>
        <Link href="/" className="text-blue-500 underline mt-4 block">Back to Dashboard</Link>
      </div>
    );
  }

  const { project, tasks } = data;

  // Calculate task counts for the UI
  const totalTasks = tasks.length;
  const completed = tasks.filter((t: any) => t.status === "done").length;
  const inProgress = tasks.filter((t: any) => t.status === "in-progress").length;
  const todo = tasks.filter((t: any) => t.status === "todo").length;

  return (
    <div className="p-8 w-full space-y-8">
      {/* Breadcrumbs */}
      <nav className="flex text-sm text-gray-500 gap-2 items-center">
        <span>Projects</span>
        <span className="text-gray-300">/</span>
        <span className="text-black font-medium">{project.name}</span>
      </nav>

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl bg-pink-100`}>
          <div className={`h-8 w-8 rounded-lg ${project.color}`} />
        </div>
        <div>
          <h1 className="text-xl font-bold">{project.name}</h1>
          <p className="text-gray-500">{project.description}</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Tasks", val: totalTasks },
          { label: "Completed", val: completed },
          { label: "In Progress", val: inProgress },
          { label: "To Do", val: todo }
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center">
            <div className="text-4xl font-bold mb-1">{stat.val}</div>
            <div className="text-gray-400 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Task List */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
          <h2 className="font-bold text-lg">Tasks</h2>
          <div className="flex gap-6 text-sm font-medium">
            <button className="text-black border-b-2 border-black pb-1">All</button>
            <button className="text-gray-400">Active</button>
            <button className="text-gray-400">Completed</button>
          </div>
        </div>
        <div className="divide-y divide-gray-50">
          {tasks.map((task: any) => (
            <div key={task.id} className="px-6 py-4 flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <input 
                  type="checkbox" 
                  checked={task.status === "done"} 
                  readOnly 
                  className="h-5 w-5 rounded border-gray-300 accent-black"
                />
                <span className={`text-[15px] ${task.status === "done" ? "line-through text-gray-400" : "text-gray-700"}`}>
                  {task.title}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider
                  ${task.status === 'done' ? 'bg-emerald-50 text-emerald-600' : 
                    task.status === 'in-progress' ? 'bg-orange-50 text-orange-600' : 
                    'bg-gray-50 text-gray-500'}`}>
                  {task.status.replace('-', ' ')}
                </span>
                <div className="h-7 w-7 rounded-full bg-purple-600 flex items-center justify-center text-[10px] text-white font-bold">
                  JD
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}