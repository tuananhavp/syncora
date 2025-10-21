import Register from "@/features/auth/register";
import { requireUnAuth } from "@/lib/auth-utils";
import React from "react";

const page = async () => {
  await requireUnAuth();
  return <Register />;
};

export default page;
