import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[appHandleUnsubscribe]'
})
export class HandleUnsubscribeDirective implements OnDestroy {
  protected destroy$ = new Subject<boolean>();

  public ngOnDestroy() {
    this.destroy$.next();
  }
}
