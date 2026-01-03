import React from 'react'
import { TaskForm } from './components/form-card';

const page = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return (
    <div className="flex justify-center items-center m-4">
      <TaskForm/>
    </div>
  );
}

export default page