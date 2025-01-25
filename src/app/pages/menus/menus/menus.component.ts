import { Component, inject, OnInit } from '@angular/core';
import { TableComponent } from '../../../components/table/table.component';
import { TabsComponent } from '../../../components/tabs/tabs.component';
import { MenusService } from '../../../services/menu/menus.service';

@Component({
  selector: 'app-menus',
  imports: [TableComponent,TabsComponent],
  templateUrl: './menus.component.html',
  styleUrl: './menus.component.scss'
})
export class MenusComponent implements OnInit {
  ngOnInit(): void {
   
    this.getMenus();
  }
  
  tabsList = [
    {
      title: 'Add Order',
      tabContent: '"assets/icons/form-svgrepo-com.svg#icon-twitter"',
    },
    {
      title: 'List',
      tabContent: '"assets/icons/form-svgrepo-com.svg#icon-list"',
    },
  ];


  public menus = inject(MenusService);
  getMenus(): void {
    this.menus.getMenus().subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }


}
