import { Grid } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useContext } from "react";
import FormContext from "../FormContext";
import { GridSizeProps } from "../types";

export function FormErrorAlert({ size = 12 }: GridSizeProps) {
  const { state } = useContext(FormContext);
  if (!state) return null;
  if (!(state.status === 'error')) return <></>
  return (
    <Grid item xs={12} sm={size} md={size} style={{ margin: '10px 0px' }}>
      <Alert severity="error" aria-label="error-message">
        {state.message}
      </Alert>
    </Grid>
  )
}
