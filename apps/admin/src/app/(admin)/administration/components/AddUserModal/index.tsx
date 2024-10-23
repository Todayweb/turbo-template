"use client";

import { FormAlert } from "@/components/FormAlert";
import { FormItem } from "@/components/FormItem";
import { createFormData } from "@/utils/createFormData";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Role } from "@prisma/client";
import { Form, Input, Modal, Select } from "antd";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { useAdministrationContext } from "../../providers/AdministrationProvider";
import { addUserAction } from "./addUserAction";
import { addUserSchema } from "./addUserSchema";

type FormValues = z.output<ReturnType<typeof addUserSchema>>;

const roleOptions: { value: Role; label: string }[] = [
  { value: "admin", label: "Admin" },
  { value: "editor", label: "Editor" },
];

export const AddUserModal = () => {
  const { showAddUserModal, setShowAddUserModal } = useAdministrationContext();
  const t = useTranslations("Administration");

  const [isPending, startTransition] = useTransition();
  const [formState, formAction] = useFormState(addUserAction, null);

  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      email: "",
      role: "admin",
    },
    resolver: zodResolver(addUserSchema(t)),
  });

  const onModalClose = () => {
    setShowAddUserModal(false);
    reset();
  };

  const onSubmit = async (data: FormValues) => {
    startTransition(async () => {
      formAction(createFormData(data));
    });

    onModalClose();
  };

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

        <FormAlert message={formState?.error} />
      </Form>
    </Modal>
  );
};
