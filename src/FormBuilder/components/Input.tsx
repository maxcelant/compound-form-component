import { Grid, FormControl, TextField, Box } from "@material-ui/core";
import React, { useContext } from "react";
import { Controller } from "react-hook-form";
import FormContext from "../FormContext";
import { InputFieldProps, ObjectLike } from "../types";
import { toCapital } from "../utils";
import { componentGridStyle, toolTipChildStyle } from "../styles";

/**
 * Creates an Input subcomponent
 * @param name your schema field name
 * @param title your schema field title
 * @param style optional style object
 * @param options optional options object
 * @param children optional children components
 * @param size optional size of the component
 */
export function FormInput<T extends ObjectLike>({ name, title, style, options, children, size = 4 }: InputFieldProps<T>) {
  const { ctx } = useContext(FormContext)
  return (
    <Grid item xs={12} sm={12} md={size} style={componentGridStyle}>
      <FormControl variant="outlined" fullWidth>
      <Controller
          name={name}
          control={ctx.control}
          render={({ field, fieldState }) => (
            <Box display="flex" alignItems="center">
              <TextField 
                aria-label={`${name.toString().toLowerCase()}-textfield`}
                label={title || toCapital(name)}
                id={name}
                fullWidth
                required
                error={fieldState.error ? true : false}
                helperText={fieldState.error ? fieldState.error.message : null}
                style={style}
                {...{ variant: 'outlined', ...options }}
                {...field}
              />
              {children && ( 
                <Box ml={1} style={toolTipChildStyle}>
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
