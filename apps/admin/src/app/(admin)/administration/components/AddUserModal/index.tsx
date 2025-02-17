"use client";

import { FormAlert } from "@/components/FormAlert";
import { FormItem } from "@/components/FormItem";
import { zodResolver } from "@hookform/resolvers/zod";
import { Role } from "@prisma/client";
import { Button, Form, Input, Modal, Select } from "antd";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { useServerAction } from "zsa-react";
import { useRoleOptions } from "../../hooks/useRoleOptions";
import { useAdministrationContext } from "../../providers/AdministrationProvider";
import { addUserAction } from "./add-user-action";
import { FormValues, defaultValues, schema } from "./add-user-config";

export const AddUserModal = () => {
  const t = useTranslations("Administration");
  const { showAddUserModal, setShowAddUserModal } = useAdministrationContext();
  const roleOptions = useRoleOptions();

  const {
    control,
    handleSubmit,
    reset: resetForm,
  } = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(schema(useTranslations())),
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
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <FormItem required control={control} name="email" label={t("form.email.label")}>
          <Input type="email" placeholder={t("form.email.palceholder")} autoFocus />
        </FormItem>

        <FormItem required control={control} name="role" label={t("form.role.label")}>
          <Select options={roleOptions} />
        </FormItem>

        <FormAlert type="error" message={error?.message} />

        <Button htmlType="submit" className="hidden" />
      </Form>
    </Modal>
  );
};
