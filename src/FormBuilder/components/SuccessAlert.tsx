import { Grid } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useContext } from "react";
import FormContext from "../FormContext";
import { SuccessAlertProps } from "../types";


export function FormSuccessAlert({ message, size = 12 }: SuccessAlertProps) {
  const { state } = useContext(FormContext);
  if (!state) return null;
  if (!(state.status === 'success')) return <></>
  return (
    <Grid item xs={12} sm={size} md={size} style={{ marginTop: '10px' }}>
      <Alert severity="success" aria-label="success-message">
        {message}
      </Alert>
    </Grid>
  )
}
