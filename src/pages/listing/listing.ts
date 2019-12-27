import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-listing',
  templateUrl: 'listing.html',
})
export class ListingPage {
  userInfo = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewWillEnter() {
    let localData = localStorage.getItem('userData');
    if (localData != null) {
      this.userInfo = JSON.parse(localData);
    }
  }

  removeItem(item) {
    this.presentAlertConfirm(item);
  }

  async presentAlertConfirm(item) {
    const alert = await this.alertCtrl.create({
      message: 'Do you really want to delete!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            const index = this.userInfo.indexOf(item);
            if (index !== -1) {
              this.userInfo.splice(index, 1);
              localStorage.setItem('userData',JSON.stringify(this.userInfo));
            }
          }
        }
      ]
    });

    await alert.present();
  }
}
