import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchPlanets, goToFilms, goToResidents } from '../../actions';
import './Planets.css';
import Grid from '../Grid';
import CreatePlanet from '../Modals';

function Planets() {
  let history = useHistory();
  const [tableData, setTableData] = useState(null);
  const dispatch = useDispatch();
  const planets = useSelector((state) => state.planets.items);
  const [openCreateModal, setOpenCreateModal] = useState(false);

  useEffect(() => {
    dispatch(fetchPlanets());
  }, []);

  useEffect(() => {
    if (planets.length > 0) {
      const newPlanets = planets.map((planet) => ({
        ...planet,
        residentsLength: planet.residents.length,
        filmsLength: planet.films.length,
      }));
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
          'residentsLength',
          'filmsLength',
        ],
        values: newPlanets,
        actions: [
          {
            label: 'Go to Films',
            action: (row) => {
              console.log(`redirect to grid with ${row.films.length} Films`);
              dispatch(goToFilms(row.films));
              history.push(`/films`);
            },
            id: 'films',
          },
          {
            label: 'Go to Residents',
            action: (row) => {
              console.log(
                `redirect to grid with ${row.residents.length} Residents`
              );
              dispatch(goToResidents(row.residents));
              history.push(`/residents`);
            },
            id: 'residents',
          },
        ],
      };

      setTableData(data);
    }
  }, [planets]);

  const openModal = () => {
    setOpenCreateModal(true);
  };

  const closeModal = () => {
    setOpenCreateModal(false);
  };

  return (
    <div className='App'>
      <h1>Star Wars Planets</h1>

      <button onClick={openModal}>Create planet</button>
      <CreatePlanet open={openCreateModal} closeModal={closeModal} />
      {tableData ? <Grid data={tableData} /> : <p>Loading</p>}
    </div>
  );
}

export default Planets;
