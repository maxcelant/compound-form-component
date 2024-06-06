import { Grid, FormControl, TextField } from "@material-ui/core";
import React, { useContext } from "react";
import { Controller } from "react-hook-form";
import FormContext from "../FormContext";
import { InputFieldProps } from "../types";
import { toCapital } from "../utils";


export function FormInput({ name, options, size = 4 }: InputFieldProps) {
  const { control, schema } = useContext(FormContext)
  if (!schema) return null;
  if (!(name in schema.fields)) {
    throw new Error(`Invalid field name: ${name.toString()}`);
  }

  let defaultOptions = options;
  if ((options && !('variant' in options)) || (!options)) {
    defaultOptions = { ...options, variant: 'outlined' };
  }

  return (
    <Grid item xs={12} sm={size} md={size} style={{ margin: '10px 0px' }}>
      <FormControl variant="outlined" fullWidth>
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState }) => (
            <TextField 
              aria-label={`${name.toString().toLowerCase()}-textfield` }
              label={toCapital(name)} 
              id={name}
              fullWidth 
              required
              error={fieldState.error ? true : false}
              helperText={fieldState.error ? fieldState.error.message : null}
              {...defaultOptions}
              {...field}
            />
          )}
        />
      </FormControl>
    </Grid>
  );
}
