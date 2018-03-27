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
  CurrentBid: string = "None";

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

       this.Update()
    });
  }

  Update() {
    this.CryptoProfSer.GetOwner(this.ProfID)
    .subscribe(result => {
      console.log("updating: ", result)
      if (result == this.Web3Ser.Account){
        this.ProfEmployer = 'You'
      } else if (result == this.NulAddr){
        this.ProfEmployer = 'Nobody'
      } 
      else {
        this.ProfEmployer = result
      }
    }, err => console.log(err))

    this.CryptoProfSer.GetBid(this.ProfID)
    .subscribe(result => {
      var bidder = result[0]
      if (bidder == this.Web3Ser.Account){
        bidder = "You"
      }
      this.CurrentBid= `${bidder} bid ${result[1] / 1000000000000000000} ETH`
      console.log(result)
    }, err => console.log(err))
  }

  Bid() {
    this.CryptoProfSer.BidProf(this.ProfID, this.BidAmount).subscribe(() =>{
      alert("your bid has been submitted")
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

  Claim() {
    this.CryptoProfSer.ClaimProf(this.ProfID)
    .subscribe(() => {
      setTimeout(function() {
        this.Update
      }, 5000)
    }, err => alert(err))
  }
}
