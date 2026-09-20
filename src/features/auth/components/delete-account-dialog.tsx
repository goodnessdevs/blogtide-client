"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { PasswordInput } from "@/components/password-input";
import { deleteAccountSchema, type DeleteAccountInput } from "../schema";
import { useDeleteAccount } from "../api/use-auth";

export function DeleteAccountDialog() {
  const [open, setOpen] = useState(false);
  const del = useDeleteAccount();
  const form = useForm<DeleteAccountInput>({
    resolver: zodResolver(deleteAccountSchema),
    defaultValues: { password: "" },
  });
  const { errors } = form.formState;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="destructive" />}>
        <Trash2 data-icon="inline-start" />
        Delete account
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={form.handleSubmit((v) => del.mutate(v))} noValidate>
          <DialogHeader>
            <DialogTitle>Delete your account?</DialogTitle>
            <DialogDescription>
              This permanently removes your account and every post you have written. This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="my-4">
            <Field data-invalid={!!errors.password}>
              <FieldLabel htmlFor="delete_password">Confirm with your password</FieldLabel>
              <PasswordInput id="delete_password" autoComplete="current-password" aria-invalid={!!errors.password} {...form.register("password")} />
              <FieldError errors={[errors.password]} />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="destructive" disabled={del.isPending}>
              {del.isPending && <Loader2 className="animate-spin" data-icon="inline-start" />}
              Delete forever
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
