import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Player } from 'src/app/models/player';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css'],
})
export class PlayerListComponent implements OnInit, OnDestroy {
  players: Partial<Player[]> = [];
  private dataSubscription: Subscription | undefined;

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.dataSubscription = this.playerService
      .getData()
      .subscribe((data: any) => {
        console.log('Data received in component:', data); // Add this line
        this.players = data;
        console.log(this.players, 'players');
      });
  }

  ngOnDestroy() {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }
}
