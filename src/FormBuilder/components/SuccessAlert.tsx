import { Grid } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useContext } from "react";
import FormContext from "../FormContext";
import { SuccessAlertProps } from "../types";
import { componentGridStyle } from "../styles";

/**
 * Creates a Success Alert subcomponent
 * @param message text to display in the alert
 * @param style optional style object
 * @param size optional size of the component
 */
export function FormSuccessAlert({ message, style, size = 12 }: SuccessAlertProps) {
  const { state } = useContext(FormContext);
  if (!(state.status === 'success')) return <></>
  return (
    <Grid item xs={12} sm={12} md={size} style={componentGridStyle}>
      <Alert severity="success" aria-label="success-message" style={style}>
        {message}
      </Alert>
    </Grid>
  )
}
