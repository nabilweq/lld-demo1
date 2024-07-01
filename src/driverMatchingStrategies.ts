import { DriverMatchingStrategy, Driver, Location, Status } from './types';

export class LeastTimeBasedMatchingStrategy implements DriverMatchingStrategy {
    findDriver(drivers: Driver[], location: Location): Driver | null {
        return drivers.find(driver => driver.status === Status.IDLE) || null;
    }
}

export class HighestRatedMatchingStrategy implements DriverMatchingStrategy {
    findDriver(drivers: Driver[], location: Location): Driver | null {
        const idleDrivers = drivers.filter(driver => driver.status === Status.IDLE);
        return idleDrivers.reduce((highest, driver) => (driver.rating > highest.rating ? driver : highest), idleDrivers[0]);
    }
}
