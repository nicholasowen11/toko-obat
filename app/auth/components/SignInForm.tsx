import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { signInWithEmailAndPassword } from "../actions";

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: "Password is Required",
  }),
});

export default function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true); // Matikan loading setelah selesai

    const result = await signInWithEmailAndPassword(data);

    const parsedResult =
      typeof result === "string" ? JSON.parse(result) : result;

    function getErrorMessage(error: any): string {
      if (error.code === "invalid_credentials") {
        return "Invalid email or password.";
      }
      if (error.status === 400) {
        return "Bad request. Please check your input.";
      }
      return "An unknown error occurred. Please try again.";
    }

    if (parsedResult.error) {
      const errorMessage = getErrorMessage(parsedResult.error);
      toast("something wrong with inputs:", {
        // variant: "destructive ",
        description: errorMessage,
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    } else {
      toast("You submitted the following values:", {
        description: "Successfully Login",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    }
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="example@gmail.com"
                  {...field}
                  type="email"
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="password"
                  {...field}
                  type="password"
                  onChange={field.onChange}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        {isLoading ? (
          <Button type="submit" className="w-full flex gap-2">
            SignIn
            <AiOutlineLoading3Quarters className={cn("animate-spin")} />
          </Button>
        ) : (
          <Button type="submit" className="w-full flex gap-2">
            SignIn
          </Button>
        )}
      </form>
    </Form>
  );
}