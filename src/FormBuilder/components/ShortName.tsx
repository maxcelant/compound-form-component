import { Grid, FormControl } from "@material-ui/core";
import { useContext } from "react";
import { Controller } from "react-hook-form";
import { CmdbAppShortName } from "../../Mock/CmdbAppShortName";
import FormContext from "../FormContext";
import { FieldName, ObjectLike } from "../types";


export function FormShortName<T extends ObjectLike>({ name, size = 4 }: FieldName<T>) {
  const { ctx } = useContext(FormContext);
  if (!ctx) return null;

  return (
    <Grid item xs={12} sm={size} md={size} style={{ margin: '10px 0px' }}>
      <FormControl variant="outlined" fullWidth required>
        <Controller
          name={name}
          control={ctx.control}
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
