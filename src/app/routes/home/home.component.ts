import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/services/data/data.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  file: any;
  fileVerify: any;
  NewName: string;
  VerifyName: string;
  imageSrcNew: string;
  imageSrcVerify: string;
  category: string;
  customerID = new FormControl('');
  fileUpload: boolean;
  registeredID: any;
  verifyID: any;
  distance: string;
  state: number;
  distanceValue: number;

  selectCategory(category): void {
    this.category = category;
    if (this.category === 'existing') {
      this.dataService.retrieveID().subscribe(response => {
        if (response) {
          this.registeredID = response;
        }
      });
    }
  }

  selectNewFile(files: any): void {
    this.file = files[0];
    this.NewName = this.file.name;
    const reader = new FileReader();
    reader.onload = e => this.imageSrcNew = reader.result;
    reader.readAsDataURL(this.file);
  }

  selectVerifyFile(files: any): void {
    this.fileVerify = files[0];
    this.VerifyName = this.fileVerify.name;
    const reader = new FileReader();
    reader.onload = e => this.imageSrcVerify = reader.result;
    reader.readAsDataURL(this.fileVerify);
  }

  upload(): void {
    if (this.customerID.value !== '') {
      this.dataService.uploadData(this.file, this.customerID.value).subscribe(response => {
        if (response) {
          this.fileUpload = true;
        }
      });
    }
  }

  verify(): void {
    if (this.verifyID !== undefined) {
      this.dataService.verify(this.fileVerify, this.verifyID).subscribe(response => {
        if (response) {
          this.distance = response['distance'];
          if (+this.distance <= 1) {
            this.state = 1;
            this.distanceValue = +this.distance;
            this.distanceValue *= 20;
          } else if (+this.distance >= 1 && +this.distance <= 2) {
            this.state = 2;
            this.distanceValue = +this.distance;
            this.distanceValue -= 1;
            this.distanceValue *= 20;
          } else if (+this.distance > 2) {
            this.state = 3;
            this.distanceValue = +this.distance;
            this.distanceValue -= 2;
            this.distanceValue *= 20;
          }
        }
      });
    }
  }

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

}
