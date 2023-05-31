import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, SearchbarCustomEvent,AlertController } from '@ionic/angular';
import { HttpClientModule, HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { ActionSheetController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { User } from '../user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoginPage } from '../pages/login/login.page';
import { CapacitorHttp } from '@capacitor/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public stories: Array<any> = new Array<any>();
  public movies: Array<any> = new Array<any>();
  public series: Array<any> = new Array<any>();
  public news: Array<any> = new Array<any>();
 
  public slidesOptions: any = { slidesPerview: 4, freeMode: true, spaceBetween: 10 }
  loading: any;


  ngOnInit() {
  
  }

  onSearchChange() {
    console.log();
  }
  ionViewDidEnter() {
   
        
    this.loadStories();
    this.loadMovies();
    this.loadNews();
    this.loadSeries();
  }
  constructor(private httpClient: HttpClient,
    private afs: AuthService,
    private loadCtrl: LoadingController,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private alertCtrl:AlertController,
    private actionSheet: ActionSheetController,
    private fs:AngularFireAuth) { }

 loadStories() {
    this.httpClient.get('http://www.omdbapi.com/?apikey=3a056eae&s=net&page=3').subscribe(data => {
      const response: any = data;
      this.stories = response.Search;
    });
  }
  



  loadMovies() {
    this.httpClient.get('http://www.omdbapi.com/?apikey=3a056eae&s=net&page=4').subscribe(data => {
      const response: any = data;
      this.movies = response.Search;
    });

  }

  loadSeries() {
    this.httpClient.get('http://www.omdbapi.com/?apikey=3a056eae&s=net&page=5').subscribe(data => {
      const response: any = data;
      this.series = response.Search;
    })
  }

  loadNews() {
    this.httpClient.get('http://www.omdbapi.com/?apikey=3a056eae&s=net&page=5').subscribe(data => {
      const response: any = data;
      this.news = response.Search;
    })
  }
  async exit() {
    const alert = await this.alertCtrl.create({
      header: 'Sair',
      subHeader: 'Tem certeza que deseja sair ?',
      buttons: ['OK','Cancel'],
    });
    
               await alert.present();                  
                         
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
      message: ' ',
      duration: 2000,
      position: position,
    });

    await toast.present();
  }
    
        mostrarUser(){
          
        }


    }