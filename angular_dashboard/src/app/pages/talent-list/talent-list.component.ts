import { TalentService } from 'src/app/services/talent.service';
import { Component, OnInit } from '@angular/core';
import { Talent } from 'src/app/models/talent.model';


@Component({
  selector: 'app-talent-list',
  templateUrl: './talent-list.component.html',
  styleUrls: ['./talent-list.component.css']
})
export class TalentListComponent implements OnInit {
  talents: Talent[];
  constructor(private talentService: TalentService ) {}

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
