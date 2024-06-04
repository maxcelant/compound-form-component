import { FormControl, Grid, TextField, Button, InputLabel, MenuItem, Select, Radio, FormControlLabel, RadioGroup as RG, Box } from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { createContext, useContext, useEffect, useState } from "react";
import { DropdownProps, FormComponentProps, FormContextProps, FormProps, InputFieldProps, RadioGroupProps, RowProps, SubmitProps } from './types';
import makeDefaultValues from './makeDefaultValues';
import toCapital from './toCapital';
import { CmdbAppShortName } from '../Mock/CmdbAppShortName';

const FormContext = createContext<Partial<FormContextProps>>({});

function Form({ children, schema }: FormProps) {
  const { handleSubmit, control, formState, watch } = useForm<yup.InferType<typeof schema>>({
    defaultValues: makeDefaultValues(schema),
    mode: 'onChange',
    shouldUnregister: true,
    resolver: yupResolver(schema),
  });

  console.log(JSON.stringify(watch(), null, 2))
  
  return (
    <FormContext.Provider value={{ handleSubmit, control, formState, schema }}>
      { children }
    </FormContext.Provider>
  )
}

function Input({ name, options, size = 6 }: InputFieldProps) {
  const { control, schema } = useContext(FormContext);

  if (!schema) return null;

  if (!(name in schema.fields)) {
    throw new Error(`Invalid field name: ${name.toString()}`);
  }

  return (
    <Grid item xs={12} sm={12} md={size} style={{ marginTop: '10px' }}>
      <FormControl variant="outlined" fullWidth>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <TextField 
              aria-label={`${name.toString().toLowerCase()}-textfield` }
              label={toCapital(name)} 
              id={name}
              fullWidth 
              required
              {...options}
              {...field}
            />
          )}
        />
      </FormControl>
    </Grid>
  );
}

function Row({ spacing = 2, children }: RowProps) {
  return (
    <Grid container spacing={spacing} direction="row">
      { children }
    </Grid>
  )
}

function Dropdown({ name, items, options, size = 6 }: DropdownProps) {
  const { control, schema } = useContext(FormContext);
  if (!schema) return null;
  if (!(name in schema.fields)) {
    throw new Error(`Invalid field name: ${name.toString()}`);
  }

  return (
    <Grid item xs={12} sm={12} md={size} style={{ marginTop: '10px' }}>
      <FormControl variant="outlined" fullWidth required>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <>
              <InputLabel htmlFor={`${name}-dropdown`}>{toCapital(name)}</InputLabel>
              <Select
                id={`${name}-dropdown`}
                inputProps={{ 'aria-label': `${name}-dropdown` }}
                label={name}
                {...field}
                {...options}
              >
                {items.map((item: any) => (
                  <MenuItem
                    key={item.value}
                    value={item.value}
                    aria-label={`${name}-option-${item.value.toLowerCase()}`}
                  >
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </>
          )}
        />
      </FormControl>
    </Grid>
  )
}

function ShortName({ name, size = 6 }: FormComponentProps) {
  const { control, schema } = useContext(FormContext);

  if (!schema) return null;

  if (!(name in schema.fields)) {
    throw new Error(`Invalid field name: ${name.toString()}`);
  }
  
  return (
    <Grid item xs={12} sm={12} md={size} style={{ marginTop: '10px' }}>
      <FormControl variant="outlined" fullWidth required>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange } }) => (
            <CmdbAppShortName
              onChange={value => onChange(value.shortName)}
              onBlur={() => {}}
              required
            />
          )}
        />
      </FormControl>
    </Grid>
  )
}

function RadioGroup({ name, items, options, size = 6, direction = 'column' }: RadioGroupProps) {
  const { control, schema } = useContext(FormContext);

  if (!schema) return null;

  if (!(name in schema.fields)) {
    throw new Error(`Invalid field name: ${name.toString()}`);
  }

  return (
    <Grid item xs={12} sm={12} md={size} style={{ marginTop: '10px' }}>
      <FormControl variant="outlined" fullWidth required>
        <Controller name={name} control={control} render={({ field }) => (
          <RG aria-label={name} {...field} {...options}>
            <Box display="flex" flexDirection={direction}>
              {items.map((item: any) => (
                <FormControlLabel
                  key={item.value}
                  value={item.value}
                  control={<Radio />}
                  label={item.name}
                />
              ))}
            </Box>
          </RG>
        )} />
      </FormControl>
    </Grid>
  )
}

function Submit({ onSubmit, title = 'Submit', options }: SubmitProps) {
  const { handleSubmit, formState } = useContext(FormContext);

  if (!handleSubmit || !formState) return null;

  return (
    <Button 
      disabled={!formState.isValid} 
      onClick={handleSubmit(onSubmit)}
      style={{ marginTop: '20px' }}
      {...options} 
    >
      { title }
    </Button>
  );
}

Form.Input      = Input;
Form.Dropdown   = Dropdown;
Form.Row        = Row;
Form.RadioGroup = RadioGroup;
Form.ShortName  = ShortName;
Form.Submit     = Submit; 

export default Form;
