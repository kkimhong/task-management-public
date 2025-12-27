import React, { use } from "react";

const page = async ({ params }: {params : Promise<{id: number}>}) => {
  const paramValue = await params;
  await new Promise((resolve) => setTimeout(resolve, 500));
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="px-8 py-4 rounded-2xl border border-zinc-500">
        <h1 className="font-semibold">Task Id: {paramValue.id}</h1>
      </div>
    </div>
  );
};

export default page;
