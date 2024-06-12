import { Grid, FormControl, TextField, Box, Button } from "@material-ui/core";
import React, { useState, useContext } from "react";
import { Controller } from "react-hook-form";
import FormContext from "../FormContext";
import { InputFieldProps, ObjectLike } from "../types";
import { toCapital } from "../utils";


export function FormDynamicList<T extends ObjectLike>({ name, options, children, size = 4 }: InputFieldProps<T>) {
  const { ctx } = useContext(FormContext);
  const [value, setValue] = useState<string>('');
  if (!ctx) return null;

  const handleAddClick = (field: any) => {
    if (value.trim() !== '') {
      field.onChange([...field.value, value.trim()]);
      setValue('');
    }
  };

  return (
    <Grid item xs={12} sm={size} md={size} style={{ margin: '10px 0px' }}>
      <FormControl variant="outlined" fullWidth>
      <Controller
          name={name}
          control={ctx.control}
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
                {...{ variant: 'outlined', ...options }}
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <Button 
                onClick={() => handleAddClick(field)}
              >Add</Button>
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
