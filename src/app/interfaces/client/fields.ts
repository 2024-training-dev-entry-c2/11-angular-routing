export interface IFormField {
  name: string;
  type: string;
  placeholder: string;
  description?: string;
  price?: boolean;
}

export interface IFormConfig {
  title: string;
  action: string;
  service: string;
  fields: IFormField[];
  submitText: string;
}
