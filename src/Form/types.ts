import { FormState, Control, UseFormHandleSubmit } from 'react-hook-form';
import { ButtonProps, GridSize, GridSpacing, SelectProps, TextFieldProps } from '@material-ui/core';
import { Dispatch, ReactNode, SetStateAction } from "react";
import * as yup from 'yup';

export interface FormContextProps {
  handleSubmit: UseFormHandleSubmit<any>;
  control: Control<any>;
  formState: FormState<any>;
  schema: yup.ObjectSchema<any>;
  state: CurrentFormState;
  setState: Dispatch<SetStateAction<CurrentFormState>>;
};

export type CurrentFormState = {  status: 'init' | 'loading' | 'success' } | { status: 'error', message: string };

export type ObjectLike = Record<string, any>;

export interface FormProps {
  children: ReactNode[];
  schema: yup.ObjectSchema<any>;
};

export interface FormComponentProps {
  name: string;
  size?: GridSize; 
};

export interface AlertProps {
  size?: GridSize;
}

export interface SuccessAlertProps extends AlertProps {
  message: string;
}

export interface InputFieldProps extends FormComponentProps {
  options?: TextFieldProps;
};

export type ListItem = {
  name: string;
  value: string | number | boolean
};

export interface FormItemComponent<TOptions extends ObjectLike> extends FormComponentProps {
  items: ListItem[];
  options?: TOptions;
}

export type DropdownProps = FormItemComponent<SelectProps>;

export interface RadioGroupProps extends FormItemComponent<RadioGroupProps> {
  direction?: 'row' | 'column'
}

export type RowProps = {
  children: ReactNode[]
  spacing?: GridSpacing;
};

export type SubmitProps = {
  title?: string;
  onSubmit: (data: ObjectLike) => Promise<any>;
  options?: ButtonProps;
};