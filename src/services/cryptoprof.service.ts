import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Web3Service } from './web3.service'

const metaincoinArtifacts = require('../../build/contracts/MetaCoin.json');
const contract = require('truffle-contract');

@Injectable()
export class CryptoProfService {

	CryptoProf = contract(metaincoinArtifacts);

  constructor(
  	private Web3Ser: Web3Service,
  	) { 
  	// Bootstrap the MetaCoin abstraction for Use
  	this.CryptoProf.setProvider(Web3Ser.Web3.currentProvider);
  }

  GetBalance(account): Observable<number> {
  	let meta;

  	return Observable.create(observer => {
  		this.CryptoProf
  		  .deployed()
  		  .then(instance => {
  		    meta = instance;
          //we use 'call' here so the client doesn't try and write, making it free
  		    return meta.getBalance.call(account, {
  		      from: account
  		    });
  		  })
  		  .then(value => {
  		    observer.next(value)
  		    observer.complete()
  		  })
  		  .catch(e => {
  		    console.log(e);
  		    observer.error(e)
  		  });
  	})
  }

  SendCoin(from, to, amount): Observable<any>{

  	let meta;
  	return Observable.create(observer => {
  	  this.CryptoProf
  	    .deployed()
  	    .then(instance => {
  	      meta = instance;
  	      return meta.sendCoin(to, amount, {
  	        from: from
  	      });
  	    })
  	    .then(() => {
  	      observer.next()
  	      observer.next()
  	    })
  	    .catch(e => {
  	    	console.log(e);
  	      observer.error(e)
  	    });
  	})
  }

  MakeOffer(ProfID: number, Amount: number): Observable<any>{
    let profContract;
    return Observable.create(observer => {
      observer.next()
      observer.complete()

      //mocked for now
      // this.CryptoProf
      //   .deployed()
      //   .then(instance => {
      //     profContract = instance;
      //     return profContract.MakeBid(ProfID, Amount, {
      //       from: this.Web3Ser.Account
      //     });
      //   })
      //   .then(() => {
      //     observer.next()
      //     observer.next()
      //   })
      //   .catch(e => {
      //     console.log(e);
      //     observer.error(e)
      //   });
    })
  }

  GetOwner(ProfID: number): Observable<any>{
    let profContract;
    return Observable.create(observer => {
      observer.next()
      observer.complete()

      //mocked for now
      this.CryptoProf
        .deployed()
        .then(instance => {
          profContract = instance;
          return profContract.getOwner.call(ProfID, {
            from: this.Web3Ser.Account
          });
        })
        .then(() => {
          observer.next()
          observer.next()
        })
        .catch(e => {
          console.log(e);
          observer.error(e)
        });
    })
  }

}
