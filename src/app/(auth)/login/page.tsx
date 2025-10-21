import Login from "@/features/auth/login";
import { requireUnAuth } from "@/lib/auth-utils";
import React from "react";

const page = async () => {
  await requireUnAuth();
  return <Login></Login>;
};

export default page;
