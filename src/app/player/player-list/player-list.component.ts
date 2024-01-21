import { Component, OnInit } from '@angular/core';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from 'src/app/models/player';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css'],
})
@Injectable({
  providedIn: 'root',
})
export class PlayerListComponent implements OnInit {
  player: Partial<Player> = {};

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  listen(eventName: any): Observable<Player> {
    return (this.player = eventName);
  }
}
