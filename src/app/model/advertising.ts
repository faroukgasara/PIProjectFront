import { Targetedgroups } from "./targetedgroups";

export class Advertising {
    id:number;
    nom:string;
    canaux:any;
    dateDebut:Date;
    dateFin:Date;
    nbrVuesCible:number;
    nbrVuesFinal:number;
    type:any;
    populationCible:Targetedgroups[];

}

