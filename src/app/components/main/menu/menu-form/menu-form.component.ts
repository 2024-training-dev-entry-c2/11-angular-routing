import { Component, inject, OnInit } from '@angular/core';
import { IMenu } from '../../../../interfaces/menuResponse.interface';
import { AddMenuService } from '../../../../services/menu/add-menu.service';
import { EditMenuService } from '../../../../services/menu/edit-menu.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomFormComponent } from '../../../custom/custom-form/custom-form.component';

@Component({
  selector: 'app-menu-form',
  imports: [CustomFormComponent],
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.scss'],
})
export class MenuFormComponent implements OnInit {
  menuId: number | null = null;
  formData: IMenu | null = null;

  formConfig = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      errorMessage: 'Name is required.',
    },
    {
      name: 'dishIds',
      label: 'Dishes',
      type: 'array',
      errorMessage: 'At least one dish is required.',
    },
  ];

  private addMenuService = inject(AddMenuService);
  private editMenuService = inject(EditMenuService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.menuId = +id;
        this.loadMenuData(this.menuId);
      }
    });
  }

  loadMenuData(id: number): void {
    this.editMenuService.getMenu(id).subscribe((menu) => {
      this.formData = menu;
    });
  }

  submitAction(data: any): void {
    if (this.menuId) {
      this.editMenuService.updateMenu(this.menuId, data).subscribe(() => {
        this.router.navigate(['/menu']);
      });
    } else {
      this.addMenuService.execute(data).subscribe(() => {
        this.router.navigate(['/menu']);
      });
    }
  }
}
