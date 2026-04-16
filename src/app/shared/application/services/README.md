# Shared Event Dispatcher Guide

Quick rundown on using `EventDispatcher` once it’s already hooked up.

## What exists now

- Service file: `event-dispatcher.service.ts`
- Methods you can call:
  - `dispatch(event, payload)`
  - `dispatchAsync(event, payload)`

## Step-by-step: use the dispatcher in a service

1. First, double-check `EventDispatcher` is available in your module’s providers.

```ts
import { EventDispatcher } from '@app/shared/application/services/event-dispatcher.service';

@Module({
  providers: [EventDispatcher],
})
export class YourModule {}
```

And if the consumer sits in a different module, export `EventDispatcher` from the module that owns it, then import that module from the consumer module. Basically: make Nest able to see it.

2. Import the dispatcher in your use case/service:

```ts
import { EventDispatcher } from '@app/shared/application/services/event-dispatcher.service';
```

3. Inject it through your constructor:

```ts
constructor(private readonly eventDispatcher: EventDispatcher) {}
```

4. Define event-name constants (don’t sprinkle raw strings everywhere):

```ts
export const USER_CREATED_EVENT = 'user.created' as const;
```

5. dispatch an event after your domain work is done:

```ts
this.eventDispatcher.dispatch(USER_CREATED_EVENT, {
  userId: user.id,
  email: user.email,
});
```

6. If you actually need to wait for async listeners to finish, use this version:

```ts
await this.eventDispatcher.dispatchAsync(USER_CREATED_EVENT, {
  userId: user.id,
  email: user.email,
});
```

## Step-by-step: add listeners later (next phase)

1. Create a listener in the module that owns the behavior:

```ts
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

export const USER_CREATED_EVENT = 'user.created' as const;

@Injectable()
export class UserCreatedListener {
  @OnEvent(USER_CREATED_EVENT)
  handleUserCreated(payload: { userId: string; email: string }): void {
    // Side effects here
  }
}
```

2. Register the listener in the module’s providers:

```ts
providers: [UserCreatedListener];
```

3. Keep event naming clean:

- Use constants right away.
- And once the list starts getting big, move the constants into a single shared file.

## Event payload properties

Try to describe the event using simple, readable payload fields.

Common fields you might include:

- Entity IDs: `userId`, `salonId`, `appointmentId`
- Actor info: `actorId`, `actorRole`
- Context: `occurredAt`, `requestId`, `source`
- Business data: `email`, `status`, `reason`
- Optional tracing: `correlationId`

Example payload shape:

```ts
interface AppEventPayload {
  userId: string;
  actorId?: string;
  occurredAt: string;
  requestId?: string;
  reason?: string;
  correlationId?: string;
}
```

## Notes

- Keep payloads small, and keep them explicit.
- No notification/ping coupling during this phase.
- Add listeners module-by-module as you need them.
