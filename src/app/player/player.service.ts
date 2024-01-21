import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private socket: any;
  private url = 'https://mst-full-stack-dev-test.herokuapp.com';
  private players: Player[] = []; // Array to store player objects

  constructor() {
    this.socket = io(this.url);
  }

  public getData(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('data-update', (data: any) => {
        console.log('Data received:', data);
        this.updatePlayerArray(data); // Update player array
        observer.next(this.players); // Emit the updated array
      });

      this.socket.on('disconnect', (reason: any) => {
        console.warn('Socket disconnected:', reason);
      });

      return () => {
        this.socket.disconnect();
      };
    });
  }

  private updatePlayerArray(newPlayerData: Player): void {
    const index = this.players.findIndex(
      (p) => p.MSTID === newPlayerData.MSTID
    );

    if (index !== -1) {
      // Player exists, update data
      this.players[index] = newPlayerData;
    } else {
      // New player, add to array
      this.players.push(newPlayerData);
    }
  }
}
