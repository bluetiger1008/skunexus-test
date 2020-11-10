import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
  fetchPlanets,
  viewPlanet,
  goToFilms,
  goToResidents,
} from '../../actions';
import './Planets.css';
import Grid from '../Grid';
import EditPlanet from '../Modals';

function Planets() {
  let history = useHistory();
  const [tableData, setTableData] = useState(null);
  const dispatch = useDispatch();
  const planets = useSelector((state) => state.app.planets);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [planetToEdit, setPlanetToEdit] = useState(null);

  useEffect(() => {
    dispatch(fetchPlanets());
  }, []);

  const onEditPlanet = (planet) => {
    setPlanetToEdit(planet);
    setOpenCreateModal(true);
  };

  useEffect(() => {
    if (planets.length > 0) {
      const newPlanets = planets.map((planet) => ({
        ...planet,
        residentsLength: planet.residents.length,
        filmsLength: planet.films.length,
      }));
      const data = {
        header: [
          {
            id: 'name',
            label: 'name',
            type: 'string',
          },
          {
            id: 'rotation_period',
            label: 'rotation period',
            type: 'number',
          },
          {
            id: 'orbital_period',
            label: 'orbital period',
            type: 'number',
          },
          {
            id: 'diameter',
            label: 'diameter',
            type: 'number',
          },
          {
            id: 'climate',
            label: 'climate',
            type: 'string',
          },
          {
            id: 'gravity',
            label: 'gravity',
            type: 'string',
          },
          {
            id: 'terrain',
            label: 'terrain',
            type: 'string',
          },
          {
            id: 'surface_water',
            label: 'surface water',
            type: 'number',
          },
          {
            id: 'population',
            label: 'population',
            type: 'number',
          },
          {
            id: 'residentsLength',
            label: 'residents',
            type: 'number',
          },
          {
            id: 'filmsLength',
            label: 'films',
            type: 'number',
          },
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
            checkVisible: true,
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
            checkVisible: true,
          },
          {
            label: 'Edit Planet',
            action: (row) => {
              onEditPlanet(row);
            },
          },
          {
            label: 'View Planet',
            action: (row) => {
              dispatch(viewPlanet(row));
              history.push(`/planets/${row.name}/details`);
            },
          },
        ],
      };

      setTableData(data);
    }
  }, [planets]);

  const closeModal = () => {
    setOpenCreateModal(false);
    setPlanetToEdit(null);
  };

  return (
    <div className='App'>
      <h1>Star Wars Planets</h1>

      {planetToEdit && (
        <EditPlanet
          planet={planetToEdit}
          open={openCreateModal}
          closeModal={closeModal}
        />
      )}

      {tableData ? <Grid data={tableData} /> : <p>Loading</p>}
    </div>
  );
}

export default Planets;
