import { ContactService } from './../../services/contact.service';
import { Component, OnInit } from '@angular/core';
import { IContact } from 'src/app/models/IContact';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css']
})
export class ContactManagerComponent {

  public loading:boolean = false;
  public contacts:IContact[] = [];
  public errorMessage:string | null = null;

  constructor(private contactService : ContactService) { }

  ngOnInit(): void {
    this.getAllContactsFromServer();
}

  public getAllContactsFromServer(){
    this.loading  = true; // start the spinner
    this.contactService.getAllContacts().subscribe( // subscribe to the observable
      (data) => { // success callback
        this.contacts = data;
        this.loading = false; // stop the spinner
      },
      (error) => { // error callback
        this.errorMessage = error;
        this.loading = false; // stop the spinner
  });
  }

  public clickDeleteContact(contactId: string | undefined){
    if (contactId){
      this.contactService.deleteContact(contactId).subscribe((data) => {
        this.getAllContactsFromServer();
      }, (error) => {
        this.errorMessage = error;
      }); 
    }
  }
}
