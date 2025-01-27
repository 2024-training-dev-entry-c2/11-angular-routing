import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class ModalDeleteService {
    private modalSubjectDelete = new BehaviorSubject<boolean>(false);
    modalState$ = this.modalSubjectDelete.asObservable();

  
    openModal() {
      this.modalSubjectDelete.next(true);
    }
  
    closeModal() {
      this.modalSubjectDelete.next(false);
    }
  }
  