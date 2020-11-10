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
        'name',
        'skin_color',
        'gender',
        'height',
        'hair_color',
        'eye_color',
        'mass',
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
