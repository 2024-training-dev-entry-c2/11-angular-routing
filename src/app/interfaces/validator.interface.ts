export interface IValidator {
  text: string;
  type: string;
  inputType?: string;
  controlName: string;
  placeholder: string;
  options?: {
    label: string;
    value: string;
  }
}