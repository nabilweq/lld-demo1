export enum Status {
    IDLE,
    BOOKED,
    ON_TRIP
}

export class Location {
    constructor(public latitude: number, public longitude: number) {}
}

export class Driver {
    constructor(
        public id: number,
        public name: string,
        public rating: number,
        public status: Status = Status.IDLE
    ) {}
}

export class Rider {
    constructor(public id: number, public name: string) {}
}

export interface PricingStrategy {
    calculatePrice(start: Location, end: Location): number;
}

export interface DriverMatchingStrategy {
    findDriver(drivers: Driver[], location: Location): Driver | null;
}

export class Trip {
    constructor(
        public id: number,
        public rider: Rider,
        public driver: Driver,
        public startLocation: Location,
        public endLocation: Location,
        public fare: number
    ) {}
}
