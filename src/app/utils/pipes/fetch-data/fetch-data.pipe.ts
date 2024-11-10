import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { UserData } from '../../constants/user.interfaces';

@Pipe({
  name: 'fetchData',
  standalone: true
})
export class FetchDataPipe implements PipeTransform {

  private cache = new Map<string, string>();

  constructor(private http: HttpClient) {}

  transform(id: string | null | undefined, apiUrl: string): Observable<string | null> {
    if (!id) return of(null); // Return an observable of null if no ID is provided

    return this.http.get<UserData>(`${apiUrl}/${id}`).pipe(
      switchMap(response => response ? of(response.firstName + " " + response.lastName) : of(null)) // Replace 'name' with the key you want to retrieve
    );
  }

}
