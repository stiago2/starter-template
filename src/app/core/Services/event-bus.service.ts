import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { filter, map } from "rxjs/operators";
import { Events } from "@core/Enums/events.enum";

@Injectable({
    providedIn: "root"
})
export class EventBusService {
    private subject = new Subject<any>();

    constructor() {}

    on(event: Events, action: any) {
        return this.subject
            .pipe(
                filter((e: EmitEvent) => e.name === event),
                map((e: EmitEvent) => e.value)
            )
            .subscribe(action);
    }

    emit(event: EmitEvent) {
        this.subject.next(event);
    }
}

export class EmitEvent {
    constructor(public name: any, public value?: any) {}
}
