import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn!: boolean;
  username!: string;
  search!: FormGroup;
  Products =[{name:"Sahera 60Hz Platform" },{name:"Cyrus-series 1" },{name:"Cyrus-series 2" },{name:"Gyasi-138M HH "},{name:"Gyasi-190M HH"},{name:"Olympus 6-MW Platform" } ];
  HeaderSearchPayload = {
    keyword: '',
    product: ''
  };
  noValueTypedInNavBar='no';
  

  constructor( private authService: AuthService, private router: Router){}

  ngOnInit() {

    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    this.authService.username.subscribe((data: string) => this.username = data);
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUserName();

    this.search = new FormGroup({
      keyword: new FormControl(''),
      product: new FormControl('', Validators.required),
    }); 
  }


  doSearch(){
    this.HeaderSearchPayload.keyword = this.search.get('keyword')?.value;
    this.HeaderSearchPayload.product = this.search.get('product')?.value; 
    this.search.get('product')?.setValue('');
    
    console.log(this.HeaderSearchPayload);
    if(this.HeaderSearchPayload.keyword=='' && this.HeaderSearchPayload.product=='' ){
      console.log("Both product & keyword not there pls type something");
      this.noValueTypedInNavBar="yes";
      
    }


    if(this.HeaderSearchPayload.keyword!='' && this.HeaderSearchPayload.product!='' ){
      console.log("both values present")
      this.noValueTypedInNavBar="no";
      this.router.navigateByUrl("search/" + this.HeaderSearchPayload.keyword + "/" + this.HeaderSearchPayload.product   );
      
    }
    
   
    
    if(this.HeaderSearchPayload.keyword=='' && this.HeaderSearchPayload.product!=''){
      console.log("keyword empty");
      this.noValueTypedInNavBar='no';
      this.HeaderSearchPayload.keyword="null";
      this.router.navigateByUrl("search/" + this.HeaderSearchPayload.keyword + "/" + this.HeaderSearchPayload.product   );
       
    }
   
    if(this.HeaderSearchPayload.keyword!='' && this.HeaderSearchPayload.product==''){
      console.log("product empty");
      this.noValueTypedInNavBar="no";
      this.HeaderSearchPayload.product="null";
      this.router.navigateByUrl("search/" + this.HeaderSearchPayload.keyword + "/" + this.HeaderSearchPayload.product   );

    }     
    
  }

  goToCreatePost() {
    this.router.navigateByUrl('create-post');
  }

  goToUserProfile() {
    this.router.navigateByUrl('user-profile/' + this.username);
  }
  
  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigateByUrl('');
  }
  
}
