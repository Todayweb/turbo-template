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
  const { selectedRow, setShowAddUserModal } = useAdministrationContext();

  return (
    <ActionBar>
      <ActionItems>
        <ActionAddButton onClick={() => setShowAddUserModal(true)} />
        <ActionUpdateButton disabled={!selectedRow} />
      </ActionItems>

      <ActionItems>
        <ActionDeleteButton disabled={!selectedRow} />
      </ActionItems>
    </ActionBar>
  );
};
