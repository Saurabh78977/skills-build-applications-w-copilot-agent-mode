import React, { useEffect, useState } from 'react';

const Teams = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const endpoint = `${window.REACT_APP_CODESPACE_URL}/api/teams/`;
    console.log('Fetching Teams from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(json => {
        const results = json.results || json;
        setData(results);
        console.log('Teams data:', results);
      })
      .catch(err => console.error('Error fetching teams:', err));
  }, []);

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="card-title mb-4">Teams</h2>
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                {data.length > 0 && Object.keys(data[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <tr key={item.id || idx}>
                  {data.length > 0 && Object.keys(data[0]).map((key) => (
                    <td key={key}>{typeof item[key] === 'object' ? JSON.stringify(item[key]) : item[key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {data.length === 0 && <div className="alert alert-info">No teams found.</div>}
        </div>
      </div>
    </div>
  );
};

export default Teams;
