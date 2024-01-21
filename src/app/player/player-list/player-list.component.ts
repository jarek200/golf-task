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
      .subscribe((data: Partial<Player[]>) => {
        this.players = this.sortPlayersByScore(data);
      });
  }

  ngOnDestroy() {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  private sortPlayersByScore(players: Partial<Player[]>): Partial<Player[]> {
    return players.sort((a: any, b: any) => {
      const scoreA =
        typeof a.Score === 'number' ? a.Score : parseFloat(a.Score);
      const scoreB =
        typeof b.Score === 'number' ? b.Score : parseFloat(b.Score);
      return scoreA - scoreB;
    });
  }
}
