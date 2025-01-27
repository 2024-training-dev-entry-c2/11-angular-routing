import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface IDialog {
  title: string,
  description: string,
  labelButtonLeft: string,
  labelButtonRight: string
}

@Injectable({
  providedIn: 'root'
})
export class CorfimDialogService {

  constructor() { }
  private dialogSubject = new Subject<IDialog>();
  $dialogData: Observable<IDialog> = this.dialogSubject.asObservable();

  emitDialog(title: string, description: string, labelButtonLeft: string, labelButtonRight: string): void {
    let dialogData = {
      title: title,
      description: description,
      labelButtonLeft: labelButtonLeft,
      labelButtonRight: labelButtonRight
    }

    this.dialogSubject.next(dialogData as IDialog);
  }
}
