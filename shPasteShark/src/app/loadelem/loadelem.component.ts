import { Component, OnInit, Input } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'elemloader',
  templateUrl: './loadelem.component.html',
  styleUrls: ['./loadelem.component.less']
})
export class LoadelemComponent implements OnInit {
  @Input() uri;
  yourtext:string="";
  rlw:string="";
  constructor(private http:HttpClient) { }
  loads(vv:string){
	  this.rlw="";
    if(vv!=""){
      class xxu{
        public id:number;
        public tok:string;
        public content:string;
      }
      class ele{
        public err:boolean;
        public your:xxu[];
      }
      const exits:string = localStorage.getItem(`x${vv}`);
      if(exits){
        this.yourtext=exits;
        this.rlw=`${this.uri}/raw?tk=${encodeURI(vv)}`;
      }else{
        this.http.get<ele>(this.uri,{ params: { tk: vv } }).subscribe(list=>{
          if(list.err){
            this.yourtext="404 Not Found";
          }else{
            this.yourtext="";
            for(let e of list.your){
              this.yourtext+=`${e.content}\n`;
            }
            this.rlw=`${this.uri}/raw?tk=${encodeURI(vv)}`;
            localStorage.setItem(`x${vv}`, this.yourtext);
          }
        });
      }
    }else{
      this.yourtext="Not Found!";
    }
  }
  ngOnInit(): void {
	  const hashs:string=document.location.hash;
	  if(hashs!=""&&hashs&&hashs!="#"){
		  this.loads(hashs.replace("#",""));
	  }
  }

}
