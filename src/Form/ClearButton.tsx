import { Button, Grid } from "@material-ui/core";
import { useContext } from "react";
import { makeDefaultValues } from "./utils";
import FormContext from "./FormContext";
import { DefaultButtonProps } from "./types";

function ClearButton({ title = 'Clear', size = 4, options }: DefaultButtonProps) {
  const { reset, schema } = useContext(FormContext);
  if(!reset || !schema) return null;

  const handleReset = () => reset(makeDefaultValues(schema));

  if ((options && !('color' in options)) || (!options)) options = { ...options, color: 'secondary' };

  return (
    <Grid item xs={12} sm={12} md={size} style={{ marginTop: '10px' }}>
      <Button 
        onClick={handleReset}
        style={{ marginTop: '20px' }}
        {...options} 
      >
        { title }
      </Button>
    </Grid>
  );
}

export default ClearButton;