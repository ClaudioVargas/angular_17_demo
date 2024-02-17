import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { PrimaryImage, Title } from '../../models/title.model';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-update-title',
  standalone: true,
  imports: [
    MatDialogTitle, 
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './update-title.component.html',
  styleUrl: './update-title.component.css'
})
export class UpdateTitleComponent {

  title:Title
  titleForm: FormGroup

  preview: any

  constructor(
    public dialogRef: MatDialogRef<UpdateTitleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Title,
    private formBuilder: FormBuilder) {
      this.title = data
      this.titleForm = this.formBuilder.group({
        titleText: ['', Validators.required],
        img: [''],
      });
  }

  save(){
    let image = {
      id: this.title.primaryImage?.id || 0,
      // url: string
      // width: number
      // height: number
    } as PrimaryImage

    let request = {
      id: this.title.id || '',
      primaryImage: image,
      titleText: this.titleForm.controls['titleText'].value
    } as Title

    console.log("image", image)
    console.log("request", request)

    console.log("this.titleForm", this.titleForm)

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  get titleText(): string{
    return this.title.titleText || ''
  }

  handleFileInput(event: Event) {
    const target = event.target as HTMLInputElement;

    const files = target.files as FileList;

    const file = files[0];

    this.titleForm.controls['img'].setValue(file)

    this.saveFile(file);
  }

  saveFile(file: File) {
    const reader = new FileReader();

    reader.onloadend = () => {
      console.log(reader.result);

      this.preview = reader.result as string;

      localStorage.setItem('img', reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  readFile() {
    const profile = localStorage.getItem('img');

    console.log('reading ls image: ', profile);

    if (profile) {
      this.preview = profile;

      const contentType = profile.split(';')[0].replace('data:', '');

      const file = new File([profile], 'img.jpeg', {
        type: contentType,
      });
      this.titleForm.controls['img'].setValue(file)
    } else {
      this.preview = '';
    }
  }

}
