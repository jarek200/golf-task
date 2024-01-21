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
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  listen(eventName: string): Observable<Player> {
    return new Observable<Player>();
  }
}
