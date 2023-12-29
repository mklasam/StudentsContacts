import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { IContact } from '../models/IContact';
import { IGroup } from '../models/IGroup';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private serverUrl: string = 'http://localhost:9000';

  constructor(private httpClient: HttpClient) {
   }

  public getAllContacts():Observable<IContact[]>{
    let dataURL:string = `${this.serverUrl}/contacts`;
    return this.httpClient.get<IContact[]>(dataURL).pipe(catchError(this.handleError));
  }

// GETting a Contact by ID

  public getContactById(contactId:string):Observable<IContact>{
    let dataURL : string = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.get<IContact>(dataURL).pipe(catchError(this.handleError));
  }

// POSTing a Contact

  public createContact(contact:IContact):Observable<IContact>{
    let dataURL : string = `${this.serverUrl}/contacts`;
    return this.httpClient.post<IContact>(dataURL,contact).pipe(catchError(this.handleError));
  }

// UPDATing a Contact (PUT)

public updateContact(contact:IContact, contactId: string):Observable<IContact>{
  let dataURL : string = `${this.serverUrl}/contacts/${contactId}`;
  return this.httpClient.put<IContact>(dataURL,contact).pipe(catchError(this.handleError));
}

// DELETing a Contact

public deleteContact(contactId: string):Observable<{}>{
  let dataURL : string = `${this.serverUrl}/contacts/${contactId}`;
  return this.httpClient.delete<{}>(dataURL).pipe(catchError(this.handleError));
}

// GET all Groups

public getAllGroups():Observable<IGroup[]>{
  let dataURL:string = `${this.serverUrl}/groups`;
  return this.httpClient.get<IGroup[]>(dataURL).pipe(catchError(this.handleError));
}

// GET a Group by ID

public getGroupById(groupId:string):Observable<IGroup>{
  let dataURL : string = `${this.serverUrl}/groups/${groupId}`;
  return this.httpClient.get<IGroup>(dataURL).pipe(catchError(this.handleError));
}

// Handling Errors
  public handleError(error: HttpErrorResponse){
    let errorMessage:string = '';
    if(error.error instanceof ErrorEvent){
      errorMessage = `Error: ${error.error.message}`;
    }else{
      errorMessage = `Status: ${error.status} \n Message: ${error.message}`;
      }
      return throwError(errorMessage);
  }
}
