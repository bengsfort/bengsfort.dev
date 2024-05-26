type EventTypes<Map> = keyof Map;

type EventPayloads<
  Map,
  Event extends EventTypes<Map> = EventTypes<Map>,
> = Map[Event] extends unknown[] ? Map[Event] : unknown[];

type EventListener<Map, Event extends EventTypes<Map> = EventTypes<Map>> = (
  ...args: EventPayloads<Map, Event>
) => unknown;

export class EventEmitter<EventMap> {
  #_listeners = new Map<EventTypes<EventMap>, Set<EventListener<EventMap>>>();

  public addListener<EventName extends EventTypes<EventMap> = EventTypes<EventMap>>(
    eventName: EventName,
    listener: EventListener<EventMap, EventName>,
  ): void {
    if (!this.#_listeners.has(eventName)) {
      this.#_listeners.set(eventName, new Set());
    }

    const listeners = this.#_listeners.get(eventName) as Set<
      EventListener<EventMap, EventName>
    >;
    listeners?.add(listener);
  }

  public removeListener<EventName extends EventTypes<EventMap> = EventTypes<EventMap>>(
    eventName: EventName,
    listener: EventListener<EventMap, EventName>,
  ): void {
    if (!this.#_listeners.has(eventName)) {
      return;
    }

    const listeners = this.#_listeners.get(eventName) as Set<
      EventListener<EventMap, EventName>
    >;
    listeners?.delete(listener);
  }

  public emit<EventName extends EventTypes<EventMap> = EventTypes<EventMap>>(
    eventName: EventName,
    ...payload: EventPayloads<EventMap, EventName>
  ): void {
    if (!this.#_listeners.has(eventName)) {
      return;
    }

    const listeners = this.#_listeners.get(eventName);
    listeners?.forEach((cb) => cb(...payload));
  }
}
