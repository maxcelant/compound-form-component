import { Grid, FormControl } from "@material-ui/core";
import { useContext } from "react";
import { Controller } from "react-hook-form";
import { CmdbAppShortName } from "../Mock/CmdbAppShortName";
import FormContext from "./FormContext";
import { FormComponentProps } from "./types";


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

export default ShortName;