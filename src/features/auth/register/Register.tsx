"use client";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Github } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const RegisterScheme = z
  .object({
    email: z.email(),
    password: z.string().min(1, "Password is required"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof RegisterScheme>;
const Register = () => {
  const navigate = useRouter();
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterScheme),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form;
  const onSubmit = async (values: RegisterFormValues) => {
    const { email, password } = values;
    await authClient.signUp.email(
      {
        name: email,
        email,
        password,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          toast.success("Registered successfully!");
          navigate.push("/");
        },
        onError: (ctx) => {
          toast.error(`Error: ${ctx.error.message}`);
        },
      }
    );
  };
  return (
    <Card className="w-full p-4 shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-xl ">Let's get you started</CardTitle>
        <CardDescription>Enter your email below to create a new account</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 mb-4">
          <Button
            className="flex-1 border-2"
            variant="outline"
            type="submit"
            disabled={isSubmitting}
          >
            <Image src="google.svg" alt="Google" width={12} height={12} /> Google
          </Button>

          <Button
            className="flex-1 bg-[#0d1117]"
            variant="default"
            type="submit"
            disabled={isSubmitting}
          >
            <Github /> Github
          </Button>
        </div>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
            <FormField
              control={control}
              name="email"
              render={({ field: { onChange } }) => {
                return (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" type="email" onChange={onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            ></FormField>

            <FormField
              control={control}
              name="password"
              render={({ field: { onChange } }) => {
                return (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="*********" type="password" onChange={onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            ></FormField>

            <FormField
              control={control}
              name="confirmPassword"
              render={({ field: { onChange } }) => {
                return (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input placeholder="*********" type="password" onChange={onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            ></FormField>
            <Button variant={"default"} type="submit" className="shadow-md" disabled={isSubmitting}>
              Register
            </Button>
          </form>
          <FormMessage />
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center items-center">
        <CardDescription>
          Already have an account?{"   "}
          <Link href="/login" className="text-blue-600">
            Log in
          </Link>
        </CardDescription>
      </CardFooter>
    </Card>
  );
};

export default Register;
