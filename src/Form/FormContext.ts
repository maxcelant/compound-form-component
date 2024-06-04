import { createContext } from "react";
import { FormContextProps } from "./types";

const FormContext = createContext<Partial<FormContextProps>>({});

export default FormContext;