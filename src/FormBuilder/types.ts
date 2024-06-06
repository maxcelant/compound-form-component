import { FormState, Control, UseFormHandleSubmit } from 'react-hook-form';
import { ButtonProps, GridSize, GridSpacing, RadioGroupProps, SelectProps, TextFieldProps } from '@material-ui/core';
import { Dispatch, ReactElement, ReactNode, SetStateAction } from "react";
import * as yup from 'yup';
import { FormToolTip } from './components';

export type InferType<T extends yup.ObjectSchema<any>> = yup.InferType<T>;

export interface FormContextProps {
  handleSubmit: UseFormHandleSubmit<any>;
  control: Control<any>;
  formState: FormState<any>;
  schema: yup.ObjectSchema<any>;
  reset: (values?: any, options?: any) => void;
  state: CurrentFormState;
  setState: Dispatch<SetStateAction<CurrentFormState>>;
};

export type CurrentFormState = {  status: 'init' | 'loading' | 'success' } | { status: 'error', message: string };

export type ObjectLike = Record<string, any>;

export interface FormProps {
  children: ReactNode[];
};

export type ToolTipElement = ReactElement<typeof FormToolTip>

export interface GridSizeProps {
  size?: GridSize;
}

export interface FieldName<T extends ObjectLike> extends GridSizeProps {
  name: keyof T & string;
}

interface ComponentProps<TOptions extends ObjectLike, TName extends ObjectLike> extends FieldName<TName> {
  options?: TOptions;
  children?: ToolTipElement;
}

export type InputFieldProps<TName extends ObjectLike> = ComponentProps<TextFieldProps, TName> 

interface ComponentWithItemsProps<TOptions extends ObjectLike, TName extends ObjectLike> extends ComponentProps<TOptions, TName> {
  items: ListItem[];
}

export type DropdownProps<TName extends ObjectLike> = ComponentWithItemsProps<SelectProps, TName>

export type RadioProps<TName extends ObjectLike> = ComponentWithItemsProps<RadioGroupProps, TName> & {
  direction?: 'row' | 'column'
};

export type ListItem = {
  name: string;
  value: string | number | boolean;
};

export type RowProps = {
  children: ReactNode[] | ReactNode;
  spacing?: GridSpacing;
};

export interface DefaultButtonProps extends GridSizeProps {
  title?: string;
  options?: ButtonProps;
};

export interface SuccessAlertProps extends GridSizeProps {
  message: string;
};

export interface SubmitButtonProps extends DefaultButtonProps {
  onSubmit: (data: ObjectLike) => Promise<any>;
};