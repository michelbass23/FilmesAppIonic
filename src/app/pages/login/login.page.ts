import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {AlertController,LoadingController,NavController, ToastController }from '@ionic/angular';
import { FirebaseError } from 'firebase/app';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email!: string;
  password!: string;
  loading: any;

  constructor(private  alertController:AlertController,
    private loadingController:LoadingController,
    private navCtrl:NavController,
    private toastCtrl:ToastController,
    private afAuth:AuthService,
    private loadCtrl:LoadingController

    ) { }

  ngOnInit() {
    
  }
  async login(){
      this.showLoading();
    console.log(this.email, this.password);
    try {
      const userCredential = await this.afAuth.loginWithEmail(this.email, this.password);
      //Registro realizado com suceeso  
      console.log('Logado!', userCredential.user?.uid);
      //encerra o loop do component ion-loading ao logar o usuario
      this.loadCtrl.dismiss();
      //Leva o usuario ate a pagina de Login  
      this.navCtrl.navigateRoot('/home');
    } catch (error) {
      // Não criar loading maior em caso de erros 
      this.loadCtrl.dismiss();
      //tratamento de erros
      console.log('Erro ao fazer Login:', error);
      // gera um Toast pro usuario verificar qual erro retornou.
      this.presentToast('bottom');
      //Verificar codigo de erro
        if(error){
          console.error('auth/wrong-password');
        }
      
    }
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
      message: 'Erro ao fazer login !',
      duration: 2000,
      position: position,
    });

    await toast.present();
  }

   pageSignUp() {
    this.navCtrl.navigateRoot('/register');
		
	}

  recover(){
    this.navCtrl.navigateRoot('/recover');
  }
}




  

  
 

 
