import './Grid.css';

function Grid({ data: { header = [], values = [], actions = [] } }) {
  let numberTypeHeaders = [];
  let stringTypeHeaders = [];
  header.map((item) => {
    if (item.type === 'number') {
      numberTypeHeaders = [...numberTypeHeaders, item];
    } else {
      stringTypeHeaders = [...stringTypeHeaders, item];
    }
  });

  const sortedHeader = [...stringTypeHeaders, ...numberTypeHeaders];

  return (
    <table className='gridTable'>
      <thead>
        <tr>
          {sortedHeader.map((item) => (
            <th key={item.id}>
              {item.label} ({item.type})
            </th>
          ))}
          {!!actions.length && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {values.map((row, index) => (
          <tr key={index}>
            {sortedHeader.map((item) => (
              <td key={item.id}>{row[item.id]}</td>
            ))}
            {!!actions.length && (
              <td className='gridActions'>
                {actions.map(({ label, action, id, checkVisible }) =>
                  checkVisible && row[id].length == 0 ? null : (
                    <button onClick={() => action(row)}>{label}</button>
                  )
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
