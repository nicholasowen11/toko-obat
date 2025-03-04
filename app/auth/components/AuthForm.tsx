"use client"; // Menandakan ini adalah Client Component

import SignInForm from "./SignInForm";
import SignUpForm from './SignUpForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function AuthForm() {
    return (
        <div className="w-full space-y-5">
          <div className="flex justify-center mb-10">
            <h1 className="text-3xl font-bold font-serif">Toko Magic 888</h1>
          </div>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">SignIn</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
              <SignInForm />
            </TabsContent>
            <TabsContent value="register">
              <SignUpForm />
            </TabsContent>
          </Tabs>
        </div>
      );
}
