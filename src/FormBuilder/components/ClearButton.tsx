import { Button, ButtonProps, Grid } from "@material-ui/core";
import React, { useContext } from "react";
import { makeDefaultValues } from "../utils";
import FormContext from "../FormContext";
import { DefaultButtonProps } from "../types";

const clearButtonDefaults = {
  options: {
    variant: 'outlined',
    fullWidth: true,
    color: 'secondary',
  } as ButtonProps,
  style: {
    marginTop: '20px',
  } as React.CSSProperties,
};

export function FormClearButton({ title = 'Clear', size = 4, style, options }: DefaultButtonProps) {
  const { reset, schema } = useContext(FormContext);
  if(!reset || !schema) return null;

  const handleReset = () => reset(makeDefaultValues(schema));

  return (
    <Grid item xs={12} sm={size} md={size} style={{ margin: '10px 0px' }}>
      <Button 
        onClick={handleReset}
        style={{ ...clearButtonDefaults.style, ...style }}
        {...{ ...clearButtonDefaults.options, ...options }}
      >
        { title }
      </Button>
    </Grid>
  );
}
