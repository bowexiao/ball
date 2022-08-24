export class EventMgr {
    private eventHash = {};

    /*
        id: 此事件的唯一id，一般使用调用的类名
        type: EventType中定义的type
        callback: 回调函数
    */
    register(id: string, type: string, callback: Function) {
        var event = { id: id, type: type, callback: callback };

        if (!this.eventHash.hasOwnProperty(type)) {
            this.eventHash[type] = [];
        }

        this.eventHash[type].push(event);
    };

    /*
        id: 注册时使用的唯一id
        type: EventType中定义的type
    */
    unregister(id: string, type: string) {
        var events = this.eventHash[type];
        if (events && events.length > 0) {
            events.forEach((event, index) => {
                if (event.id === id && event.type === type) {
                    events.splice(index, 1);
                }
            });
        };
    };

    /*
        type: EventType中定义的type
        data: 额外参数
    */
    dispatch(type: string, ...data) {
        var events = this.eventHash[type];
        if (events && events.length > 0) {
            for (var i in events) {
                var event = events[i];
                if (typeof (event.callback) == "function" && !!event.id) {
                    event.callback(...data);
                }
            }
        }
    };
}


