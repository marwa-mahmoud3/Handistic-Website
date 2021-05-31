import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-cardoverview',
  templateUrl: './cardoverview.component.html',
  styleUrls: ['./cardoverview.component.css'],
})
export class CardoverviewComponent implements OnInit {
  clientLength: number;
  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.clientService.getClientList().subscribe((res) => {
      this.clientLength = res.length;
    });
  }
}
