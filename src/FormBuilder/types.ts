import { UseFormReturn } from 'react-hook-form';
import { ButtonProps, GridSize, GridSpacing, IconButtonProps, RadioGroupProps, SelectProps, TextFieldProps } from '@material-ui/core';
import { Dispatch, ReactElement, ReactNode, SetStateAction } from "react";
import { FormToolTip } from './components';
import * as yup from 'yup';
import { AutocompleteProps, Color } from '@material-ui/lab';

export type InferType<T extends yup.ObjectSchema<any>> = yup.InferType<T>;

export interface FormContextProps<T extends yup.ObjectSchema<any, yup.AnyObject, any, "">> {
  ctx: UseFormReturn<InferType<T>>;
  schema: yup.ObjectSchema<any>;
  state: CurrentFormState;
  setState: Dispatch<SetStateAction<CurrentFormState>>;
};

export type CurrentFormState = {  status: 'init' | 'loading' | 'success' } | { status: 'error', message: string };

export type ObjectLike = Record<string, any>;

export interface FormProps {
  children: ReactNode[];
};

export type ToolTipElement = ReactElement<typeof FormToolTip>

export interface BaseProps {
  size?: GridSize;
  style?: React.CSSProperties;
}

export interface FieldName<T extends ObjectLike> extends BaseProps {
  name: keyof T & string;
  title?: string;
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

export type AutoCompleteProps<TName extends ObjectLike> = ComponentWithItemsProps<AutocompleteProps<any, false, false, false>, TName>

export type RadioProps<TName extends ObjectLike> = ComponentWithItemsProps<RadioGroupProps, TName> & {
  direction?: 'row' | 'column'
};

export interface ShortNameProps<TName extends ObjectLike> extends FieldName<TName> {
  onBlur?: () => void;
}

export type ListItem = {
  name: string;
  value: string | number | boolean;
};

export type RowProps = {
  children: ReactNode[] | ReactNode;
  spacing?: GridSpacing;
};

export interface DefaultButtonProps extends BaseProps {
  title?: string;
  options?: ButtonProps;
};

export interface SuccessAlertProps extends BaseProps {
  message: string;
};

export interface DynamicListProps<T extends ObjectLike> extends InputFieldProps<T> {
  buttonTitle?: string;
};

export interface ToolTipProps {
  message: string;
  style?: React.CSSProperties;
  options?: IconButtonProps;
}

export interface SubmitButtonProps<T extends ObjectLike> extends DefaultButtonProps {
  onSubmit: (data: T) => Promise<any>;
};

export interface DynamicTextProps<T extends ObjectLike> extends BaseProps {
  title: string;
  renderCallback: (data: T) => string;
  severity?: Color | undefined;
}