"use client";

import { FormAlert } from "@/components/FormAlert";
import { FormItem } from "@/components/FormItem";
import { routes } from "@/config/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Form, Input } from "antd";
import { useTranslations } from "next-intl";
import { redirect, useSearchParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { useServerAction } from "zsa-react";
import { AuthBackButton } from "../../components/AuthBackButton";
import { AuthContainer } from "../../components/AuthContainer";
import { AuthHeading } from "../../components/AuthHeading";
import { resetPasswordCallbackAction } from "./reset-password-callback-action";
import { FormValues, defaultValues, schema } from "./reset-password-callback-config";

export default function ResetPassword() {
  const t = useTranslations("Auth");

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const { isPending, execute, error, isSuccess } = useServerAction(resetPasswordCallbackAction);

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(schema(useTranslations())),
  });

  const onSubmit = (data: FormValues) => execute({ ...data, token });

  if (!token) redirect(routes.resetPassword);

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

            <FormAlert type="error" message={error?.message} />

            {isSuccess && (
              <FormAlert type="success" message={t("passwordReset.resetPasswordCallbackSuccess")} />
            )}

            <Button type="primary" htmlType="submit" loading={isPending} disabled={isSuccess} block>
              {t("passwordReset.resetPassword")}
            </Button>
          </Form>
        </Card>

        <AuthBackButton>{t("passwordReset.backToSignIn")}</AuthBackButton>
      </AuthContainer>
    </>
  );
}
