import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';


@Injectable({
  providedIn: 'root', // You can also provide it in the component if it's standalone
})
export class GameService {
  private apiUrl =  `${environment.apiUrl}`; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  fetchGames(): Observable<any[]> { // Specify the return type as needed
    return this.http.get<any[]>(this.apiUrl); // Adjust the type according to your API response
  }
}
