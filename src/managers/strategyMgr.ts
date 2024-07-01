import { PricingStrategy, DriverMatchingStrategy } from '../types';

export class StrategyMgr {
    constructor(
        public pricingStrategy: PricingStrategy, 
        public driverMatchingStrategy: DriverMatchingStrategy,
    ) {}
}
