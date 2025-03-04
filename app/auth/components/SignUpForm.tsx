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
import { signUpWithEmailAndPassword } from "../actions";
import { useState } from "react";

const FormSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    confirm: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    role: z.enum(["user", "admin"]),
  })
  .refine((data) => data.confirm === data.password, {
    message: "Password did not match",
    path: ["confirm"],
  });

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm: "",
      role: "user",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);

    // Kirim data sign-up dengan role
    const result = await signUpWithEmailAndPassword({
      email: data.email,
      password: data.password,
      role: data.role,
    });

    const { error } = JSON.parse(result);

    if (error?.message) {
      // **Gunakan react-hook-form setError agar pesan error tampil merah**
      form.setError("email", {
        type: "manual",
        message: error.message, // Pesan error akan muncul di bawah input email
      });

      toast.error("Signup failed", {
        description: error.message,
      });

      setIsLoading(false);
      return;
    }

    toast.success("Successfully Signed Up", {
      description: "You can now log in.",
    });

    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        {/* Input Email */}
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

        {/* Input Password */}
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

        {/* Confirm Password */}
        <FormField
          control={form.control}
          name="confirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Confirm Password"
                  {...field}
                  type="password"
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Pilihan Role */}
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="w-full border p-2 rounded"
                  onChange={field.onChange}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        {isLoading ? (
          <Button type="submit" className="w-full flex gap-2">
            Register
            <AiOutlineLoading3Quarters className={cn("animate-spin")} />
          </Button>
        ) : (
          <Button type="submit" className="w-full flex gap-2">
            Register
          </Button>
        )}
      </form>
    </Form>
  );
}