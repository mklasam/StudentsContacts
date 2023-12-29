import { ActivatedRoute } from '@angular/router';
import { ContactService } from './../../services/contact.service';
import { Component, OnInit } from '@angular/core';
import { IContact } from 'src/app/models/IContact';
import { IGroup } from 'src/app/models/IGroup';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent implements OnInit{
  public loading:boolean = false;
  public contactId: string | null = null;
  public contact:IContact = {} as IContact;
  public errorMessage:string | null = null;
  public group:IGroup = {} as IGroup;

  constructor(private activatedRoute: ActivatedRoute,
    private contactService: ContactService) { 
    }

  ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe((param) => {
        this.contactId = param.get('contactId');
      });
      if(this.contactId){
        this.loading = true;
        this.contactService.getContactById(this.contactId).subscribe(
        (data) => {
          this.contact = data;
          this.loading = false;
          this.contactService.getGroupById(data.groupId).subscribe((data) => {
            this.group = data;
          })
        }, (error) => {
          this.errorMessage = error;
          this.loading = false;
        });
  }
}
  public isNotEmpty(){
    return Object.keys(this.contact).length > 0 && Object.keys(this.group).length > 0;
  }
}
