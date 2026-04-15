# Shared Event Dispatcher Guide

This guide walks you through using the shared `EventDispatcher` now after setup, and then bolting on listeners later.

## What exists now

- An `EventDispatcher` service lives in `event-emitter.service.ts`
- Only the bare dispatch methods are in place:
  - `dispatch(event, payload)`
  - `dispatchAsync(event, payload)`
- And yep, no listeners are connected yet in this phase.

## Step-by-step: use the dispatcher in a service

1. Import the dispatcher:

```ts
import { EventDispatcher } from '@shared/application/services/event-emitter.service';
```

2. Inject it via your constructor:

```ts
constructor(private readonly eventDispatcher: EventDispatcher) {}
```

3. Fire an event after your domain work finishes:

```ts
this.eventDispatcher.dispatch('user.created', {
  userId: user.id,
  email: user.email,
});
```

4. If your handlers need async sequencing, do this instead:

```ts
await this.eventDispatcher.dispatchAsync('user.created', {
  userId: user.id,
  email: user.email,
});
```

## Step-by-step: add listeners later (next phase)

1. Add a listener class inside the module that owns the behavior (example: notifications):

```ts
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class UserCreatedListener {
  @OnEvent('user.created')
  handleUserCreated(payload: { userId: string; email: string }): void {
    // Put side effects here (send notification, enqueue a job, etc.)
  }
}
```

2. Register that listener in the module's providers:

```ts
providers: [UserCreatedListener];
```

3. Keep event naming consistent as things grow:

- At first, string literals are totally fine.
- Once you have a bunch of events, switch to shared constants/enums.

## Replaceable example names

- Event names you can swap out:
  - `user.created`
  - `appointment.booked`
  - `salon.member.invited`
- Payload keys should change to match whatever your case needs.

## Notes

- This is purposely minimal.
- There is no notification or ping coupling baked in.
- Add listeners module by module only when the business behavior is actually ready.
