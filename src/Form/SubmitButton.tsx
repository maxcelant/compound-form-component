import { Button, Grid } from "@material-ui/core";
import { useContext } from "react";
import FormContext from "./FormContext";
import { SubmitButtonProps } from "./types";

function SubmitButton({ onSubmit, title = 'Submit', size = 6, options }: SubmitButtonProps) {
  const { handleSubmit, formState, state, setState } = useContext(FormContext);
  if (!handleSubmit || !formState || !setState || !state) return null;

  const submitWrapper = handleSubmit(async (data) => {
    setState((prev) => ({ ...prev, status: 'loading' }));
    try {
      await onSubmit(data);
      setState((prev) => ({ ...prev, status: 'success' }));
    } catch (e: any) {
      setState((prev) => ({ ...prev, status: 'error', message: e.message }));
    }
  });

  return (
    <Grid item xs={12} sm={12} md={size} style={{ marginTop: '10px' }}>
      <Button 
        disabled={state.status === 'loading' || !formState.isValid} 
        onClick={submitWrapper}
        style={{ marginTop: '20px' }}
        {...options} 
      >
        { title }
      </Button>
    </Grid>
  );
}

export default SubmitButton;