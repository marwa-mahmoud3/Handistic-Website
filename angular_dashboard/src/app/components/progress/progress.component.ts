import { Talent } from './../../models/talent.model';
import { TalentService } from 'src/app/services/talent.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {
  talents : Talent []
  constructor(private talentService:TalentService) { }

  ngOnInit(): void {
    this.talentService.getTalentList().subscribe((res) => {
      this.talents = res.map((e) =>
      {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as object)
        } as unknown as Talent;
      });
    });
};
deleteTalent(talent) {
  this.talentService.deleteTalent(talent)
}
}
