"use client";

import { FormAlert } from "@/components/FormAlert";
import { FormItem } from "@/components/FormItem";
import { routes } from "@/config/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Flex, Form, Input } from "antd";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useServerAction } from "zsa-react";
import { AuthContainer, AuthHeading } from "../components";
import { signInAction } from "./signInAction";
import { FormValues, defaultValues, schema } from "./signInConfig";

export default function SignIn() {
  const t = useTranslations("Auth");

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(schema(useTranslations())),
  });

  const { isPending, execute, error } = useServerAction(signInAction);

  const onSubmit = (data: FormValues) => execute(data);

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
                <Flex align="center" justify="space-between" className="w-full">
                  <span>{t("signIn.form.password.label")}</span>
                  <Link href={routes.resetPassword} tabIndex={-1}>
                    {t("signIn.forgotPassword")}
                  </Link>
                </Flex>
              }
              labelCol={{ className: "[&_label]:w-full [&_label]:after:m-0" }}
            >
              <Input.Password
                autoComplete="current-password"
                autoCapitalize="off"
                placeholder={t("signIn.form.password.palceholder")}
              />
            </FormItem>

            <FormAlert type="error" message={error?.message} />

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
