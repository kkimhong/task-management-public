import { Spinner } from "@/components/ui/spinner";
import React from "react";

const Loading = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Spinner className="size-24" />
    </div>
  );
};

export default Loading;
