import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { Player } from '../models/player';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private socket: any;
  private players: Player[] = [];

  constructor() {
    this.socket = io(environment.apiUrl);
  }

  public getData(): Observable<Player[]> {
    return new Observable((observer) => {
      this.socket.on('data-update', (data: Player) => {
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
