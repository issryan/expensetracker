import { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [datetime, setDatetime] = useState('');
  const [description, setDescription] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    const transaction = { name, datetime, description };

    const response = await fetch('http://localhost:5001/api/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, datetime, description }),
    });


    if (response.ok) {
      // Handle success, such as clearing the form or fetching the updated list
      console.log("Transaction added successfully");
      // Reset form fields
      setName('');
      setDatetime('');
      setDescription('');
      // Optionally, fetch the updated transactions list
    } else {
      // Handle error
      console.error("Failed to add transaction");
    }
  };

  return (
    <>
      <main>
        <h1>400<span>.00</span></h1>
        <form onSubmit={handleSubmit}>
          <div className='basic-input'>
            <input type="text"
              value={name}
              onChange={ev => setName(ev.target.value)}
              placeholder='bought new tv' />
            <input type="date"
              onChange={ev => setDatetime(ev.target.value)}
              value={datetime} />
          </div>
          <div className='description'>
            <input type="text" placeholder='description'
              value={description}
              onChange={ev => setDescription(ev.target.value)} />
          </div>
          <button type='submit'>Add new transaction</button>
        </form>
        <div className='transactions'>
          <div className='transaction'>
            <div className='left'>
              <div className='name'>New samsung tv</div>
              <div className='description'>about time</div>

            </div>
            <div className='right'>
              <div className='price red'>-$800</div>
              <div className='datetime'>2022</div>
            </div>
          </div>

          <div className='transaction'>
            <div className='left'>
              <div className='name'>New Macbook</div>
              <div className='description'>about time</div>

            </div>
            <div className='right'>
              <div className='price red'>-$1000</div>
              <div className='datetime'>2022</div>
            </div>
          </div>

          <div className='transaction'>
            <div className='left'>
              <div className='name'>Salary</div>
              <div className='description'>about time</div>

            </div>
            <div className='right'>
              <div className='price green'>+$600</div>
              <div className='datetime'>2022</div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default App;
