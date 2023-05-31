import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {AlertController,LoadingController,NavController, 
  ToastController }from '@ionic/angular';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.page.html',
  styleUrls: ['./recover.page.scss'],
})
export class RecoverPage implements OnInit {
    email!:string;
  constructor(private  alertController:AlertController,
    private loadingController:LoadingController,
    private navCtrl:NavController,
    private toastCtrl:ToastController,
    private afAuth:AuthService,
    private alertCtrl:AlertController,
    private loadCtrl:LoadingController) { }

  ngOnInit() {
  }

  login(){
    this.navCtrl.navigateRoot('/login');
  }

    async recoverPassword(){
      this.showLoading();
    console.log(this.email);
      await this.afAuth.recoverPassword(this.email);
  this.presentAlert();

  }

async showLoading() {
  const loading = await this.loadCtrl.create({
    message: 'Awaiting...',
    duration: 1500,
  });
  loading.present();
}

async presentToast(position: 'top' | 'middle' | 'bottom') {
  const toast = await this.toastCtrl.create({
    message: 'Erro ao Recuperar senha !',
    duration: 2000,
    position: position,
  });

  await toast.present();
}

async presentAlert() {
  const alert = await this.alertController.create({
    header: 'Recover password',
      subHeader: 'verifique seu email',
     message: 'Enviamos um email com a redefinição da senha !',
    buttons: ['OK'], 
  });
    await alert.present();
  this.navCtrl.navigateRoot('/login');
}
}
















