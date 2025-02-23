import { useEffect,useState } from 'react';
import './App.css';

function App() {

  const [Buyers, setBuyers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:3000');
      const data = await res.json();
      setBuyers(data.Buyer);
    };
    fetchData();
  }, []);

  return (
    <>
    <h1>Buyers</h1>
    {Buyers.map(i => (
      <div key={i._id}>
        <p>{i.name}</p>
        <p>{i.email}</p>
        <p>{i.phone}</p>
        <p>{i.address}</p>
      </div>
    ))}
    </>
  );
}

export default App;
