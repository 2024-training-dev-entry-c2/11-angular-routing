import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  
  selectedMenu = signal<string>('users'); // Menú predeterminado

  setSelectedMenu(menu: string): void {
    this.selectedMenu.set(menu);
  }
  
}
