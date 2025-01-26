export interface IValidator {
  text: string;
  type: string;
  inputType?: string;
  controlName: string;
  placeholder: string;
  isMultiline: boolean;
  options?: {
    label: string;
    value: string;
  }
}