import { Button, ButtonProps, Grid } from "@material-ui/core";
import React, { useContext } from "react";
import { makeDefaultValues } from "../utils";
import FormContext from "../FormContext";
import { DefaultButtonProps } from "../types";
import { componentGridStyle } from "../styles";

const clearButtonDefaults = {
  options: {
    variant: 'outlined',
    fullWidth: true,
  } as ButtonProps,
  style: {
    marginTop: '20px',
  } as React.CSSProperties,
};

/**
 * Button to clear the form
 * @param title text to display on the button
 * @param size size of the button
 * @param style optional style object
 * @param options optional options object
 */
export function FormClearButton({ title = 'Clear', size = 4, style, options }: DefaultButtonProps) {
  const { ctx, schema } = useContext(FormContext);

  const handleReset = () => ctx.reset(makeDefaultValues(schema));

  return (
    <Grid item xs={12} sm={12} md={size} style={componentGridStyle}>
      <Button 
        aria-label="btn-clear-form"
        onClick={handleReset}
        style={{ ...clearButtonDefaults.style, ...style }}
        {...{...clearButtonDefaults.options, ...options}} 
      >
        { title }
      </Button>
    </Grid>
  );
}
