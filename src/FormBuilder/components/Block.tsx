import React from "react";
import { Grid, Box } from "@material-ui/core";

export function FormBlock({ size = 4 }: any) {
  return (
    <Grid item xs={12} sm={size} md={size} style={{ marginTop: '10px' }}>
      <Box style={{ flexGrow: 1, height: '100%' }} />
    </Grid>
  );
}

