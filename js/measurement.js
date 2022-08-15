"use strict";

export default class Meting {
    constructor(value, unit, timestamp) {
        this._value = value;
        this._unit = unit;
        this._timestamp = timestamp;
    }


    get value(){
        return this._value;
    }
    get unit(){
        return this._unit;
    }
    get time (){
        return this._timestamp.toLocaleString("nl-BE");
    }
    get date(){
        return this._timestamp.toLocaleDateString("nl-BE");
    }

    get htmlString(){
        return `<tr><td>${this.unit}</td><td>${this.value}</td><td>${this.time}</td></tr>`
    }
}