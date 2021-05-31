import { Component, OnInit } from '@angular/core';
import { FreelancersService } from 'src/app/services/freelancers.service';
import { Freelancers } from 'src/app/ViewModels/freelancers';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-listfreelancers',
  templateUrl: './listfreelancers.component.html',
  styleUrls: ['./listfreelancers.component.css']
})
export class ListfreelancersComponent  {
  freelancers: Array<Freelancers> = [];
  showFreelancer: Freelancers;
  isSelected: boolean = false;
  deletedFreelancer: Freelancers;

  constructor(private FreelancerService: FreelancersService) { }

  setFreelancerDetails(freelancer: Freelancers){
    this.isSelected=!this.isSelected;
    if(this.isSelected){
      this.showFreelancer = freelancer;
    }else{
      this.showFreelancer = undefined;
    }
  }

  /**
   * Set deletedFreelancer and reset returnedMessage = undefined
   * @param deleteFreelancer
   */
  prepareDeleteFreelancer(deleteFreelancer: Freelancers){
    //assign delete-Customer
    this.deletedFreelancer = deleteFreelancer;
  }

  /**
   * Delete a Freelancer by ID
   */
  deleteFreelancer(){    
      this.FreelancerService.deleteFreelancer(this.deletedFreelancer.key)
                .then(() => {
                  // remove a deletedCustomer from customers list on view
                  this.freelancers = this.freelancers.filter(Freelancer => {
                    return Freelancer.key != this.deletedFreelancer.key;
                  })
                  
                })
  }

  /**
   * Update Freelancer function
   */
  updateFreelancer() {

    var updatedFreelancer = Object.assign({}, this.showFreelancer);
    delete updatedFreelancer.key;

    this.FreelancerService
      .updateFreelancer(this.showFreelancer.key, updatedFreelancer)
                      .then(() => {
                          // update customers list
                          this.freelancers.map(x => {
                            if(x.key == this.showFreelancer.key){
                              x = this.showFreelancer;
                            }
                          }
                      );
}
                      )
}
}

