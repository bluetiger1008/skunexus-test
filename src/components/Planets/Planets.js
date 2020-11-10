import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchPlanets } from '../../actions';
import './Planets.css';

import Grid from '../Grid';

function Planets() {
  let history = useHistory();
  const [tableData, setTableData] = useState(null);
  const dispatch = useDispatch();
  const planets = useSelector((state) => state.items);

  console.log(planets);

  useEffect(() => {
    dispatch(fetchPlanets());
  }, []);

  useEffect(() => {
    if (planets.length > 0) {
      const data = {
        header: [
          'name',
          'rotation_period',
          'orbital_period',
          'diameter',
          'climate',
          'gravity',
          'terrain',
          'surface_water',
          'population',
        ],
        values: planets,
        actions: [
          {
            label: 'Go to Films',
            action: (row) => {
              console.log(`redirect to grid with ${row.films.length} Films`);
              console.log(row);
              history.push(`/planets/${row.name}/films`);
            },
          },
          {
            label: 'Go to Residents',
            action: (row) => {
              console.log(
                `redirect to grid with ${row.residents.length} Residents`
              );
            },
          },
        ],
      };
      setTableData(data);
    }
  }, [planets]);

  return (
    <div className='App'>
      <h1>Star Wars Planets</h1>

      {tableData ? <Grid data={tableData} /> : <p>Loading</p>}
    </div>
  );
}

export default Planets;
