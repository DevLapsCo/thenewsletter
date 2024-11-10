import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { Products } from '../../constants/inventory.interface';

@Pipe({
  name: 'fetchProduct',
  standalone: true
})
export class FetchProductPipe implements PipeTransform {

  private cache = new Map<string, string>();

  constructor(private http: HttpClient) {}

  transform(id: string | null | undefined, apiUrl: string): Observable<string | null> {
    if (!id) return of(null); // Return an observable of null if no ID is provided

    return this.http.get<Products>(`${apiUrl}?id=${id}`).pipe(
      switchMap(response => response ? of(response.name ) : of("Unkown Product")) // Replace 'name' with the key you want to retrieve
    );
  }
}
