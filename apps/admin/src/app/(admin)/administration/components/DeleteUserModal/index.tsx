"use client";

import { FormAlert } from "@/components/FormAlert";
import { Modal, Typography } from "antd";
import { useTranslations } from "next-intl";
import { useServerAction } from "zsa-react";
import { useAdministrationContext } from "../../providers/AdministrationProvider";
import { deleteUserAction } from "./delete-user-action";

export const DeleteUserModal = () => {
  const t = useTranslations("Administration");

  const {
    showDeleteUserModal,
    setShowDeleteUserModal,
    selectedRow = { key: "", email: "" },
    resetSelectedRows,
  } = useAdministrationContext();

  const { isPending, execute, error, reset } = useServerAction(deleteUserAction, {
    onSuccess: () => {
      setShowDeleteUserModal(false);
      resetSelectedRows();
    },
  });

  const onClose = () => {
    setShowDeleteUserModal(false);
    reset();
  };

  const onSubmit = () => execute({ id: selectedRow.key });

  return (
    <Modal
      title={t("deleteUser.title")}
      open={showDeleteUserModal}
      onOk={onSubmit}
      confirmLoading={isPending}
      onCancel={onClose}
      destroyOnClose
    >
      <Typography.Text>{t("deleteUser.body", { email: selectedRow.email })}</Typography.Text>
      <FormAlert type="error" message={error?.message} className="mt-2" />
    </Modal>
  );
};
