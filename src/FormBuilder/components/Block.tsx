import React from "react";
import { Grid, Box } from "@material-ui/core";
import { BaseProps } from "../types";

export function FormBlock({ size = 4 }: BaseProps) {
  return (
    <Grid item xs={12} sm={size} md={size} style={{ margin: '10px 0px' }}>
      <Box style={{ flexGrow: 1, height: '100%' }} />
    </Grid>
  );
}

