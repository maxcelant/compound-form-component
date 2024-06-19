import { Grid, FormControl, Box, TextField } from "@material-ui/core";
import React, { useContext } from "react";
import { Controller } from "react-hook-form";
import FormContext from "../FormContext";
import { AutoCompleteProps, ListItem, ObjectLike } from "../types";
import { toCapital } from "../utils";
import { Autocomplete } from "@material-ui/lab";
import { componentGridStyle, toolTipChildStyle } from "../styles";

/**
 * Creates an Autocomplete subcomponent
 * @param name your schema field name
 * @param title your schema field title
 * @param items an array of objects with a name and value property
 * @param style optional style object
 * @param options optional options object
 * @param children optional children components
 * @param size optional size of the component
 */
export function FormAutoComplete<T extends ObjectLike>({ name, title, items, style, options, children, size = 4 }: AutoCompleteProps<T>) {
  const { ctx } = useContext(FormContext);
  return (
    <Grid item xs={12} sm={12} md={size} style={componentGridStyle}>
      <FormControl variant="outlined" fullWidth required>
        <Controller
          name={name}
          control={ctx.control}
          render={({ field }) => (
            <>
              <Box display="flex" alignItems="center">
                <Autocomplete
                  id={`${name}-autocomplete`}
                  options={items}
                  getOptionLabel={(option: ListItem) => option.name}
                  onChange={(_, value: ListItem) => field.onChange(value?.value || '')}
                  fullWidth
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={title || toCapital(name)}
                      variant="outlined"
                      fullWidth
                      required
                      style={style}
                    />
                  )}
                  {...options}
                />
                {children && (
                  <Box ml={1} style={toolTipChildStyle}>
                    {children}
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
