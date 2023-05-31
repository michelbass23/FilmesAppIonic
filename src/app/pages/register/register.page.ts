import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  nome!: string;
  email!: string;
  password!: string;
  loading: any;
  constructor(private afAuth: AuthService,
    private loadCtrl: LoadingController,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
  ) { }

  ngOnInit() {

  }

  async register() {
    this.showLoading();

    console.log(this.nome, this.email, this.password);
    try {
      const userCredential = await this.afAuth.registerWithEmail(this.email, this.password);
      //Registro realizado com suceeso  
      console.log('Usuario Cadastrado!', userCredential.user?.uid);
      //encerra o loop do component ion-loading ao cadastrar usuario
      this.loadCtrl.dismiss();
      //Leva o usuario ate a pagina de Login  
      this.navCtrl.navigateRoot('/login');
    } catch (error) {
      // Não criar loading maior em caso de erros 
      this.loadCtrl.dismiss();
      //tratamento de erros
      console.log('Erro ao registrar usuario:', error);
      // gera um Toast pro usuario verificar qual erro retornou.
      this.presentToast('bottom');
      //Verificar codigo de erro
      if (error === 'auth/email-already-in-use') {
        console.log('Email ja esta em uso');
      } else {
        console.log('Erro ao cadastrar usuario');
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
      message: 'Erro ao cadastrar usuario !',
      duration: 1500,
      position: position,
    });

    await toast.present();
  }
}



