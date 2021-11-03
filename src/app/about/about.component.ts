import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import {
  concat,
  fromEvent,
  interval,
  noop,
  observable,
  Observable,
  of,
  timer,
  merge,
  Subject,
  BehaviorSubject,
  AsyncSubject,
  ReplaySubject,
} from "rxjs";
import {
  delayWhen,
  filter,
  map,
  shareReplay,
  take,
  tap,
  timeout,
} from "rxjs/operators";
import { createHttpObservable } from "../common/util";
import { Course } from "../model/course";

@Component({
  selector: "about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent implements OnInit {
  ngOnInit() {
    const source1$ = of(1, 2, 3);

    const source2$ = of(4, 5, 6);

    const source3$ = of(7, 8, 9);

    /**
     *  Observable.concat() concats two seperate observables.
     *  For example, ObservableA emits [1, 2] and ObservableB emits [9, 5].
     *  The ObservableA is completed when the observable emits 2. And the ObservableB is completed when the observable emits 5.
     *  I would like ObservableA to continue to emits the values of ObservableB at only the moment when ObservableA completes to emit its value, which is 2
     */

    const result$ = concat(source1$, source2$, source3$);
    result$.subscribe(console.log);
  }
}
