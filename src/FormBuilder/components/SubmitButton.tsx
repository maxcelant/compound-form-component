import { Button, ButtonProps, Grid } from "@material-ui/core";
import React, { useContext } from "react";
import FormContext from "../FormContext";
import { ObjectLike, SubmitButtonProps } from "../types";
import { componentGridStyle } from "../styles";

const submitButtonDefaults = {
  options: {
    variant: 'contained',
    fullWidth: true,
    color: 'primary',
  } as ButtonProps,
  style: {
    marginTop: '20px',
  } as React.CSSProperties,
};

/**
 * Button to submit the form
 * @param onSubmit function to call when the form is submitted
 * @param title text to display on the button
 * @param size size of the button
 * @param style optional style object
 * @param options optional options object
 */
export function FormSubmitButton<T extends ObjectLike>({ onSubmit, title = 'Submit', size = 4, style, options }: SubmitButtonProps<T>) {
  const { ctx, state, setState } = useContext(FormContext);

  const submitWrapper = ctx.handleSubmit(async (data) => {
    setState(prev => ({ ...prev, status: 'loading' }));
    try {
      await onSubmit(data);
      setState(prev => ({ ...prev, status: 'success' }));
    } catch (e: any) {
      setState(prev => ({ ...prev, status: 'error', message: e.message }));
    }
  });

  return (
    <Grid item xs={12} sm={12} md={size} style={componentGridStyle}>
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
