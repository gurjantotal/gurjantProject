import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
@IonicPage()
@Component({
  selector: 'page-createnewuser',
  templateUrl: 'createnewuser.html',
})
export class CreatenewuserPage implements OnInit {
  targetfile = null;

  allUserData = [];
  createUser: FormGroup;
  username: AbstractControl;
  email: AbstractControl;
  image: AbstractControl;
  description: AbstractControl;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, 
    public navParams: NavParams, private formBuilder: FormBuilder,
    private alertCtrl: AlertController) {
  }

  ngOnInit() {
    this.createUser = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      image: ['', [Validators.required]],
      imageURI: [''],
      description: ['', [Validators.required, Validators.minLength(10)]],
    });

    this.username = this.createUser.controls['username'];
    this.email = this.createUser.controls['email'];
    this.image = this.createUser.controls['image'];
    this.description = this.createUser.controls['description'];

    let localData = localStorage.getItem('userData');
    if (localData != null) {
      this.allUserData = JSON.parse(localData);
    }
  }

  ionViewWillEnter() {
    this.createUser.reset();
  }

  logForm() {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
    console.log(this.createUser.value)
    this.allUserData.push(this.createUser.value);
    localStorage.setItem('userData', JSON.stringify(this.allUserData));
    this.createUser.reset();
    loader.dismiss();
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatenewuserPage');

  }

  async uploadimage(event) {
    // this.targetfile =;
    if (event.target && event.target.files[0]) {
      console.log(event.target.files[0], this.targetfile);
      const blob = event.target.files[0];
      const imageURI = await this.getImageURI(blob);
      this.createUser.patchValue({ 'imageURI': imageURI });
      console.log(this.createUser);
    }
  }

  getImageURI(blob) {
    return new Promise(resolve => {
      var reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        var base64data = reader.result;
        resolve(base64data);
      }
    });
  }
}
