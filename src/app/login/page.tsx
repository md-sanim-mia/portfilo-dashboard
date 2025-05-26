"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { jwtDecode } from "jwt-decode";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { loginUser } from "@/services/Auth";

interface LoginResponse {
  data: {
    accessToken: string;
  };
}

const LoginPage = () => {
  const form = useForm<FieldValues>();
  const router = useRouter();
  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = (await loginUser(data)) as LoginResponse;
      console.log(res);
      if (res?.data?.accessToken) {
        const token = res.data.accessToken;
        const user = jwtDecode(token);
        console.log(user);
        toast.success("User successfully logged in!");
        router.push("dashboard");
      } else {
        toast.error("Invalid response from server.");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
        console.error(error);
      } else {
        toast.error("An unknown error occurred.");
        console.error("Unknown error:", error);
      }
    }
  };

  return (
    <div className="flex justify-center ">
      <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-md w-full   p-5">
        <div className="flex items-center space-x-4 mb-6">
          <div>
            <h1 className="text-xl font-semibold">Login</h1>
            <p className="font-extralight text-sm text-gray-600">
              Welcome back!
            </p>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="mt-5 cursor-pointer w-full">
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
