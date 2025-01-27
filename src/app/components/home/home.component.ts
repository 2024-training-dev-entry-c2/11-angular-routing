import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { catchError, concatMap, delay, filter, forkJoin, map, mergeMap, Observable, of, switchMap, take, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    // Dado un observable de números, crea otro que emita cada número multiplicado por 2.

    // const numbers = of(1, 2, 3, 4, 5).pipe(
    //   map(number => number * 2),
    // ).subscribe(console.log);

    // numbers.unsubscribe()

    // of(1, 2, 3, 4, 5).pipe(
    //   filter(number => number % 2 === 0)
    // ).subscribe(console.log)

    // Usa mergeMap para simular una llamada a una API que retorna información sobre un usuario.

    // of({ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }).pipe(
    //   mergeMap((user) => this.getProfile(user.id))
    // ).subscribe(console.log)

    // of({ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }).pipe(
    //   mergeMap((user) => this.getProfile2(user.id)),
    //   tap(console.log),
    //   switchMap((user) => this.getProfile(user.id)),
    //   concatMap((user) => this.getProfile(user.id))
    // ).subscribe(console.log)

    // const obs = of(6, 7, 8, 9).pipe(
    //   delay(5000),
    // )

    // of(1, 2, 3, 4, 5).pipe(
    //   delay(2000),
    //   mergeMap((number) => obs.pipe(map(i => number + i)))
    // ).subscribe(console.log)

    const obs = of(6, 7, 8, 9, 10, 11).pipe(
      delay(1000),
      takeUntil(of(1).pipe(delay(4000))),
      map(number => {
        throw new Error('Error');
      }),
      catchError(error => of(1, 2, 3, 4))
    ).subscribe(console.log, (error) => console.log(error), () => console.log('Completed'))

    // Pending
    // Complete
    // Error
    // Finalizado

    // forkJoin
    const obs1 = of(1, 2, 3, 4, 5).pipe(delay(1000))
    const obs2 = of(6, 7, 8, 9, 10).pipe(delay(2000))
    const obs3 = of(11, 12, 13, 14, 15)

    forkJoin([obs1, obs2, obs3])
    .pipe(
      tap(console.log),
    )
    .subscribe(console.log)

  }

  private getProfile(id: number): Observable<any> {
    const users = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }, { id: 3, name: 'Bob' }, { id: 4, name: 'Alice' }, { id: 5, name: 'Dave' }];
    return of(users.find(user => user.id === id));
  }

  private getProfile2(id: number): Observable<any> {
    const users = [{ id: 1, name: 'John', lastName: "gkfgmd" }, { id: 2, name: 'Jane', lastName: "gkfgmd" }, { id: 3, name: 'Bob', lastName: "gkfgmd" }, { id: 4, name: 'Alice', lastName: "gkfgmd" }, { id: 5, name: 'Dave', lastName: "gkfgmd" }];
    return of(users.find(user => user.id === id));
  }
}
