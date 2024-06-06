import { Button, Grid } from "@material-ui/core";
import React, { useContext } from "react";
import FormContext from "../FormContext";
import { SubmitButtonProps } from "../types";


export function FormSubmitButton({ onSubmit, title = 'Submit', size = 4, options }: SubmitButtonProps) {
  const { handleSubmit, formState, state, setState } = useContext(FormContext);
  if (!handleSubmit || !formState || !setState || !state) return null;

  const submitWrapper = handleSubmit(async (data) => {
    setState((prev) => ({ ...prev, status: 'loading' }));
    try {
      await onSubmit(data);
      setState((prev) => ({ ...prev, status: 'success' }));
    } catch (e: any) {
      setState((prev) => ({ ...prev, status: 'error', message: e.message }));
    }
  });

  let defaultOptions = options;
  if ((options && !('color' in options)) || (!options)) {
    defaultOptions = { ...options, color: 'primary' };
  }

  return (
    <Grid item xs={12} sm={size} md={size} style={{ margin: '10px 0px' }}>
      <Button 
        disabled={state.status === 'loading' || !formState.isValid} 
        onClick={submitWrapper}
        style={{ marginTop: '20px' }}
        {...defaultOptions} 
      >
        { title }
      </Button>
    </Grid>
  );
}
