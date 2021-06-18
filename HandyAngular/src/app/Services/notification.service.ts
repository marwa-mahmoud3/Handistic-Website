import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }
  url='https://localhost:44339/api/Notifications';

  ngOnInit() {          
  }
 
getAllNotifications() {
  return this.http.get(this.url);
}

getById(id){
  let url=`https://localhost:44339/api/Notifications/${id}`;
  return this.http.get(url);
}
getNotificationById(sellerId): Observable<any> {
  let url=`https://localhost:44339/api/Notifications/GetNotificationBySellerId/${sellerId}`;
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
notReadedCount(sellerId):Observable<any>{

  let url=`https://localhost:44339/api/Notifications/GetNotificationCountNotRead/${sellerId}`;
  return this.http.get(url);
}
changetoRead(id,notify)
{
  let url =`https://localhost:44339/api/Notifications/${id}`;
  return this.http.put(url,notify);

}
}
