import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const uuid = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const MIN_TITLE = 5;
const MIN_DESCRIPTION = 20;
const MIN_PASSWORD = 8;

export const formSchema = z.object({
  title: z.string().min(MIN_TITLE, {
    message: `Title must be at least ${MIN_TITLE} characters.`,
  }),
  description: z.string().min(MIN_DESCRIPTION, {
    message: `Title must be at least ${MIN_DESCRIPTION} characters.`,
  }),
  completed: z.boolean(),
});

export const loginFormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});
