"use client";

import { FormItem } from "@/components/FormItem";
import { routes } from "@/config/routes";
import { createFormData } from "@/utils/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Button, Card, Form, Input } from "antd";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useTransition } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { AuthContainer, AuthHeading } from "../components";
import { signInAction } from "./signInAction";
import { signInSchema } from "./signInSchema";

type FormValues = z.output<ReturnType<typeof signInSchema>>;

export default function SignIn() {
  const t = useTranslations("Auth");
  const [isPending, startTransition] = useTransition();
  const [formState, formAction] = useFormState(signInAction, null);

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signInSchema(t)),
  });

  const onSubmit = (data: FormValues) => {
    startTransition(async () => {
      formAction(createFormData(data));
    });
  };

  return (
    <>
      <AuthHeading>{t("signIn.title")}</AuthHeading>

      <AuthContainer>
        <Card>
          <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
            <FormItem required control={control} name="email" label={t("signIn.form.email.label")}>
              <Input
                type="email"
                autoComplete="username"
                placeholder={t("signIn.form.email.palceholder")}
                autoFocus
              />
            </FormItem>

            <FormItem
              required
              control={control}
              name="password"
              label={
                <div className="flex w-full items-center justify-between">
                  {t("signIn.form.password.label")}
                  <Link href={routes.resetPassword} tabIndex={-1}>
                    {t("signIn.forgotPassword")}
                  </Link>
                </div>
              }
              labelCol={{ className: "[&_label]:w-full [&_label]:after:m-0" }}
            >
              <Input.Password
                autoComplete="current-password"
                autoCapitalize="off"
                placeholder={t("signIn.form.password.palceholder")}
              />
            </FormItem>

            {!!formState?.error && (
              <Form.Item>
                <Alert type="error" message={formState.error} showIcon />
              </Form.Item>
            )}

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={isPending}>
                {t("signIn.button")}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </AuthContainer>
    </>
  );
}
