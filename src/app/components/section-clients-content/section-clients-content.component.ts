import { Component, inject, input, OnInit } from '@angular/core';
import { MainSectionClientsComponent } from "../main-section-clients/main-section-clients.component";
import { getClientsService } from '../../services/clients.service';
import { of } from 'rxjs';
import { catchError, delay, takeUntil, map } from 'rxjs/operators';

@Component({
  selector: 'app-section-clients-content',
  imports: [MainSectionClientsComponent],
  templateUrl: './section-clients-content.component.html',
  styleUrl: './section-clients-content.component.scss'
})
export class SectionClientsContentComponent implements OnInit {
  data: any;
  public userData = input<any>();

  public tableContent = {
    headers: ['Client ID', 'Name', 'Email', 'Total Orders', 'User Type', 'Actions'],
  }

  private clientsService = inject(getClientsService);

  ngOnInit(): void {
    this.clientsService.getData().pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        console.error('Error fetching data:', error);
        return of([]);
      })
    ).subscribe(
      (response) => {
        this.data = response;
        console.log(this.data); 
      }
    );
  }

}