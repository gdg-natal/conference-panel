import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'speakerFilter'
})
export class SpeakerFilterPipe implements PipeTransform {

  transform(events: any, args?: any): any {
    if(events == null){
      return null;
    }
    return events.filter( event => event.titulo != undefined );
  }

}
