   /*private Long id;
	private Date dateEvenement;
	private String titre;
	private String lieux;
	private String affiche;
	private String description;*/

import { CagnotteModel } from "./cagnotte";

    
export interface EventsModel{
        id:number,
        dateEvenement:Date,
        titre:string,
        lieux:string,
        affiche:string,
        description:string,
        typeEvenement:string,
     
 }