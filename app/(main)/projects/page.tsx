import React from 'react'

const page = async () => {
  await new Promise(resolve => setTimeout(resolve, 200))
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="px-8 py-4 rounded-2xl border border-zinc-500 ">
        <h1 className="font-semibold">All Project</h1>
      </div>
    </div>
  );
}

export default page