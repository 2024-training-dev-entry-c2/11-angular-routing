import { Component, inject, input } from '@angular/core';
import { MainSectionMenusComponent } from "../main-section-menus/main-section-menus.component";
import { getMenusService } from '../../services/menus.service';

@Component({
  selector: 'app-section-menus-content',
  imports: [MainSectionMenusComponent],
  templateUrl: './section-menus-content.component.html',
  styleUrl: './section-menus-content.component.scss'
})
export class SectionMenusContentComponent {
data: any;
  public menuData = input<any>();

  public tableContent = {
    headers: ['Menu ID', 'Name', 'Description', 'Dishes', 'Actions'],

  }


  private menuService = inject(getMenusService);

  ngOnInit(): void {
    this.menuService.getData().subscribe(
      (response) => {
        this.data = response;
        console.log(this.data); // For debugging purposes
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
