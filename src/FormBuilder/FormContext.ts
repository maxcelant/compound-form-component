import { createContext } from "react";
import { CurrentFormState, FormContextProps, InferType } from "./types";
import { UseFormReturn } from "react-hook-form";
import * as yup from "yup";

const defaultFormContext: FormContextProps<any> = {
  ctx: {} as UseFormReturn<InferType<any>>,
  schema: {} as yup.ObjectSchema<any>, 
  state: {} as CurrentFormState, 
  setState: () => {}, 
};

const FormContext = createContext<FormContextProps<any>>(defaultFormContext);

export default FormContext;