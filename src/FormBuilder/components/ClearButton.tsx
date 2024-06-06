import { Button, Grid } from "@material-ui/core";
import React, { useContext } from "react";
import { makeDefaultValues } from "../utils";
import FormContext from "../FormContext";
import { DefaultButtonProps } from "../types";

export function FormClearButton({ title = 'Clear', size = 4, options }: DefaultButtonProps) {
  const { reset, schema } = useContext(FormContext);
  if(!reset || !schema) return null;

  const handleReset = () => reset(makeDefaultValues(schema));

  let defaultOptions = options;
  if ((options && !('color' in options)) || (!options)) {
    defaultOptions = { ...options, color: 'secondary' };
  }

  return (
    <Grid item xs={12} sm={size} md={size} style={{ margin: '10px 0px' }}>
      <Button 
        onClick={handleReset}
        style={{ marginTop: '20px' }}
        {...defaultOptions} 
      >
        { title }
      </Button>
    </Grid>
  );
}
