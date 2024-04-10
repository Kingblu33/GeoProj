import React, { useState, useEffect } from 'react';

function App() {
  const [authenticate, setAuthenticate] = useState(localStorage.getItem('authenticated'));
  const [serialNumber, setSerialNumber] = useState('');
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    getDevice(serialNumber);
  };

  const getDevice = (serial) => {
    fetch(`http://localhost:5000/getdevice/${serial}`, {
      method: "POST"
    })
      .then((response) => {
        if (response.status === 400) {
          console.log("Need to reauth")
          handleAuthenticationReset();
          throw new Error('Authenticating')
        } else if (response.status === 404) {
          console.log(response)
          throw new Error("Device not found");
        }
        else {
          return response.json()
        }
      })
      .then((responseData) => {
        if (responseData.error) {
          setData(null);
          setError(responseData)
          console.log(error)
        } else {
          setError(null);
          setData(responseData);
          console.log(responseData)
        }

      })
      .catch((err) => {
        console.log("Server Encountered an error: ", err);
        setError(err)
      });
  };

  const authenticateUser = () => {
    fetch('http://localhost:5000/authenticate', {
      method: "POST"
    })
      .then((response) => response.json())
      .then((data) => {
        if (data !== null) {
          setAuthenticate(true);
          localStorage.setItem('authenticated', 'true');
          console.log("Authenticated");
          setError(null);
          getDevice(serialNumber);
        }
      })
      .catch((error) => console.log(error));
  };

  const handleAuthenticationReset = () => {
    console.log("Authentication reset. Re-authenticating...");
    setAuthenticate(false);
    localStorage.removeItem('authenticated');
    authenticateUser();
  };

  useEffect(() => {
    if (!authenticate) {
      authenticateUser();
    }
  }, [authenticate]);


  return (

    <div className="max-w-md mx-auto p-6 bg-black rounded-md shadow-md m-9 text-white">
      <form onSubmit={submit}>
        <label className="block mb-2 text-white">Enter Serial Number</label>
        <input
          type="text"
          value={serialNumber}
          onChange={(event) => setSerialNumber(event.target.value)}
          className="w-full border border-gray-600 rounded-md px-3 py-2 mb-4 focus:outline-none focus:border-blue-500 bg-gray-900 text-white"
        />
        <button
          type='submit'
          className={`w-full py-2 rounded-md focus:outline-none ${serialNumber.length < 5 || serialNumber.length > 12 ? 'bg-gray-500 text-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600 focus:bg-blue-600'}`}
          disabled={serialNumber.length < 5 || serialNumber.length > 12}
        >
          Submit
        </button>
      </form>

      {data && data.device && error === null ? (
        <div className='max-h-96 overflow-y-auto mt-6'>
          <table className="w-full mt-6">
            <thead>
              <tr>
                <th className="border border-gray-600 px-4 py-2">Status</th>
                <th className="border border-gray-600 px-4 py-2">Device</th>
                <th className="border border-gray-600 px-4 py-2">Date</th>
                <th className="border border-gray-600 px-4 py-2">Serial Number</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-600 px-4 py-2">{data.status}</td>
                <td className="border border-gray-600 px-4 py-2">{data.device.name}</td>
                <td className="border border-gray-600 px-4 py-2">{data.lastCom}</td>
                <td className="border border-gray-600 px-4 py-2">{data.serialNumber}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : error !== null && error.message ? (
        <div className="mt-6">
          <p className="text-red-600 mb-2">{error.serialNumber}</p>
          <p className="text-red-600">{error.message}</p>
        </div>
      ) : ""}
    </div>


  );
}

export default App;

