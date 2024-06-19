import { Grid, FormControl, TextField, Box, Button } from "@material-ui/core";
import React, { useState, useContext } from "react";
import { Controller } from "react-hook-form";
import FormContext from "../FormContext";
import { DynamicListProps, ObjectLike } from "../types";
import { toCapital } from "../utils";
import * as yup from 'yup';
import { componentGridStyle, toolTipChildStyle } from "../styles";

/**
  * Creates an Dynamic List subcomponent
  * @param name - name of the field
  * @param title - title of the field
  * @param buttonTitle - title of the button
  * @param options - options for the field
  * @param children - children for the field
  * @param size - size of the field
  */
export function FormDynamicList<T extends ObjectLike>({ name, title, buttonTitle = 'Add', options, children, size = 4 }: DynamicListProps<T>) {
  const { ctx, schema } = useContext(FormContext);
  const [input, setInput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const validateInput = async (value: string) => {
    try {
      const arraySchema = schema.fields[name as keyof T] as yup.ArraySchema<any, any>;
      const stringSchema = arraySchema.innerType as yup.StringSchema;
      await stringSchema.validate(value.trim());
      setError(null);
    } catch (validationError: any) {
      setError(validationError.message);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    validateInput(value);
  };

  const handleAddClick = (field: any) => {
    if (error || input.trim() === '') return;
    field.onChange([...field.value, input.trim()]);
    setInput('');
  };

  return (
    <Grid item xs={12} sm={12} md={size} style={componentGridStyle}>
      <FormControl variant="outlined" fullWidth>
      <Controller
          name={name}
          control={ctx.control}
          render={({ field }) => (
            <Box display="flex" alignItems="center">
              <TextField 
                aria-label={`${name.toString().toLowerCase()}-textfield`}
                label={title || toCapital(name)}
                id={name}
                fullWidth
                required
                error={error ? true : false}
                helperText={error}
                {...{ variant: 'standard', ...options }}
                value={input}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
              />
              <Button 
                onClick={() => handleAddClick(field)}
                variant="outlined"
                style={{ margin: '0px 0px 10px 10px', height: '40px', whiteSpace: 'nowrap', flexGrow: 1, padding: '0px 20px' }}
              >{ buttonTitle }</Button>
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
