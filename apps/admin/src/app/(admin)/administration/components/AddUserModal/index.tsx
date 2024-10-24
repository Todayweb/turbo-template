"use client";

import { FormAlert } from "@/components/FormAlert";
import { FormItem } from "@/components/FormItem";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Role } from "@prisma/client";
import { Form, Input, Modal, Select } from "antd";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { useServerAction } from "zsa-react";
import { useAdministrationContext } from "../../providers/AdministrationProvider";
import { addUserAction } from "./addUserAction";
import { type FormValues, useAddUserSchema } from "./useAddUserSchema";

const roleOptions: { value: Role; label: string }[] = [
  { value: "admin", label: "Admin" },
  { value: "editor", label: "Editor" },
];

export const AddUserModal = () => {
  const t = useTranslations("Administration");
  const { showAddUserModal, setShowAddUserModal } = useAdministrationContext();

  const schema = useAddUserSchema();

  const {
    control,
    handleSubmit,
    reset: resetForm,
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      role: "admin",
    },
    resolver: zodResolver(schema),
  });

  const onModalClose = () => {
    setShowAddUserModal(false);
    resetForm();
    resetAction();
  };

  const {
    isPending,
    execute,
    error,
    reset: resetAction,
  } = useServerAction(addUserAction, {
    onSuccess: () => onModalClose(),
  });

  const onSubmit = (data: FormValues) => execute(data);

  return (
    <Modal
      title={t("addUser.title")}
      open={showAddUserModal}
      onOk={handleSubmit(onSubmit)}
      confirmLoading={isPending}
      onCancel={onModalClose}
      closable={false}
      maskClosable={false}
    >
      <Form layout="vertical">
        <FormItem required control={control} name="email" label={t("addUser.form.email.label")}>
          <Input type="email" placeholder={t("addUser.form.email.palceholder")} autoFocus />
        </FormItem>

        <FormItem required control={control} name="role" label={t("addUser.form.role.label")}>
          <Select options={roleOptions} />
        </FormItem>

        <FormAlert message={error?.message} />
      </Form>
    </Modal>
  );
};
