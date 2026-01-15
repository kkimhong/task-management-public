/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ProjectCard from "./components/projectcard";
// 1. Correct the Link import (it should be from 'next/link')
import Link from "next/link";
// 2. Import your data from the db.json file
import data from "@/db.json";

const Page = async () => {
  // 3. Extract the projects array from the imported data
  const projects = data.projects;

  await new Promise((resolve) => setTimeout(resolve, 200));

  return (
    <div className="p-4 space-y-4">
      {projects.map((project: any) => (
        <Link
          href={`/projects/${project.id}`}
          key={project.id}
          className="block"
        >
          <ProjectCard project={project} />
        </Link>
      ))}
    </div>
  );
};

export default Page;
