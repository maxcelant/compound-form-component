import { Grid, FormControl, Box, FormControlLabel, Radio, RadioGroup as RG } from "@material-ui/core";
import React, { useContext } from "react";
import { Controller } from "react-hook-form";
import FormContext from "../FormContext";
import { ObjectLike, RadioProps } from "../types";
import { ToolTip } from "./ToolTip";


export function FormRadioGroup<T extends ObjectLike>({ name, items, options, tooltipMessage, size = 4, direction = 'column' }: RadioProps<T>) {
  const { control, schema } = useContext(FormContext);
  if (!schema) return null;
  return (
    <Grid item xs={12} sm={size} md={size} style={{ margin: '10px 0px' }}>
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
              {tooltipMessage && ( 
                  <Box ml={1}>
                    <ToolTip message={tooltipMessage} />
                  </Box>
                )}
            </Box>
          </RG>
          )} />
      </FormControl>
    </Grid>
  )
}
