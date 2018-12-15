import {Component, HostListener, OnInit} from '@angular/core';
import { DataService } from '../../shared/services/data/data.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

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
  img = 'D:\\nkasturi122817\\axisbank\\Axis_SigVerify-master\\data\\1.png';
  trustedURL: SafeResourceUrl;
  category: string;
  customerID = new FormControl('');
  fileUpload: boolean;
  registeredID: any;
  verifyID: any;
  distance: string;
  state: number;
  distanceValue: number;
  screen_height: number;
  screen_width: number;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screen_height = event.target.innerHeight;
    this.screen_width = event.target.innerWidth + 15;
  }

  selectCategory(category): void {
    this.file = undefined;
    this.NewName = undefined;
    this.customerID.setValue(undefined);
    this.fileUpload = false;
    this.distance = undefined;
    this.verifyID = undefined;
    this.state = undefined;
    this.VerifyName = undefined;
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
            this.distanceValue *= 20;
          } else if (+this.distance > 2) {
            this.state = 3;
            this.distanceValue = +this.distance;
            this.distanceValue *= 20;
          }
        }
      });
    }
  }

  constructor(private dataService: DataService, private sanitizer: DomSanitizer) {
    this.trustedURL = sanitizer.bypassSecurityTrustUrl(this.img);
  }

  ngOnInit() {
    this.screen_height = window.innerHeight;
    this.screen_width = window.innerWidth + 15;
  }

}
