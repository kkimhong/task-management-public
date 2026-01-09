/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import ProjectCard from "./components/projectcard";

async function getProjects() {
  const res = await fetch('http://localhost:3001/projects', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
}

export default async function Page() {
  const projects = await getProjects();

  return (
    // 'space-y-4' adds a 16px gap between each card
    <div className="p-4 space-y-4 "> 
      {projects.map((project: any) => (
        // Adding 'className="block"' prevents the "link icon" issue
        <Link href={`/projects/${project.id}`} key={project.id} className="block">
          <ProjectCard project={project} />
        </Link>
      ))}
    </div>
  );
}