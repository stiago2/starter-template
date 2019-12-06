import { Component, OnDestroy } from "@angular/core";
import { EventBusService } from "@core/Services/event-bus.service";
import { Events } from "@core/Enums/events.enum";
import { SubSink } from "subsink";

@Component({
    selector: "loading",
    templateUrl: "./loading.component.html",
    styleUrls: ["./loading.component.scss"]
})
export class LoadingComponent implements OnDestroy {
    isLoading = false;
    private subs = new SubSink();

    constructor(private eventBusService: EventBusService) {
        this.subs.sink = this.eventBusService.on(
            Events.onLoading,
            (loading: boolean) => {
                return (this.isLoading = loading);
            }
        );
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }
}
