import React, { useState } from 'react';
import './App.css';
import { Location, Driver, Rider, Trip, PricingStrategy, DriverMatchingStrategy, Status } from './types';
import { DefaultPricingStrategy, RatingBasedPricingStrategy } from './pricingStrategies';
import { LeastTimeBasedMatchingStrategy, HighestRatedMatchingStrategy } from './driverMatchingStrategies';

const App: React.FC = () => {
    const [startLatitude, setStartLatitude] = useState<number>(0);
    const [startLongitude, setStartLongitude] = useState<number>(0);
    const [endLatitude, setEndLatitude] = useState<number>(0);
    const [endLongitude, setEndLongitude] = useState<number>(0);
    const [pricingStrategy, setPricingStrategy] = useState<string>('default');
    const [matchingStrategy, setMatchingStrategy] = useState<string>('leastTime');

    const [trip, setTrip] = useState<Trip | null>(null);

    const driver1 = new Driver(1, 'Paul Walker', 8.2);
    const driver2 = new Driver(2, 'Lewis Hamilton', 9.2);
    
    const rider = new Rider(1, 'Dwayne Johnson');

    const availableDrivers: Driver[] = [driver1, driver2];

    const handleBookTrip = () => {
        const startLocation = new Location(startLatitude, startLongitude);
        const endLocation = new Location(endLatitude, endLongitude);

        let pricing: PricingStrategy;
        if (pricingStrategy === 'ratingBased') {
            pricing = new RatingBasedPricingStrategy();
        } else {
            pricing = new DefaultPricingStrategy();
        }

        let matching: DriverMatchingStrategy;
        if (matchingStrategy === 'highestRated') {
            matching = new HighestRatedMatchingStrategy();
        } else {
            matching = new LeastTimeBasedMatchingStrategy();
        }

        const matchedDriver = matching.findDriver(availableDrivers, startLocation);

        if (matchedDriver) {
            matchedDriver.status = Status.BOOKED;
            const fare = pricing.calculatePrice(startLocation, endLocation);
            const newTrip = new Trip(1, rider, matchedDriver, startLocation, endLocation, fare);
            setTrip(newTrip);
        } else {
            alert('No available drivers.');
        }
    };

    const handleClearFields = () => {
        setStartLatitude(0);
        setStartLongitude(0);
        setEndLatitude(0);
        setEndLongitude(0);
        setPricingStrategy('default');
        setMatchingStrategy('leastTime');
        setTrip(null);
    };

    return (
        <div className="container">
            <h1>Uber/Ola - LLD Demo</h1>
            <div className="form-row">
                <div className="form-group">
                    <label>
                        Start Latitude:
                        <input type="number" value={startLatitude} onChange={(e) => setStartLatitude(Number(e.target.value))} />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Start Longitude:
                        <input type="number" value={startLongitude} onChange={(e) => setStartLongitude(Number(e.target.value))} />
                    </label>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group">
                    <label>
                        End Latitude:
                        <input type="number" value={endLatitude} onChange={(e) => setEndLatitude(Number(e.target.value))} />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        End Longitude:
                        <input type="number" value={endLongitude} onChange={(e) => setEndLongitude(Number(e.target.value))} />
                    </label>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group">
                    <label>
                        Pricing Strategy:
                        <select value={pricingStrategy} onChange={(e) => setPricingStrategy(e.target.value)}>
                            <option value="default">Default</option>
                            <option value="ratingBased">Rating Based</option>
                        </select>
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Driver Matching Strategy:
                        <select value={matchingStrategy} onChange={(e) => setMatchingStrategy(e.target.value)}>
                            <option value="leastTime">Least Time</option>
                            <option value="highestRated">Highest Rated</option>
                        </select>
                    </label>
                </div>
            </div>
            <div className="button-group">
                <button className="btn" onClick={handleBookTrip}>Book Trip</button>
                <button className="btn" onClick={handleClearFields}>Clear Fields</button>
            </div>

            <div className="form-row">
                <div className="rider">
                    Rider Name: <span>{rider.name}</span>
                </div>
            </div>

            {trip && (
                <div className="trip-details">
                    <h2>Trip Details</h2>
                    <p>Driver: <span>{trip.driver.name}</span></p>
                    {/* <p>Rider: {trip.rider.name}</p> */}
                    <p>Fare: <span>${trip.fare.toFixed(2)}</span></p>
                </div>
            )}
        </div>
    );
};

export default App;
