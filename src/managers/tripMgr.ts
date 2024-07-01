import { Trip } from '../types';

export class TripMgr {
    private trips: Trip[] = [];

    addTrip(trip: Trip): void {
        this.trips.push(trip);
    }

    getTrips(): Trip[] {
        return this.trips;
    }
}
