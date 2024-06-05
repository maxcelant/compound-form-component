import { Grid, FormControl, TextField } from "@material-ui/core";
import { useContext } from "react";
import { Controller } from "react-hook-form";
import FormContext from "./FormContext";
import { InputFieldProps } from "./types";
import { toCapital } from "./utils";


function Input({ name, options, size = 4 }: InputFieldProps) {
  const { control, schema } = useContext(FormContext);
  if (!schema) return null;
  if (!(name in schema.fields)) {
    throw new Error(`Invalid field name: ${name.toString()}`);
  }

  if ((options && !('variant' in options)) || (!options)) options = { ...options, variant: 'outlined' };

  return (
    <Grid item xs={12} sm={12} md={size} style={{ marginTop: '10px' }}>
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
              {...options}
              {...field}
            />
          )}
        />
      </FormControl>
    </Grid>
  );
}

export default Input;