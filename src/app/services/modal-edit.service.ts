import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class ModalEditService {
    private modalSubjectEdit = new BehaviorSubject<boolean>(false);
    modalState$ = this.modalSubjectEdit.asObservable();

  
    openModal() {
      this.modalSubjectEdit.next(true);
    }
  
    closeModal() {
      this.modalSubjectEdit.next(false);
    }
  }
  