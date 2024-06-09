"use client";

import { Button, H1, Paragraph, Input } from "@/components/ui";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Form as CForm } from "@/components/widgets";

import { Wrapper } from "@/components/widgets";
import { cn, loginFormSchema } from "@/lib/utils";
import { ILoginFormSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const form = useForm<ILoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: any) => {
    signIn("resend", data);
  };

  return (
    <Wrapper className='flex justify-center items-center h-full'>
      <div className='w-full max-w-md mx-auto'>
        <H1 className='text-center border-none pb-0'>Login to your account</H1>
        <Paragraph className='pb-6 !mt-2 text-center dark:text-gray-400 text-gray-600'>
          Enter your email below to create your account
        </Paragraph>
        <div className='flex flex-col gap-4 w-full'>
          <Button
            size='lg'
            onClick={() => signIn("google")}
            className='flex gap-3'
          >
            <FaGoogle size={18} />
            Sign In with Google
          </Button>
          <div className='relative mt-2'>
            <div className='absolute inset-0 flex items-center'>
              <span className='w-full border-t'></span>
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='bg-background px-2 text-muted-foreground'>
                Or continue with
              </span>
            </div>
          </div>

          <CForm {...{ form, onSubmit }} className={cn("space-y-8")}>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter Email...' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit' className='w-full'>
              Sign up with magic link
            </Button>
          </CForm>
        </div>
      </div>
    </Wrapper>
  );
};

export default Login;
