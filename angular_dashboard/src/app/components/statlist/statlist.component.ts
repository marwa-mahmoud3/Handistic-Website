import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-statlist',
  templateUrl: './statlist.component.html',
  styleUrls: ['./statlist.component.css'],
})
export class StatlistComponent implements OnInit {
  clients: Client[];
  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    // tslint:disable-next-line: deprecation
    this.clientService.getClientList().subscribe((res) => {
      this.clients = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as object),
        } as Client;
      });
    });
  }

  deleteClient(client) {
    this.clientService.deleteClient(client);
  }
}
