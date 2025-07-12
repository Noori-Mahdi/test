import { TValidationResult, TValidationResults } from "./unit";

export type TInputValidation =
  | ((value: string, type: string) => TValidationResult)
  | ((formValues: Record<string, string>) => TValidationResults)