import { Component, OnInit } from '@angular/core';
import {Observable, Subscriber} from "rxjs";

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  myImage!:Observable<any>;
  base64code!:any;

  onChange=($event: Event)=>
{
  const target=$event.target as HTMLInputElement;

  const file:File = (target.files as FileList)[0];

  console.log(file);

}
convertToBase64(file: File)
{
  const observable= new Observable((subscriber:Subscriber<any>)=>{
    this.readFile(file,subscriber);
  })

  observable.subscribe((d)=>{
    console.log(d);
    this.myImage=d;
    this.base64code=d;
  })

}
readFile(file:File,subscriber: Subscriber<any>)
{
  const filereader=new FileReader();
  filereader.readAsDataURL(file);
  filereader.onload=()=>{
    subscriber.next(filereader.result);

    subscriber.complete();
  }
  filereader.onerror=()=>{
    subscriber.error();
    subscriber.complete();
  }
}
}
