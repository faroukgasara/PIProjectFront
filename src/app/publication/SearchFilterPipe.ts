import { Pipe, PipeTransform } from '@angular/core';
import { publication } from '../model/publication.model';

@Pipe({
  name: 'searchFilter'
})

export class SearchFilterPipe implements PipeTransform {

  transform(publication: publication[], searchTerm: string): publication[] {
    if (!publication || !searchTerm) {
        return publication;
    }

    return publication.filter(publication =>
        publication.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
}
}