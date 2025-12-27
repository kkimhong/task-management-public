import { resolve } from 'path';
import React from 'react'

type Props = {}

const page = async (props: Props) => {
  await new Promise(resolve => setTimeout(resolve, 500))
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="px-8 py-4 rounded-2xl border border-zinc-500 ">
        <h1 className="font-semibold">All Project</h1>
      </div>
    </div>
  );
}

export default page