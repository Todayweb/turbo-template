"use client";

import { FormAlert } from "@/components/FormAlert";
import { FormItem } from "@/components/FormItem";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Form, Input } from "antd";
import { useTranslations } from "next-intl";
import React from "react";
import { useForm } from "react-hook-form";
import { useServerAction } from "zsa-react";
import { AuthBackButton } from "../../components/AuthBackButton";
import { AuthContainer } from "../../components/AuthContainer";
import { AuthHeading } from "../../components/AuthHeading";
import { resetPasswordCallbackAction } from "./reset-password-callback-action";
import { FormValues, schema } from "./reset-password-callback-config";

export default function ResetPassword({
  searchParams,
}: {
  searchParams: { token?: string; email?: string };
}) {
  const t = useTranslations("Auth");
  const { token, email } = searchParams;

  const { isPending, execute, error } = useServerAction(resetPasswordCallbackAction);

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      password: "",
      passwordConfirm: "",
      token,
    },
    resolver: zodResolver(schema(useTranslations())),
  });

  const onSubmit = (data: FormValues) => execute(data);

  return (
    <>
      <AuthHeading>{t("passwordReset.resetPassword")}</AuthHeading>

      <AuthContainer>
        <Card>
          <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
            <FormItem
              required
              control={control}
              name="password"
              label={t("passwordReset.form.password.label")}
            >
              <Input.Password
                autoComplete="new-password"
                autoCapitalize="off"
                placeholder={t("passwordReset.form.password.palceholder")}
              />
            </FormItem>

            <FormItem
              required
              control={control}
              name="passwordConfirm"
              label={t("passwordReset.form.passwordConfirm.label")}
            >
              <Input.Password
                autoComplete="new-password"
                autoCapitalize="off"
                placeholder={t("passwordReset.form.passwordConfirm.palceholder")}
              />
            </FormItem>

            {email && (
              <input
                type="text"
                name="email"
                defaultValue={email}
                autoComplete="username"
                className="hidden"
              />
            )}

            <FormAlert type="error" message={error?.message} />

            <Button type="primary" htmlType="submit" loading={isPending} block>
              {t("passwordReset.resetPassword")}
            </Button>
          </Form>
        </Card>

        <AuthBackButton>{t("passwordReset.backToSignIn")}</AuthBackButton>
      </AuthContainer>
    </>
  );
}
