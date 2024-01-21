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
  player: Partial<Player> = {};
  private dataSubscription: Subscription | undefined;

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.dataSubscription = this.playerService
      .getData()
      .subscribe((data: any) => {
        console.log('Data received in component:', data); // Add this line
        this.player = data;
      });
  }

  ngOnDestroy() {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }
}
