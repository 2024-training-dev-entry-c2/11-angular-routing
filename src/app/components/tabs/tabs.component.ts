import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tabs',
  imports: [],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
})
export class TabsComponent {
  @Input() tabs: { title: string; tabContent: string }[] = [];
  @Input() title: string = '';
  activeTab: number = 0;
  images = [
    'assets/icons/form-svgrepo-com.svg#icon-twitter',
    'assets/icons/form-svgrepo-com.svg#icon-list',
    'assets/icons/form-svgrepo-com.svg#icon-delete',
    'assets/icons/form-svgrepo-com.svg#icon-update',
  ];
  selectTab(index: number): void {
    this.activeTab = index;
  }
  show(value: string): void {
    console.log(value);
  }
}
