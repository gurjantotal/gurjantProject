import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ListingPage } from '../listing/listing';
import { CreatenewuserPage } from '../createnewuser/createnewuser';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
     List = ListingPage;
     User = CreatenewuserPage; 

  constructor(public navCtrl: NavController) {

  }

}
