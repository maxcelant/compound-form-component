import { Grid, FormControl, Box, FormControlLabel, Radio, RadioGroup as RG, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { Controller } from "react-hook-form";
import FormContext from "../FormContext";
import { ObjectLike, RadioProps } from "../types";
import { toCapital } from "../utils";
import { toolTipChildStyle } from "../styles";

/**
 * Creates a RadioGroup subcomponent
 * @param name your schema field name
 * @param title your schema field title
 * @param items an array of objects with a name and value property
 * @param style optional style object
 * @param options optional options object
 * @param children optional children components
 * @param size optional size of the component
 * @param direction optional direction of the component
*/
export function FormRadioGroup<T extends ObjectLike>({ name, title, items, style, options, children, size = 4, direction = 'column' }: RadioProps<T>) {
  const { ctx } = useContext(FormContext);
  return (
    <Grid item xs={12} sm={12} md={size} style={{ paddingLeft: '15px' }}>
      <FormControl variant="outlined" fullWidth required>
        <Typography style={{ fontWeight: 500 }}>{title || toCapital(name)}</Typography>
        <Controller name={name} control={ctx.control} render={({ field }) => (
          <RG aria-label={name} {...field} {...options}>
            <Box display="flex" flexDirection={direction}>
              {items.map((item: any) => (
                <FormControlLabel
                  key={item.value}
                  value={item.value}
                  control={<Radio style={{...style, color: '#3A72AC' }}/>}
                  label={item.name}
                />
              ))}
              {children && ( 
                  <Box ml={1} style={toolTipChildStyle}>
                    { children }
                  </Box>
                )}
            </Box>
          </RG>
          )} />
      </FormControl>
    </Grid>
  )
}
