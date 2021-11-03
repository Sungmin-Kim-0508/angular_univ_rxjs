import { Component, OnInit } from "@angular/core";
import { Course } from "../model/course";
import { interval, noop, Observable, of, throwError, timer } from "rxjs";
import {
  catchError,
  delay,
  delayWhen,
  finalize,
  map,
  retryWhen,
  shareReplay,
  tap,
} from "rxjs/operators";
import { createHttpObservable } from "../common/util";
import { Store } from "../common/store.service";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;
  ngOnInit() {
    const http$: Observable<Course[]> = createHttpObservable("/api/courses");

    const courses$: Observable<Course[]> = http$.pipe(
      map((res) => Object.values(res["payload"])),
      /**
       * We want to share the execution of particular stream(this case, getting courses) across multiple subscribers
       * We want to avoid the default observable behaviour which is to create a complete new stream by subscribers
       * shareReplay() make sure that http response is going to be passed onto each new subscriptions,
       * instead of executing same api call again.
       */
      shareReplay<Course[]>()
    );

    courses$.subscribe();

    this.beginnerCourses$ = courses$.pipe(
      map((courses) =>
        courses.filter((course) => course.category === "BEGINNER")
      )
    );
    this.advancedCourses$ = courses$.pipe(
      map((courses) =>
        courses.filter((course) => course.category === "ADVANCED")
      )
    );

    courses$.subscribe(
      (courses) => {},
      noop,
      () => console.log("completed")
    );
  }
}
