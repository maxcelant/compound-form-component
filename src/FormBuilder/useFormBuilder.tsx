import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useMemo, useState } from "react";
import * as yup from 'yup'
import { CurrentFormState, FormProps, InferType } from './types';
import { makeDefaultValues } from './utils';
import FormContext from './FormContext';
import { FormBlock, FormErrorAlert, FormInput, FormDropdown, FormRow, FormRadioGroup, FormClearButton, FormSubmitButton, FormSuccessAlert, FormShortName, FormDivider, FormToolTip, FormDynamicList, FormAutoComplete, FormDynamicText } from './components';
import { useTheme } from '@material-ui/core';

/**
 * Dynamic form builder for creating forms with validation
 * Please head to the Runway documentation for more information
 * @link https://developer.aa.com/docs/default/component/runway/runway-squad-docs/form-builder/overview/
 * @param schema your yup custom schema
 */
export default function useFormBuilder<T extends yup.ObjectSchema<any>>(schema: T) {

  const containerStyle = {
    backgroundColor: useTheme().palette.background.paper,
    padding: 15,
    borderRadius: 5,
    maxWidth: '1500px'
  }

  function Form({ children }: FormProps) {
    let ctx = useForm<InferType<T>>({
      defaultValues: makeDefaultValues(schema),
      mode: 'onChange',
      shouldUnregister: true,
      resolver: yupResolver(schema),
    });

    ctx = useMemo(() => ctx, [ctx]);
  
    const [state, setState] = useState<CurrentFormState>({ status: 'init' });

    return (
      <FormContext.Provider value={{ ctx, schema, state, setState }}>
        <div style={containerStyle}>
          { children }
        </div>
      </FormContext.Provider>
    )
  }

  Form.ToolTip      = FormToolTip;
  Form.Divider      = FormDivider;
  Form.Block        = FormBlock;
  Form.SuccessAlert = FormSuccessAlert;
  Form.ErrorAlert   = FormErrorAlert
  Form.Row          = FormRow;
  Form.ClearButton  = FormClearButton;
  Form.SubmitButton = FormSubmitButton<InferType<T>>; 
  Form.DynamicText  = FormDynamicText<InferType<T>>;
  Form.DynamicList  = FormDynamicList<InferType<T>>;
  Form.Input        = FormInput<InferType<T>>;
  Form.Dropdown     = FormDropdown<InferType<T>>;
  Form.RadioGroup   = FormRadioGroup<InferType<T>>;
  Form.ShortName    = FormShortName<InferType<T>>;
  Form.AutoComplete = FormAutoComplete<InferType<T>>;

  return Form;
}

