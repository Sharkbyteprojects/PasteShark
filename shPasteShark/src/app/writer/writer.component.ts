import { Component, OnInit, Input } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'writer',
  templateUrl: './writer.component.html',
  styleUrls: ['./writer.component.less']
})

export class WriterComponent implements OnInit {
  @Input() uri:string;
  warn:string="";
  lists:boolean=true;
  thd:string="Hide";
  urisss:string="";
  okm:string="";
  tgl(){
    this.lists=!this.lists;
    localStorage.setItem("isOpens", JSON.stringify({list:this.lists}));
    if(this.lists){
      this.thd="Hide"
    }else{
      this.thd="Show";
    }
  }
  constructor(private http:HttpClient) { }
  cde(){
    localStorage.removeItem("unsavedChanges");
  }
  nullit(el:string){
    this.warn='';
    this.okm="";
    if(el!=localStorage.getItem("unsavedChanges")){
      localStorage.setItem("unsavedChanges", el);
    }
  }
  saves(strings:string){
    class elems{
      public err:string;
      public your:string;
    }
    console.log(strings);
    if(strings.split(" ").join("")!=""){
      try{
        this.http.post<elems>(this.uri, {content: strings}).subscribe(list=>{
          if(list.err){
            this.warn="Some error on serverside occured!";
            console.error(list.your);
          }else{
            this.okm=list.your;
            localStorage.removeItem("unsavedChanges");
          }
        });
      }catch(e){
        console.error(e);
        this.warn="Some error occured";
      }
    }else{
      this.warn="You need to type Something!!";
    }
  }
  con:string="";
  ngOnInit(): void {
	this.urisss=`${document.location.protocol}//${document.location.host}`;
    const xx:string=localStorage.getItem("unsavedChanges");
    if(xx){
      this.con=xx;
    }
    const iop:string=localStorage.getItem("isOpens");
    if(iop){
      this.lists=JSON.parse(iop).list;
    }
	const hashs:string=document.location.hash.replace("#", "");
	if(hashs!=""&&hashs){
		this.lists=false;
	}
    if(!this.lists){
      this.thd="Show";
    }
  }

}
