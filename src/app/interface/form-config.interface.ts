import { ValidatorFn } from "@angular/forms";

export interface FormField {
    type: 'text' | 'email' | 'number' | 'select' | 'textarea';
    name: string;
    label: string;
    validators: ValidatorFn[];
    options?: any[];
  }
  
  export interface FormConfig {
    type: 'clients' | 'dishes' | 'menus' | 'orders';
    mode: 'add' | 'edit' | 'delete';
    title: string;
    fields: FormField[];
    initialData?: any; // 
  }
  