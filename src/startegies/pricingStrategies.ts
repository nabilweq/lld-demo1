import { PricingStrategy, Location } from '../types';
import { Trip } from '../types';

export class DefaultPricingStrategy implements PricingStrategy {
    calculatePrice(trip: Trip): number {
        const baseFare = 5;
        const pricePerMile = 2;
        const distance = this.calculateDistance(trip.startLocation, trip.endLocation);
        return baseFare + pricePerMile * distance;
    }

    private calculateDistance(start: Location, end: Location): number {
        return Math.sqrt(Math.pow(start.latitude - end.latitude, 2) + Math.pow(start.longitude - end.longitude, 2));
    }
}

export class RatingBasedPricingStrategy implements PricingStrategy {
    calculatePrice(trip: Trip): number {
        const baseFare = 5;
        const pricePerMile = 2;
        const distance = this.calculateDistance(trip.startLocation, trip.endLocation);
        return baseFare + pricePerMile * distance - 1; // Simplified calculation
    }

    private calculateDistance(start: Location, end: Location): number {
        return Math.sqrt(Math.pow(start.latitude - end.latitude, 2) + Math.pow(start.longitude - end.longitude, 2));
    }
}
