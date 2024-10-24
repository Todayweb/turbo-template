"use client";

import {
  ActionAddButton,
  ActionBar,
  ActionDeleteButton,
  ActionItems,
  ActionUpdateButton,
} from "@/components/ActionBar";
import React from "react";
import { useAdministrationContext } from "../../providers/AdministrationProvider";

export const UserActionBar = () => {
  const { selectedRow, setShowAddUserModal, setShowDeleteUserModal, setShowUpdateUserModal } =
    useAdministrationContext();

  return (
    <ActionBar>
      <ActionItems>
        <ActionAddButton onClick={() => setShowAddUserModal(true)} />
        <ActionUpdateButton disabled={!selectedRow} onClick={() => setShowUpdateUserModal(true)} />
      </ActionItems>

      <ActionItems>
        <ActionDeleteButton disabled={!selectedRow} onClick={() => setShowDeleteUserModal(true)} />
      </ActionItems>
    </ActionBar>
  );
};
