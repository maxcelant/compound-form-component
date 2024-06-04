import { Grid } from "@material-ui/core";
import { RowProps } from "./types";

function Row({ spacing = 2, children }: RowProps) {
  return (
    <Grid container spacing={spacing} direction="row">
      { children }
    </Grid>
  )
}

export default Row;