import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from "react";
import * as yup from 'yup'
import { CurrentFormState, FormProps } from './types';
import { makeDefaultValues } from './utils';
import FormContext from './FormContext';
import { FormBlock, FormErrorAlert, FormInput, FormDropdown, FormRow, FormRadioGroup, FormClearButton, FormSubmitButton, FormSuccessAlert, FormShortName, FormDivider } from './components';

export type InferType<T extends yup.ObjectSchema<any>> = yup.InferType<T>;

function FormBuilder<T extends yup.ObjectSchema<any>>(schema: T) {
  
  function Form({ children }: FormProps) {
    const { handleSubmit, control, formState, reset, watch } = useForm<InferType<T>>({
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
  Form.Input        = FormInput<InferType<T>>;
  Form.Dropdown     = FormDropdown;
  Form.Row          = FormRow;
  Form.RadioGroup   = FormRadioGroup;
  Form.ShortName    = FormShortName;
  Form.ClearButton  = FormClearButton;
  Form.SubmitButton = FormSubmitButton; 

  return Form;
}

export default FormBuilder;
