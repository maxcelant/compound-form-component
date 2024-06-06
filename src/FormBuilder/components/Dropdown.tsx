import { Grid, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import React, { useContext } from "react";
import { Controller } from "react-hook-form";
import FormContext from "../FormContext";
import { DropdownProps } from "../types";
import { toCapital } from "../utils";


export function FormDropdown({ name, items, options, size = 4 }: DropdownProps) {
  const { control, schema } = useContext(FormContext);
  if (!schema) return null;
  if (!(name in schema.fields)) {
    throw new Error(`Invalid field name: ${name.toString()}`);
  }

  return (
    <Grid item xs={12} sm={size} md={size} style={{ marginTop: '10px' }}>
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
