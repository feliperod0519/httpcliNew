export class ContactRequest{
   personalData: PersonData;
   requestType: any = '';
   text: string = '';
}
export class PersonData{
    id: string= '0';
    last_name: string= 'Cover';
    first_name: string= 'AnAlBum';
    email: string= 'anAlBumCover@dummy.ca';
    photo: string = 'default.jpg';
    mobile: string = '555-888-9999';
    country: string = "Canada";
    pwd: string = "hello";
}
