"use client";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

const LogOut: React.FC = () => {
  const { data } = authClient.useSession();

  const handleLogOut = async () => {
    await authClient.signOut();
    redirect("/login");
  };

  return (
    <>
      {data && (
        <Button variant="destructive" onClick={handleLogOut}>
          Log Out
        </Button>
      )}
    </>
  );
};

export default LogOut;
