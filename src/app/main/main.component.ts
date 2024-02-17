import { Component, OnInit } from '@angular/core';

import { MatSidenavModule } from '@angular/material/sidenav'
import { MovieService } from '../services/movie.service'; 
import { PrimaryImage, Title } from '../models/title.model';
import { MatCardModule } from '@angular/material/card'
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { UpdateTitleComponent } from '../components/update-title/update-title.component';
// import { UpdateTitleComponent } from '../components/update-title/update-title.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    // components
    // UpdateTitleComponent,

    //modules
    MatSidenavModule, 
    CommonModule, 
    MatCardModule,
    MatButtonModule
    // MatDialogModule
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent  implements OnInit {
  constructor(
    private _movieService: MovieService,
    public dialog: MatDialog){}

  titles: Array<Title> = []

  ngOnInit(): void {
    this._movieService.test().subscribe({
      next: this.getTestRespose.bind(this),
      error: this.getErrorResponse.bind(this)
    }) 
  }

  getTestRespose(response: any){
    if(response.results) {
      // this.titles = response.results
      response.results.forEach((e: any) => {
        let primaryImage
        if(e.primaryImage) {
          primaryImage = 
           {
              id: e.primaryImage.id,
              url: e.primaryImage.url,
              width: e.primaryImage.width,
              height: e.primaryImage.height
            } as PrimaryImage
        }
        let title = {
          id: e.id,
          primaryImage,
          titleText: e.titleText.text
        } as Title
        this.titles.push(title)
      });
    }
  }

  getErrorResponse(error: any) {
    console.error(error)
  }

  editTitle(title: Title) {

    const dialogRef = this.dialog.open(UpdateTitleComponent, {
      width: '60%',
      data: title,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
