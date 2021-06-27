import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientNotifyService {

  constructor(private http: HttpClient) { }
  url='https://localhost:44339/api/ClientNotify';

  ngOnInit() {          
  }
 
getAllClientNotifys() {
  return this.http.get(this.url);
}

getById(id){
  let url=`https://localhost:44339/api/ClientNotify/${id}`;
  return this.http.get(url);
}
getNotifyByuserId(userId)
{
  let url=`https://localhost:44339/api/ClientNotify/GetClientNotifyByuserId/${userId}`;
  return this.http.get(url);
}
createNotification(data): Observable<any> {
 return this.http.post(this.url, data);
}
update(id, data): Observable<any> {
return this.http.put(`${this.url}/${id}`, data);
}
deleteById(id): Observable<any> {
return this.http.delete(`${this.url}/${id}`);
}

deleteAll(): Observable<any> {
return this.http.delete(this.url);
}
notReadedCount(userId):Observable<any>{

  let url=`https://localhost:44339/api/ClientNotify/GetClientNotifyCountNotRead/${userId}`;
  return this.http.get(url);
}
changetoRead(id,notify)
{
  let url =`https://localhost:44339/api/ClientNotify/${id}`;
  return this.http.put(url,notify);

}
}
