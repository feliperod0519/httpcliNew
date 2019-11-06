export class ContactRequest{
   personalData: PersonData;
   requestType: any = '';
   text: string = '';
}
export class PersonData{
    id: string= '';
    last_name: string= '';
    first_name: string= '';
    email: string= '';
    photo: string = 'default.jpg';
    mobile: string = '555-888-9999';
    country: string = "Canada";
    pwd: string = "HELLO";
}
