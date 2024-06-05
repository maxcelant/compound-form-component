import { Grid, Box } from "@material-ui/core";

function Block({ size = 4 }: any) {
  return (
    <Grid item xs={12} sm={12} md={size} style={{ marginTop: '10px' }}>
      <Box style={{ flexGrow: 1, height: '100%' }} />
    </Grid>
  );
}

export default Block;
