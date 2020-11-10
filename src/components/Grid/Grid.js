import './Grid.css';

function Grid({ data: { header = [], values = [], actions = [] } }) {
  return (
    <table className='gridTable'>
      <thead>
        <tr>
          {header.map((colName) => (
            <th key={colName}>{colName}</th>
          ))}
          {!!actions.length && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {values.map((row, index) => (
          <tr key={index}>
            {header.map((colName) => (
              <td key={colName}>{row[colName]}</td>
            ))}
            {!!actions.length && (
              <td className='gridActions'>
                {actions.map(({ label, action, id }) =>
                  row[id].length > 0 ? (
                    <button onClick={() => action(row)}>{label}</button>
                  ) : null
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Grid;
