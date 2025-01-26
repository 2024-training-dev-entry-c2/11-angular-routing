import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
  })

  
  export class DataManagementService<T> {
    private dataSubject = new BehaviorSubject<T[]>([]);
    public data$ = this.dataSubject.asObservable();
  
    updateData(newData: T[]) {
      this.dataSubject.next(newData);
    }
  
    addItem(item: T) {
      const currentData = this.dataSubject.value;
      this.dataSubject.next([...currentData, item]);
     
    }
  
    removeItem(predicate: (item: T) => boolean) {
      const currentData = this.dataSubject.value;
      this.dataSubject.next(currentData.filter(item => !predicate(item)));
      
    }
  
    updateItem(predicate: (item: T) => boolean, updatedItem: T) {
      const currentData = this.dataSubject.value;
      const updatedData = currentData.map(item => 
        predicate(item) ? { ...item, ...updatedItem } : item
      );
      this.dataSubject.next(updatedData);
    }
  }