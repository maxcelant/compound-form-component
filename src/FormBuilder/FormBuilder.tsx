import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from "react";
import * as yup from 'yup'
import { CurrentFormState, FormProps } from './types';
import { makeDefaultValues } from './utils';
import FormContext from './FormContext';
import { FormBlock, FormErrorAlert, FormInput, FormDropdown, FormRow, FormRadioGroup, FormClearButton, FormSubmitButton, FormSuccessAlert, FormShortName, FormDivider } from './components';

function Form({ children, schema }: FormProps) {
  const { handleSubmit, control, formState, reset, watch } = useForm<yup.InferType<typeof schema>>({
    defaultValues: makeDefaultValues(schema),
    mode: 'onChange',
    shouldUnregister: true,
    resolver: yupResolver(schema),
  });

  const [state, setState] = useState<CurrentFormState>({ status: 'init' })

  console.log(JSON.stringify(watch(), null, 2))
  
  return (
    <FormContext.Provider value={{ handleSubmit, control, formState, schema, reset, state, setState }}>
      { children }
    </FormContext.Provider>
  )
}

Form.Divider      = FormDivider;
Form.Block        = FormBlock;
Form.SuccessAlert = FormSuccessAlert;
Form.ErrorAlert   = FormErrorAlert
Form.Input        = FormInput;
Form.Dropdown     = FormDropdown;
Form.Row          = FormRow;
Form.RadioGroup   = FormRadioGroup;
Form.ShortName    = FormShortName;
Form.ClearButton  = FormClearButton;
Form.SubmitButton = FormSubmitButton; 

export default Form;
