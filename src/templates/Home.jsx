import { useState } from 'react'
import { supabase } from '../supabase';
import './Home.scss'
import { useSelector } from 'react-redux';

function Home() {
  const language = useSelector(state => state.shared.language);
  const [input, setInput] = useState('');
  const heart = '<3';
  const [content, setContent] = useState('ok');

  async function insertEmail() {
    if (input !== '') {
      const { data, error } = await supabase
        .from('emails')
        .insert({ email: input });
    
      if (error) {
        console.error(error);
        console.log('Insertion failed');
      } else {
        console.log(data);
        console.log('Insertion successful');
        setInput('');
        setContent('done')
      }
    }
  }
  

  return (
      <div className='page'>
        <div className='column'>
          <div className='logo-box'>
            <div className='logo'>
              <img className='logo-stars' src='./assets/stars.png'/>
              <div className='cyber'>Cyber</div>
              <div className='muse'>Muse</div>
            </div>
          </div>

          <div>{language}</div>

          <div className='introduction'>
            Um novo jogo de moda vem aí. Nos informe o seu e-mail abaixo e seja o primeiro a saber!
          </div>
            
          <div className='input-box'>
            <input type='text' value={input} onChange={(e) => setInput(e.target.value)} placeholder='johndoe@gmail.com'/>
            <button onClick={insertEmail}>{content} {heart}</button>
          </div>
        </div>


      </div>
  )
}

export default Home
