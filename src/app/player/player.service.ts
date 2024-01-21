import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private socket: any;
  private url = 'https://mst-full-stack-dev-test.herokuapp.com';

  constructor() {
    this.socket = io(this.url);
  }

  public getData(): Observable<any> {
    return new Observable((observer) => {
      // Change this line to listen to 'data-update' instead of 'data'
      this.socket.on('data-update', (data: any) => {
        console.log('Data received:', data);
        observer.next(data);
      });

      this.socket.on('disconnect', (reason: any) => {
        console.warn('Socket disconnected:', reason);
      });

      return () => {
        this.socket.disconnect();
      };
    });
  }
}
