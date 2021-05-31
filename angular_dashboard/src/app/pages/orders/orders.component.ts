import { Jobs } from './../../models/jobs';
import { JobsService } from './../../services/jobs.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  jobs:Jobs[];

  constructor(private jobServ: JobsService) { }

  ngOnInit(): void {
    this.jobServ.getJobs().subscribe((res)=>
   this.jobs= res.map(
      (e)=> {
        console.log(e.payload.doc.data());
        
        return {
          ...(e.payload.doc.data() as object)
        } as Jobs;
      }
      
      )
      
      )
     console.log(this.jobs);
     
    

  }

}
