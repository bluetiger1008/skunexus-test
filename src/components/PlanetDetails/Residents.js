import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Grid from '../Grid';

const Residents = () => {
  const [tableData, setTableData] = useState(null);
  const residents = useSelector((state) => state.residents.items);

  const fetchResidentsData = async () => {
    let residentsArr = [];

    await Promise.all(
      residents.map(async (resident) => {
        try {
          const res = await fetch(resident);
          const body = await res.json();

          console.log(body);
          residentsArr = [...residentsArr, body];
        } catch (e) {
          console.log(e);
        }
      })
    );

    const data = {
      header: [
        {
          id: 'name',
          label: 'name',
          type: 'string',
        },
        {
          id: 'skin_color',
          label: 'skin_color',
          type: 'string',
        },
        {
          id: 'gender',
          label: 'gender',
          type: 'string',
        },
        {
          id: 'height',
          label: 'height',
          type: 'number',
        },
        {
          id: 'hair_color',
          label: 'hair color',
          type: 'string',
        },
        {
          id: 'eye_color',
          label: 'eye color',
          type: 'string',
        },
        {
          id: 'mass',
          label: 'mass',
          type: 'string',
        },
      ],
      values: residentsArr,
      actions: [],
    };
    setTableData(data);
  };

  useEffect(() => {
    if (residents.length > 0) {
      // console.log(films);
      fetchResidentsData();
    }
  }, [residents]);

  return (
    <div className='App'>
      <h1>Residents</h1>

      {residents.length === 0 ? (
        <p>No Planet Selected</p>
      ) : (
        <div>{tableData ? <Grid data={tableData} /> : <p>Loading</p>}</div>
      )}
    </div>
  );
};

export default Residents;
