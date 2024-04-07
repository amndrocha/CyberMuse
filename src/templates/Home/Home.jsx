import { useState } from 'react'
import { supabase } from '../../supabase';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Logo } from '../../components/Logo/Logo';

import './Home.scss'
import { Glare } from '../../components/Glare/Glare';

function Home() {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const heart = '<3';
  const [emailSent, setEmailSent] = useState(false);

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
        setEmailSent(true)
      }
    }
  }

  const emailBtn = (dummy) => {
    if (dummy) {
      return (
        <button className='opacity-0'>ok!</button>
      )
    } else {
      return (
        <button>ok!</button>
      )      
    }

  }
  const emailInput = (dummy) => {
    if (dummy) {
      return (
        <input placeholder='Insert email to begin' type='text' className='glare-dummy'/>
      )
    } else {
      return (
        <input type='text'/>
      )      
    }
  } 

  const theme = useSelector(state => state.shared.theme);
  const isDark = theme === 'dark-theme';
  return (
    <div className={theme+' page'}>

      <div className='flex-column g-0' style={{width: '300px'}}>
        Loading *✧•｡˖
        <div className='center' style={{height: '1.9rem'}}>
          <div className='heading2'>manifest who you are</div>          
        </div>

        <div className='body'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente beatae voluptates accusantium perferendis, vitae cumque earum! Asperiores doloribus voluptatem officiis. Cupiditate exercitationem qui aut, labore laborum culpa ratione repellat reiciendis!</div>         
      </div>
      <div className='absolute d-flex g-0 bottom-0 right-0 p-3'>
        <Glare radius='20px' element={() => emailInput(false)} dummy={() => emailInput(true)}/>
        <Glare radius='20px' element={() => emailBtn(false)} dummy={() => emailBtn(true)}/>
      </div>
    </div>

  )
}

export default Home
