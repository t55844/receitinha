
export const eventEmitter = {
    _events: {},
    dispatch(event: string, data: any) {
        console.log(event, data)
        if (!this._events[event]) return;
        this._events[event].forEach(callback => callback(data))
    },
    subscribe(event: string, callback: (data: any) => any) {
        console.log(event)
        if (!this._events[event]) this._events[event] = [];
        this._events[event].push(callback);
    },
    unsubscribe(event: string) {
        if (!this._events[event]) return;
        delete this._events[event];
    }
}