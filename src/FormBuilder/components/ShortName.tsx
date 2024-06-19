import { Grid, FormControl } from "@material-ui/core";
import React, { useContext } from "react";
import { Controller } from "react-hook-form";
import FormContext from "../FormContext";
import { ObjectLike, ShortNameProps } from "../types";
import { CmdbAppShortName } from "../../../components/CmdbAppShortName/CmdbAppShortName";
import { componentGridStyle } from "../styles";

/**
 * Cmdb App Short Name subcomponent
 * @param name your schema field name
 * @param onBlur your blur setting for the picker.
 * @param size optional size of the component
 */
export function FormShortName<T extends ObjectLike>({ name, onBlur = (() => {}), size = 4 }: ShortNameProps<T>) {
  const { ctx } = useContext(FormContext);
  return (
    <Grid item xs={12} sm={12} md={size} style={componentGridStyle}>
      <FormControl aria-label='form-shortname' variant="outlined" fullWidth required>
        <Controller
          name={name}
          control={ctx.control}
          render={({ field: { onChange } }) => (
            <CmdbAppShortName
              onChange={value => onChange(value.shortName)}
              onBlur={onBlur}
              required
              width={(Number(size) * 200)}
            />
          )}
        />
      </FormControl>
    </Grid>
  )
}
