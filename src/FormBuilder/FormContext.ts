import { createContext } from "react";
import { FormContextProps } from "./types";

const FormContext = createContext<Partial<FormContextProps<any>>>({});

export default FormContext;