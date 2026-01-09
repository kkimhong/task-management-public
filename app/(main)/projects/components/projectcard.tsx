import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import React from "react";

export interface ProjectProps {
  id: string;
  name: string;        // From db.json
  description: string; // From db.json
  tasksCompleted: number;
  tasksTotal: number;  // From db.json
  color: string;       // From db.json
  dueDate: string;
}

const ProjectCard = ({ project }: { project: ProjectProps }) => {
  const progressPercent = (project.tasksCompleted / project.tasksTotal) * 100;

  return (
    <Card className="rounded-xl border border-gray-300 shadow-none overflow-hidden">
      {/* Reduced padding from pb-4 to pb-2 */}
      <CardHeader className="space-y-1 pt-4 px-5 pb-2">
        <div className="flex items-center gap-2.5">
          {/* Dot size matched to photo */}
          <span className={`h-2.5 w-2.5 rounded-full ${project.color}`} />
          <CardTitle className="text-[15px] font-bold leading-none">{project.name}</CardTitle>
        </div>
        <p className="text-[14px] text-gray-500 line-clamp-1">
          {project.description}
        </p>
      </CardHeader>

      {/* Reduced space-y-6 to space-y-3 to shrink height */}
      <CardContent className="space-y-3 px-5 ">
        <div className="space-y-1.5">
          <div className="flex justify-between items-end text-[13px]">
            <span className="text-gray-400">Progress</span>
            <span className="font-bold text-black">
              {project.tasksCompleted}/{project.tasksTotal} tasks
            </span>
          </div>
          <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-black transition-all duration-500" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
        <hr />
        <div className="flex items-center justify-between pt-1">
          {/* Overlapping Avatars fallback */}
          <div className="flex -space-x-1.5">
            {["JD", "AM", "SL"].map((member, index) => (
              <div
                key={index}
                className="h-5 w-5 rounded-full border-2 border-white flex items-center justify-center text-[7px] font-bold text-white bg-[#8b5cf6]"
              >
                {member}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-1 text-[11px] text-gray-400">
            <Calendar className="h-3 w-3" />
            {project.dueDate}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;