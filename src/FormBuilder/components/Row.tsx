import React from "react";
import { Grid } from "@material-ui/core";
import { RowProps } from "../types";

/**
 * Creates a row element for your form
 * @param spacing optional spacing between items
 * @param children children components
 */
export function FormRow({ children, spacing = 2 }: RowProps) {
  return (
    <Grid aria-label='form-row' container spacing={spacing} direction="row">
      { children }
    </Grid>
  )
}
