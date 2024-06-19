import { Grid } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useContext } from "react";
import FormContext from "../FormContext";
import { BaseProps } from "../types";
import { componentGridStyle } from "../styles";

/**
 * Creates an Error Alert subcomponent
 * @param style optional style object
 * @param size optional size of the component
 */
export function FormErrorAlert({ style, size = 12 }: BaseProps) {
  const { state } = useContext(FormContext);
  if (!(state.status === 'error')) return <></>
  return (
    <Grid item xs={12} sm={12} md={size} style={componentGridStyle}>
      <Alert 
        severity="error" 
        aria-label="error-message"
        style={{ ...style }}
      >
          {state.message}
      </Alert>
    </Grid>
  )
}
