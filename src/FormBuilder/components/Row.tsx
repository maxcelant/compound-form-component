import React from "react";
import { Grid } from "@material-ui/core";
import { RowProps } from "../types";

export function FormRow({ spacing = 2, children }: RowProps) {
  return (
    <Grid container spacing={spacing} direction="row">
      { children }
    </Grid>
  )
}
