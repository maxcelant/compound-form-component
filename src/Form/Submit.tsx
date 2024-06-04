import { Button } from "@material-ui/core";
import { useContext } from "react";
import FormContext from "./FormContext";
import { SubmitProps } from "./types";

function Submit({ onSubmit, title = 'Submit', options }: SubmitProps) {
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
    <Button 
      disabled={state.status === 'loading' || !formState.isValid} 
      onClick={submitWrapper}
      style={{ marginTop: '20px' }}
      {...options} 
    >
      { title }
    </Button>
  );
}

export default Submit;