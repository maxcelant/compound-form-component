import React from "react";
import { Grid, Box } from "@material-ui/core";
import { BaseProps } from "../types";
import { componentGridStyle } from "../styles";

const blockDefaults = {
  style: {
    flexGrow: 1,
    height: '100%',
  } as React.CSSProperties,
}

/**
 * Creates a block element for your form
 * @param size size of the block
 * @param style optional style object
 */
export function FormBlock({ size = 4, style }: BaseProps) {
  return (
    <Grid item xs={12} sm={12} md={size} style={componentGridStyle}>
      <Box aria-label='form-block' style={{ ...blockDefaults.style, ...style }} />
    </Grid>
  );
}

