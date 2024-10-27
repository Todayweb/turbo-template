"use client";

import { FormAlert } from "@/components/FormAlert";
import { FormItem } from "@/components/FormItem";
import { MailOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Form, Input } from "antd";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { useServerAction } from "zsa-react";
import { AuthBackButton } from "../components/AuthBackButton";
import { AuthContainer } from "../components/AuthContainer";
import { AuthHeading } from "../components/AuthHeading";
import { resetPasswordAction } from "./reset-password-action";
import { FormValues, defaultValues, schema } from "./reset-password-config";

export default function ResetPassword() {
  const t = useTranslations("Auth");

  const { isPending, execute, isSuccess, error } = useServerAction(resetPasswordAction);

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues,
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
              name="email"
              label={t("passwordReset.form.email.label")}
            >
              <Input
                type="email"
                autoComplete="username"
                placeholder={t("passwordReset.form.email.palceholder")}
              />
            </FormItem>

            <FormAlert type="error" message={error?.message} />

            <Button type="primary" htmlType="submit" disabled={isSuccess} loading={isPending} block>
              {t("passwordReset.resetPasswordSend")}
            </Button>

            {isSuccess && (
              <FormAlert
                type="success"
                message={t("passwordReset.resetPasswordSuccess")}
                icon={<MailOutlined />}
              />
            )}
          </Form>
        </Card>

        <AuthBackButton>{t("passwordReset.backToSignIn")}</AuthBackButton>
      </AuthContainer>
    </>
  );
}
