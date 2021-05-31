import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  clients: Client[]
  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.clientService.getClientList().subscribe((res) => {
        this.clients = res.map((e) =>
          {
            return {
              id: e.payload.doc.id,
              ...(e.payload.doc.data() as object)
            } as Client;
          });
      });
  };
  deleteClient(client) {
    this.clientService.deleteClient(client);
  }
}
