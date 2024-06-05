import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from "react";
import * as yup from 'yup'
import { CurrentFormState, FormProps } from './types';
import { makeDefaultValues } from './utils';
import FormContext from './FormContext';
import ErrorAlert from './ErrorAlert';
import SuccessAlert from './SuccessAlert';
import Input from './Input';
import Row from './Row';
import Dropdown from './Dropdown';
import RadioGroup from './RadioGroup';
import ShortName from './ShortName';
import SubmitButton from './SubmitButton';
import ClearButton from './ClearButton';


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

Form.SuccessAlert = SuccessAlert;
Form.ErrorAlert   = ErrorAlert
Form.Input        = Input;
Form.Dropdown     = Dropdown;
Form.Row          = Row;
Form.RadioGroup   = RadioGroup;
Form.ShortName    = ShortName;
Form.ClearButton  = ClearButton;
Form.SubmitButton = SubmitButton; 

export default Form;
