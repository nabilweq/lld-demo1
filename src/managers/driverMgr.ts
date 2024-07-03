import { Driver } from '../types';
import { Status } from '../common';

export class DriverMgr {
    private drivers: Driver[] = [];

    addDriver(driver: Driver): void {
        this.drivers.push(driver);
    }

    getDrivers(): Driver[] {
        return this.drivers;
    }

    updateDriverStatus(driverId: number, status: Status): void {
        const driver = this.drivers.find(d => d.id === driverId);
        if (driver) {
            driver.status = status;
        }
    }
}
