import { Injectable } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { BehaviorSubject } from 'rxjs';

interface DialogOptions {
  message?: string;
}

interface DialogData {
  component: ComponentType<any>;
  options?: DialogOptions;
  resolve: (value: boolean) => void;
}

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private dialogSubject = new BehaviorSubject<DialogData | null>(null);
  private dialogResolve: ((value: boolean) => void) | null = null;

  // Observable para suscribirse a cambios en la apertura del diálogo
  dialog$ = this.dialogSubject.asObservable();

  /**
   * Abre un diálogo con el componente especificado y opciones adicionales.
   * @param component - El componente que se mostrará en el diálogo.
   * @param options - Opciones adicionales para configurar el diálogo.
   * @returns Promise<boolean> - Resolución con la acción del usuario.
   */
  openDialog<T>(component: ComponentType<T>, options?: DialogOptions): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      console.log("Diálogo abierto con promesa.");

      this.dialogResolve = resolve;  // Guardamos el resolve para su uso posterior
      this.dialogSubject.next({
        component,
        options,
        resolve: (value: boolean) => {
          this.dialogResolve = null;
          resolve(value);
        }
      });
    });
  }

  /**
   * Cierra el diálogo con un valor (true/false).
   * @param value - Resultado de la acción del usuario.
   */
  closeDialog(value: boolean) {
    if (this.dialogResolve) {
      this.dialogResolve(value);
      this.dialogResolve = null;
    }
    this.dialogSubject.next(null);
  }
}
