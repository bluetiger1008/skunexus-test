import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Films = () => {
  const params = useParams();

  useEffect(() => {
    const { planetId } = params;
  }, []);

  return <div>Test</div>;
};

export default Films;
