import { Alert, AlertTitle } from "@material-ui/lab";
import React, { useContext } from "react"
import { useWatch } from "react-hook-form";
import FormContext from "../FormContext";
import { Grid } from "@material-ui/core";
import { componentGridStyle } from "../styles";
import { DynamicTextProps, ObjectLike } from "../types";

export function FormDynamicText<T extends ObjectLike>({ title, renderCallback, severity = 'info', style, size = 12}: DynamicTextProps<T>) {
  const { ctx } = useContext(FormContext);
  const control = ctx.control;
  return (
    <Grid item xs={12} sm={12} md={size} style={componentGridStyle}>
      <Alert aria-label="dynamic-text-title" severity={severity} style={style}>
        <span>
          <AlertTitle>{ title }</AlertTitle>
          <b aria-label="dynamic-text">{renderCallback(useWatch({ control }))}</b>
        </span>
      </Alert>
    </Grid>
  );
}