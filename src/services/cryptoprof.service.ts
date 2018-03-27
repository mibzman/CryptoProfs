import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Web3Service } from './web3.service'

const CryptoProfsArtifacts = require('../../build/contracts/CryptoProfsMarket.json');
const contract = require('truffle-contract');

@Injectable()
export class CryptoProfService {

	CryptoProf = contract(CryptoProfsArtifacts);

  constructor(
  	private Web3Ser: Web3Service,
  	) {
  	this.CryptoProf.setProvider(Web3Ser.Web3.currentProvider);
  }

  Withdraw(): Observable<any>{
    let profContract;
    return Observable.create(observer => {
      this.CryptoProf
        .deployed()
        .then(instance => {
          profContract = instance;
          return profContract.WithdrawFees({
            from: this.Web3Ser.Account
          });
        })
        .then(() => {
          observer.next()
          observer.complete()
        })
        .catch(e => {
          console.log(e);
          observer.error(e)
        });
    })
  }

  BidProf(ProfID: number, Amount: number): Observable<any>{
    let profContract;
    return Observable.create(observer => {
      this.CryptoProf
        .deployed()
        .then(instance => {
          profContract = instance;
          return profContract.BidProf(ProfID, {
            value: this.Web3Ser.Web3.toWei(Amount, "ether"),
            from: this.Web3Ser.Account
          });
        })
        .then(() => {
          observer.next()
          observer.complete()
        })
        .catch(e => {
          console.log(e);
          observer.error(e)
        });
    })
  }

  ClaimProf(ProfID: number): Observable<any>{
    let profContract;
    return Observable.create(observer => {
      this.CryptoProf
        .deployed()
        .then(instance => {
          profContract = instance;
          return profContract.ClaimProf(ProfID, {
            value: "2146291208791208",
            from: this.Web3Ser.Account
          });
        })
        .then(() => {
          observer.next()
          observer.complete()
        })
        .catch(e => {
          console.log(e);
          observer.error(e)
        });
    })
  }

  AcceptBid(ProfID: number): Observable<any>{
    let profContract;
    return Observable.create(observer => {
      this.CryptoProf
        .deployed()
        .then(instance => {
          profContract = instance;
          return profContract.AcceptBid(ProfID, {
            from: this.Web3Ser.Account
          });
        })
        .then(() => {
          observer.next()
          observer.complete()
        })
        .catch(e => {
          console.log(e);
          observer.error(e)
        });
    })
  }

  GetOwner(ProfID: number): Observable<any>{
    let profContract;
    return Observable.create(observer => {
      this.CryptoProf
        .deployed()
        .then(instance => {
          profContract = instance;
          return profContract.profToOwner.call(ProfID, {
            from: this.Web3Ser.Account
          });
        })
        .then((ProfOwner: any) => {
          observer.next(ProfOwner)
          observer.complete()
        })
        .catch(e => {
          observer.error(e)
        });
    })
  }

  GetBid(ProfID: number): Observable<any>{
    let profContract;
    return Observable.create(observer => {
      this.CryptoProf
        .deployed()
        .then(instance => {
          profContract = instance;
          return profContract.ProfBids.call(ProfID, {
            from: this.Web3Ser.Account
          });
        })
        .then((Bid: any) => {
          observer.next(Bid)
          observer.complete()
        })
        .catch(e => {
          observer.error(e)
        });
    })
  }

  GetContractOwner(): Observable<any>{
    let profContract;
    return Observable.create(observer => {
      this.CryptoProf
        .deployed()
        .then(instance => {
          profContract = instance;
          return profContract.owner.call({
            from: this.Web3Ser.Account
          });
        })
        .then((Owner: any) => {
          observer.next(Owner)
          observer.complete()
        })
        .catch(e => {
          observer.error(e)
        });
    })
  }

}
