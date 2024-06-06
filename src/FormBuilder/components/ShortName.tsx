import { Grid, FormControl } from "@material-ui/core";
import { useContext } from "react";
import { Controller } from "react-hook-form";
import { CmdbAppShortName } from "../../Mock/CmdbAppShortName";
import FormContext from "../FormContext";
import { ObjectLike, ShortNameProps } from "../types";


export function FormShortName<T extends ObjectLike>({ name, size = 4 }: ShortNameProps<T>) {
  const { control, schema } = useContext(FormContext);
  if (!schema) return null;

  return (
    <Grid item xs={12} sm={size} md={size} style={{ margin: '10px 0px' }}>
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
