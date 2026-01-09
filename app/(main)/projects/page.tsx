import React from 'react'

const page = async () => {
  await new Promise(resolve => setTimeout(resolve, 200))
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