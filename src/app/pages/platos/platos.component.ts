import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-platos',
  imports: [],
  templateUrl: './platos.component.html',
  styleUrl: './platos.component.scss',
})
export class PlatosComponent implements OnInit {
  public idMenu: number = 0;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(console.log);
  }
}
