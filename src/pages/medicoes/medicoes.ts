import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { ApiProvider } from '../../providers/api/api';
import { FunctionsProvider } from '../../providers/functions/functions';
import { LoginPage } from '../login/login';

import { DetalhePage } from '../detalhe/detalhe';
import { ResultadoPage } from '../resultado/resultado';

@IonicPage()
@Component({
  selector: 'page-medicoes',
  templateUrl: 'medicoes.html',
})
export class MedicoesPage {
  private media: number;
  public turno;
  private altoBaixo = ''; 
  private ico = ["arrow-down", "arrow-up"];
  public show = false;
  private ocorrenciaData;
  private offset = 0;
  private qtdObj: any = {
    hoje: 0,
    total: 0,
    semana: 0
  }
  private error = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private api: ApiProvider,
    public functions: FunctionsProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
  }

  ionViewWillEnter() {
    this.quantidadeObj();
  }

  public getAllMedicoes(): any {
    this.navCtrl.push(ResultadoPage, {funcao: 1});
  }
  
  public medicoesHoje() {
      let data = this.functions.toEpoch();
      this.navCtrl.push(ResultadoPage, {funcao: 3, filtro: data});
  }

  public medicoesSemana() {
    this.navCtrl.push(ResultadoPage, {funcao: 2})
  }

  public medicoesDiaEspecifico() {
    
    this.ocorrenciaData = this.functions.toEpoch(this.ocorrenciaData);
    this.navCtrl.push(ResultadoPage, {funcao: 4, filtro: this.ocorrenciaData});
  }

  quantidadeObj() {
    let hoje = this.functions.toEpoch();
    let intervalo = this.functions.calculaEssaSemana();
    console.log(hoje)    
    this.api.getQuantidadeObjDia(hoje).subscribe(
      res => this.qtdObj.hoje = res,
      Error => console.log("ERRRRRRRRRRRRRRO")
    );
    this.api.getQuantidadeObjSemana(intervalo.i1, intervalo.i2).subscribe(
      res => this.qtdObj.semana = res,
       Error => this.error++
    );
    this.api.getQuantidadeObj().subscribe(res => {
      this.qtdObj.total = res;
    }, Error => {
      Error => this.error++;
    });

   if (this.error > 0)
     this.functions.showAlert("Ops", "foram encontrados erro ao exibir esta página");
  }
}
