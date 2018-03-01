import { Component, OnInit } from '@angular/core';

const MAX_PROFS = 15200
const LOAD_NUM = 1000

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	DisplayProfs = []
	Profs = Array.from(Array(MAX_PROFS).keys()) 

  constructor() {
  	this.Profs = this.Shuffle(this.Profs)
  	this.LoadMore()
   }

  Shuffle(a) {
		for (let i = a.length - 1; i > 0; i--) {
		   const j = Math.floor(Math.random() * (i + 1));
		   [a[i], a[j]] = [a[j], a[i]];
		}
		return a;
  }

  LoadMore(){
  	var length = this.DisplayProfs.length
  	console.log(this.DisplayProfs)
  	this.DisplayProfs = this.DisplayProfs.concat(this.Profs.slice(length,length+LOAD_NUM))
  	console.log(this.DisplayProfs)
  }

  ngOnInit() {
  }

}
