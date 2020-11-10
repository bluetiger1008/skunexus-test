import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Grid from '../Grid';

const Films = () => {
  const [tableData, setTableData] = useState(null);
  const films = useSelector((state) => state.app.selectedFilms);

  const fetchFilmsData = async () => {
    let filmDataArr = [];

    await Promise.all(
      films.map(async (film) => {
        try {
          const res = await fetch(film);
          const body = await res.json();

          console.log(body);
          filmDataArr = [...filmDataArr, body];
        } catch (e) {
          console.log(e);
        }
      })
    );

    const data = {
      header: [
        {
          id: 'title',
          label: 'title',
          type: 'string',
        },
        {
          id: 'producer',
          label: 'producer',
          type: 'string',
        },
        {
          id: 'episode_id',
          label: 'episode_id',
          type: 'string',
        },
        {
          id: 'opening_crawl',
          label: 'opening_crawl',
          type: 'string',
        },
        {
          id: 'director',
          label: 'director',
          type: 'string',
        },
      ],
      values: filmDataArr,
      actions: [],
    };
    setTableData(data);
  };

  useEffect(() => {
    if (films.length > 0) {
      // console.log(films);
      fetchFilmsData();
    }
  }, [films]);

  return (
    <div className='App'>
      <h1>Films</h1>

      {films.length === 0 ? (
        <p>No Planet Selected</p>
      ) : (
        <div>{tableData ? <Grid data={tableData} /> : <p>Loading</p>}</div>
      )}
    </div>
  );
};

export default Films;
