import { Button, ButtonProps, Grid } from "@material-ui/core";
import React, { useContext } from "react";
import FormContext from "../FormContext";
import { SubmitButtonProps } from "../types";

const submitButtonDefaults = {
  options: {
    variant: 'outlined',
    fullWidth: true,
    color: 'primary',
  } as ButtonProps,
  style: {
    marginTop: '20px',
  } as React.CSSProperties,
};

export function FormSubmitButton({ onSubmit, title = 'Submit', size = 4, style, options }: SubmitButtonProps) {
  const { ctx, state, setState } = useContext(FormContext);
  if (!ctx || !setState || !state) return null;

  const submitWrapper = ctx.handleSubmit(async (data) => {
    setState((prev) => ({ ...prev, status: 'loading' }));
    try {
      await onSubmit(data);
      setState((prev) => ({ ...prev, status: 'success' }));
    } catch (e: any) {
      setState((prev) => ({ ...prev, status: 'error', message: e.message }));
    }
  });

  return (
    <Grid item xs={12} sm={size} md={size} style={{ margin: '10px 0px' }}>
      <Button 
        disabled={state.status === 'loading' || !ctx.formState.isValid} 
        onClick={submitWrapper}
        style={{ ...submitButtonDefaults.style, ...style }}
        {...{...submitButtonDefaults.options, ...options}} 
      >
        { title }
      </Button>
    </Grid>
  );
}
