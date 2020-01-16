import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from './note';
import { NotesService } from './notes.service';


// class Note{
//   title:string;
//   text:string;
// }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  errMessage:string;
  note:Note=new Note();
  //create array to store
  notes:Array<Note>=[];
  constructor(private noteService: NotesService){

  }
  ngOnInit(){
    this.noteService.getNotes().subscribe(
      data=>{
        console.log(data);
        this.notes=data;
      },
      (error)=>{
        this.errMessage = error.message;
      }
      )

  }
  takeNote(){
    if(this.note.text =='' || this.note.title=='')
    this.errMessage='Title and Text both are required fields';
    else{
    

    // console.log(this.note);
    this.noteService.addNote(this.note).subscribe(
      data=>{this.notes.push(this.note);
      },(error)=>{
        this.errMessage = error.message;
      }
      

    )
    //push it here
    
    this.note=new Note();
  }
}

}
