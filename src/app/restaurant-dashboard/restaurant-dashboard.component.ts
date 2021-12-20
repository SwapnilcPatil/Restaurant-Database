import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { RestaurantData } from './restaurant.model';

@Component({
  selector: 'app-restaurant-dashboard',
  templateUrl: './restaurant-dashboard.component.html',
  styleUrls: ['./restaurant-dashboard.component.css'],
})
export class RestaurantDashboardComponent implements OnInit {
  formValue!: FormGroup;
  restaurantModelObj: RestaurantData = new RestaurantData();
  allRestaurantData:any;
  showAdd!:boolean;
  showbtn!:boolean;

  constructor(private formBuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: [''],
    });
    this.getAllData();
  }

  clickAddResto(){
    this.formValue.reset();
    this.showAdd=true;
    this.showbtn=false;
  }
  //Subscribing data which is mapped via services
  addRestaurant() {
    this.restaurantModelObj.name = this.formValue.value.name;
    this.restaurantModelObj.email = this.formValue.value.email;
    this.restaurantModelObj.mobile = this.formValue.value.mobile;
    this.restaurantModelObj.address = this.formValue.value.address;
    this.restaurantModelObj.services = this.formValue.value.services;

    this.api.postRestaurant(this.restaurantModelObj).subscribe(
      (res) => {
        console.log(res);
        alert('Restaurant Records added successfully');
        this.formValue.reset();
        this.getAllData();
      },
      (err) => {
        alert('Error occured while adding Restaurant');
      }
    );
  }

  //Get all Data
  getAllData() {
    this.api.getRestaurant().subscribe((res) => {
      this.allRestaurantData = res;
    });
  }

  //Delete Data
  deleteResto(data: any) {
    this.api.deleteRestaurant(data.id).subscribe((res) => {
      alert('Restaurant Record Deleted');
      this.getAllData();
    });
  }

  onEditResto(data:any){
    this.showAdd=false;
    this.showbtn=true;
    this.restaurantModelObj.id = data.id
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services);
    
  }

  updateResto(){
    this.restaurantModelObj.name = this.formValue.value.name;
    this.restaurantModelObj.email = this.formValue.value.email;
    this.restaurantModelObj.mobile = this.formValue.value.mobile;
    this.restaurantModelObj.address = this.formValue.value.address;
    this.restaurantModelObj.services = this.formValue.value.services;

    this.api.updateRestaurant(this.restaurantModelObj,this.restaurantModelObj.id).subscribe(res=>{
      alert("Details Updated")
      this.getAllData();
    })
  }

}
