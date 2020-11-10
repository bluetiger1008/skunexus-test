import React from 'react';
import { useSelector } from 'react-redux';

const Details = () => {
  const details = useSelector((state) => state.app.planetDetail);

  return (
    <div>
      <h1>Planet Details</h1>
      <p>name: {details.name}</p>
      <p>climate: {details.climate}</p>
      <p>diameter: {details.diameter}</p>
      <p>gravity: {details.gravity}</p>
      <p>orbital_period: {details.orbital_period}</p>
      <p>population: {details.population}</p>
      <p>rotation_period: {details.rotation_period}</p>
      <p>surface_water: {details.surface_water}</p>
      <p>terrain: {details.terrain}</p>
    </div>
  );
};

export default Details;
