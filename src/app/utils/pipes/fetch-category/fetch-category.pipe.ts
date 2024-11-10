import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';

@Pipe({
  name: 'fetchCategory',
  standalone: true
})
export class FetchCategoryPipe implements PipeTransform {

  private cache = new Map<string, string>();

  constructor(private http: HttpClient) {}

  transform(id: string | null | undefined, apiUrl: string): Observable<string | null> {
    if (!id) return of(null); // Return an observable of null if no ID is provided

    return this.http.get<any>(`${apiUrl}&id=${id}`).pipe(
      switchMap(response => response ? of(response.categoryList[0].name ) : of("Unkown Warehouse")) // Replace 'name' with the key you want to retrieve
    );
  }


}
