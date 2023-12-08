import { bindActionCreators } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { actions as authActions } from "../app/slices/auth.slice";
import { actions as notesActions } from "../app/slices/main.slice";

const rootActions = {
  ...authActions,
  ...notesActions,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};
