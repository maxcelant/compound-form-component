import { Grid, FormControl, InputLabel, Select, MenuItem, Box } from "@material-ui/core";
import React, { useContext } from "react";
import { Controller } from "react-hook-form";
import FormContext from "../FormContext";
import { DropdownProps, ObjectLike } from "../types";
import { toCapital } from "../utils";
import { ToolTip } from "./ToolTip";

export function FormDropdown<T extends ObjectLike>({ name, items, options, tooltipMessage, size = 4 }: DropdownProps<T>) {
  const { control, schema } = useContext(FormContext);
  if (!schema) return null;
  
  return (
    <Grid item xs={12} sm={size} md={size} style={{ margin: '10px 0px' }}>
      <FormControl variant="outlined" fullWidth required>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <>
              <InputLabel htmlFor={`${name}-dropdown`}>{toCapital(name)}</InputLabel>
              <Box display="flex" alignItems="center">
                <Select
                  id={`${name}-dropdown`}
                  inputProps={{ 'aria-label': `${name}-dropdown` }}
                  label={name}
                  {...field}
                  {...options}
                  fullWidth // Ensure the Select takes up available space
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
                {tooltipMessage && ( 
                  <Box ml={1}>
                    <ToolTip message={tooltipMessage} />
                  </Box>
                )}
              </Box>
            </>
          )}
        />
      </FormControl>
    </Grid>
  )
}
