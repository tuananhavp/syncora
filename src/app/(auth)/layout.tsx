import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center align-middle min-h-screen">
      <div className="flex justify-center items-center min-w-md">{children}</div>
    </div>
  );
};

export default layout;
