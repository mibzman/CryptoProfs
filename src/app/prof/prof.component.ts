import { Component, HostListener, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  CryptoProfService
} from '../../services/services'

import { Web3Service } from './../../services/web3.service'

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

  NulAddr = '0x0000000000000000000000000000000000000000'

  ProfID: number;
  BidAmount: number;

  ProfEmployer: any;

  constructor(
    private _ngZone: NgZone,
    private CryptoProfSer: CryptoProfService,
    private Web3Ser: Web3Service,
    private ARouteSer: ActivatedRoute,
    ) {
  }

  ngOnInit() {
    this.ARouteSer.params.subscribe(params => {
       this.ProfID = params['ProfID'];

       this.UpdateOwner()
    });
  }

  UpdateOwner() {
    this.CryptoProfSer.GetOwner(this.ProfID)
    .subscribe(result => {
      this.ProfEmployer = result
    }, err => console.log(err))
  }

  // Offer() {
  //   this.CryptoProfService.MakeOffer(this.ProfID, this.BidAmount).subscribe(() =>{

  //   }, error => {
  //     alert(error)
  //   })
  // }


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

  Claim() {
    this.CryptoProfSer.ClaimProf(this.ProfID)
    .subscribe(() => {
      setTimeout(() => this.UpdateOwner, 10000)
    }, err => alert(err))
  }
}
