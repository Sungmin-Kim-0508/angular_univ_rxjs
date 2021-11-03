import { Observable } from "rxjs";
import { Course } from "../model/course";

export function createHttpObservable(url: string): Observable<Course[]> {
  // How observable is created
  return new Observable((observer) => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch(url, { signal })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          observer.error("Request failed with status code: " + response.status);
        }
      })
      .then((body) => {
        observer.next(body);

        observer.complete();
      })
      .catch((err) => {
        observer.error(err);
      });

    return () => controller.abort();
  });
}
