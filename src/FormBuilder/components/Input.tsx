import { Grid, FormControl, TextField, Box } from "@material-ui/core";
import React, { useContext } from "react";
import { Controller } from "react-hook-form";
import FormContext from "../FormContext";
import { InputFieldProps, ObjectLike } from "../types";
import { toCapital } from "../utils";


export function FormInput<T extends ObjectLike>({ name, options, children, size = 4 }: InputFieldProps<T>) {
  const { control, schema } = useContext(FormContext)
  if (!schema) return null;

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
            <Box display="flex" alignItems="center">
              <TextField 
                aria-label={`${name.toString().toLowerCase()}-textfield`}
                label={toCapital(name)}
                id={name}
                fullWidth
                required
                error={fieldState.error ? true : false}
                helperText={fieldState.error ? fieldState.error.message : null}
                {...defaultOptions}
                {...field}
              />
              {children && ( 
                <Box ml={1}>
                  {children}
                </Box>
              )}
            </Box>
          )}
        />
      </FormControl>
    </Grid>
  );
}
