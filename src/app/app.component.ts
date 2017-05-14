import { Component, ViewChild } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import _ from 'lodash';
import * as moment from 'moment';
import {max} from "rxjs/operator/max";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('scrollElement') timeline;
  items: FirebaseListObservable<any[]>;
  current: {};
  schedule = <any>[];
  clock = <String> moment().format('hh:mm');

  constructor(db: AngularFireDatabase) {
    this.items = db.list('/events/239120025/schedule');

    this.items.subscribe(this.onReport.bind(this));

    setInterval(this.clockTick.bind(this), 10000);
  }

  onReport(items) {
    this.schedule = _.orderBy(items, ['startAt']);
    const currentIndex = _.findIndex(this.schedule, { current: true });

    this.updateScroll(this.schedule.length, currentIndex);
    this.current = this.schedule[currentIndex];
  }

  updateScroll(length, currentPosition) {
    const maxSize = length * 230;
    const scrollPos = currentPosition * 210;
    const parent = this.timeline.nativeElement.parentElement;
    const maximunScroll = Math.abs(maxSize - parent.clientWidth);

    this.timeline.nativeElement.style.width = `${maxSize}px`;
    setTimeout(() => {
      parent.scroll(scrollPos > maximunScroll ? maximunScroll : scrollPos, 0);
    }, 1);
  }

  clockTick() {
    this.clock = moment().format('hh:mm');
  }
}
