import { Person } from './Person';

export class Establishment {
   id: number;
   name: String;
   address: String;
   web_site: String;
   phone_number: String;
   mobile_number: String;
   people_on_establishment: Person[];
   constructor() {
      this.people_on_establishment = [];
   }
}