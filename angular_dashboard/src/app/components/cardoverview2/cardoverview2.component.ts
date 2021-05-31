import { Component, OnInit } from '@angular/core';
import { TalentService } from 'src/app/services/talent.service';

@Component({
  selector: 'app-cardoverview2',
  templateUrl: './cardoverview2.component.html',
  styleUrls: ['./cardoverview2.component.css']
})
export class Cardoverview2Component implements OnInit {
  talentLength: number;
  constructor(private talentService:TalentService) { }

  ngOnInit(): void {
    this.talentService.getTalentList().subscribe(res =>
      {
        this.talentLength = res.length
      })
  }


}
