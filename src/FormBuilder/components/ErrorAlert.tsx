import { Grid } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useContext } from "react";
import { AlertProps } from "../types";
import FormContext from "../FormContext";

export function FormErrorAlert({ size = 12 }: AlertProps) {
  const { state } = useContext(FormContext);
  if (!state) return null;
  if (!(state.status === 'error')) return <></>
  return (
    <Grid item xs={12} sm={size} md={size} style={{ marginTop: '10px' }}>
      <Alert severity="error" aria-label="error-message">
        {state.message}
      </Alert>
    </Grid>
  )
}
