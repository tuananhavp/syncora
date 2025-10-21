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
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const loginScheme = z.object({
  email: z.email(),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginScheme>;
const Login = () => {
  const navigate = useRouter();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginScheme),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form;
  const onSubmit = async (values: LoginFormValues) => {
    const { email, password } = values;
    await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onSuccess: () => {
          toast.success("Logged in successfully!");
          navigate.push("/");
        },
        onError: (ctx) => {
          toast.error(`Error: ${ctx.error.message}`);
        },
      }
    );
  };
  return (
    <div className="flex justify-center align-middle min-h-screen">
      <div className="flex justify-center items-center min-w-md">
        <Card className="w-full p-4 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-xl ">Log in to your account</CardTitle>
            <CardDescription>Enter your email below to login to your account</CardDescription>
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

                <Button
                  type="submit"
                  variant={"outline"}
                  disabled={isSubmitting}
                  className="shadow-md"
                >
                  {isSubmitting ? "Logging in..." : "Log in"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center items-center">
            <CardDescription>
              Don't have an account?{"   "}
              <Link href="/register" className="text-blue-600">
                Register
              </Link>
            </CardDescription>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
