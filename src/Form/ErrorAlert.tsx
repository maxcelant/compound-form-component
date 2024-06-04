import { Grid } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useContext } from "react";
import { AlertProps } from "./types";
import FormContext from "./FormContext";

function ErrorAlert({ size = 12 }: AlertProps) {
  const { state } = useContext(FormContext);
  if (!state) return null;
  if (!(state.status === 'error')) return <></>
  return (
    <Grid item xs={12} sm={12} md={size} style={{ marginTop: '10px' }}>
      <Alert severity="error" aria-label="error-message">
        {state.message}
      </Alert>
    </Grid>
  )
}

export default ErrorAlert;