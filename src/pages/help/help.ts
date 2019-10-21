import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HelpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-help',
  templateUrl: 'help.html',
})
export class HelpPage {
  public ico = {
    ico: 'arrow-down',
    descricao: 'Mostrar'
  }
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpPage');
  }

  show(help: number) {
    if (this.ico.ico == "arrow-down") {
      this.ico.ico = "arrow-up";
      this.ico.descricao = "Fechar";
    }
    else {
      this.ico.ico = "arrow-down";
      this.ico.descricao = "Mostrar";
    }
  }

}
