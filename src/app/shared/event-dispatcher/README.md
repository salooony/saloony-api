# Shared Event Dispatcher Guide

Quick rundown on using `EventDispatcher` service

### Folder structure

```bash
src/app/shared/event-dispatcher
├── enums/                               # Event name constants/types
│   └── events.enum.ts                   # Unique event identification strings
├── events/
│   └── events.ts                        # Type-safe mapper for events and payloads
│   └── [domain].event.ts                # Pyload continer for specific events
├── listeners/
│   └── [domain].listener.ts             # Logic triggered by specific events
├── ports/                               # Dispatcher interfaces (Contracts)
│   ├── event-dispatcher.interface.ts
│   └── event-listener.interface.ts
├── providers/                           # Concrete implementations (Logic)
│   └── event-dispatcher.provider.ts
├── event-dispatcher.module.ts
└── README.md
```

## Quick Start

To use event dipatcher properly, you shall first define your events, listeners and you actions according to the standards used in this project to ensure clean and robust experience.

### Define event enum

Go to `/enums/events.enum.ts`
Add the name of your event to the events enum

example:

```ts
export enum Events {
  EVENT_NAME = 'user.registeration',
}
```

> **Note:** keep your event name clear and easy to understand.

### Create your event payload

Go to `/events` and create a new class that will serve as a container for your payload

example:

```ts
export class MockEvent {
  constructor(public property: any) {}
}
```

> **Note:** Keep payloads small, and keep them explicit.

After that, head to `events.ts` and connect the new payload to your event enum as follows:

```ts
export interface Events {
  [EventsEnum.EVENT_NAME]: MockEvent;
}
```

> **Note:** you need to define a new payload for every event, it is NOT advised to use the same payload for more than one event.

### Create event listenner

Go to `/listeners` and add a new listenner to your event, note that the event listener should implement `IEventDispatcher` found in `/ports/event-listener.ts`

An example of event listener:

```ts
export class EventListener implements IEventListener {
  @OnEvent(EventsEnum.EVENT_NAME)
  async listen(event: MockEvent): Promise<boolean> {
    // implement the logic you want on event
  }
}
```

Finally add your listener to the `EventDispatcherModule` in the root of this directory as a provider and export it for external use

```ts
providers: [EventListener],
exports: [EventListener],
```

### Trigger your event

To use the event dispatcher, use the following statement to import it:

```ts
import { IEventDispatcher, EVENT_DISPATCHER, EventsEnum } from '@shared/event-dispatcher';
```

In order to trigger your event, you first need to inject the event-dispatcher service to your usecase as follows:

```ts
    @Inject(EVENT_DISPATCHER) private readonly eventDispatcher: IEventDispatcher,
```

Finally trigger the event where needed:

```ts
this.eventDispatcher.dispatch(Events.EVENT_NAME, new MockEvent(property));
```

or

```ts
const result = await this.eventDispatcher.dispatchAsync(Events.EVENT_NAME, new MockEvent(property));
```

Note that you need to import the EventDispatcherModule in your module first
