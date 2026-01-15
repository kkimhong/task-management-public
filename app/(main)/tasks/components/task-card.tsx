import { Badge } from "@/components/ui/badge";

const TaskCard = () => {
  return (
    <div className="w-full max-w-xs border rounded-xl p-4">
      <div className="flex flex-col space-y-2">
        <Badge className="bg-green-600 px-3 py-1">Easy</Badge>
        <h1 className="text-lg font-semibold">
          Wireframing min screen for mobile app
        </h1>
        <p className="border-b py-2">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam qui
          esse maxime, fuga quis nihil.
        </p>
      </div>
      <h1 className="text-gray-400 text-xs text-right pt-2">27-12-2025</h1>
    </div>
  );
};

export default TaskCard;
