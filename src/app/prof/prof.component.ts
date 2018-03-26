import { Component, HostListener, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  CryptoProfService
} from '../../services/services'

import { canBeNumber } from '../../util/validation';

@Component({
  selector: 'app-prof',
  templateUrl: './prof.component.html',
  styleUrls: ['./prof.component.css']
})
export class ProfComponent{

  // TODO add proper types these variables

  balance: any = '?';
  sendingAmount: number;
  recipientAddress: string;
  status: string;
  canBeNumber = canBeNumber;

  ProfID: number;
  BidAmount: number;

  constructor(
    private _ngZone: NgZone,
    private CryptoProfService: CryptoProfService,
    private ARouteSer: ActivatedRoute,
    ) {
  }

  ngOnInit() {
    this.ARouteSer.params.subscribe(params => {
       this.ProfID = params['ProfID'];
    });
  }

  Offer() {
    this.CryptoProfService.MakeOffer(this.ProfID, this.BidAmount).subscribe(() =>{

    }, error => {
      alert(error)
    })
  }


  // refreshBalance = () => {
  //   this.MetaCoinService.GetBalance(this.account)
  //     .subscribe(value => {
  //       this.balance = value
  //     }, e => {this.setStatus('Error getting balance; see log.')})
  // };

  // setStatus = message => {
  //   this.status = message;
  // };

  // sendCoin = () => {
  //   this.setStatus('Initiating transaction... (please wait)');

  //   this.MetaCoinService.SendCoin(this.account, this.recipientAddress, this.sendingAmount)
  //     .subscribe(() =>{
  //       this.setStatus('Transaction complete!');
  //       this.refreshBalance();
  //     }, e => this.setStatus('Error sending coin; see log.'))
  // };
}
