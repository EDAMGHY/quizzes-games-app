"use client";

import { Form as CForm } from "@/components/ui/form";
import { FC } from "react";
import { IForm } from "@/types";
import { cn } from "@/lib/utils";

export const Form: FC<IForm> = ({ form, onSubmit, children, className }) => {
  return (
    <CForm {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-8", className)}
      >
        {children}
      </form>
    </CForm>
  );
};
