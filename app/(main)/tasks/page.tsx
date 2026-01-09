import React from 'react'
import { DataTableDemo } from '../data-table';

const page = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return (
    <DataTableDemo/>
  );
}

export default page