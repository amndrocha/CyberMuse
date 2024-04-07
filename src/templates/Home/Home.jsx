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
        <button onClick={() => setEmailSent(true)} className='glare-dummy'>
        <span className={emailSent ? 'dissappear slow opacity-0' : ''}>ok</span>
          <span className={emailSent ? 'appear fit' : 'd-none'}>{t('home.email.confirmation')}</span>
        </button>
      )
    } else {
      return (
        <button><span className='opacity-0'>{emailSent ? t('home.email.confirmation') : 'ok'}</span></button>
      )      
    }

  }
  const emailInput = (dummy) => {
    if (dummy) {
      return (
        <input placeholder={t('home.email.placeholder')} type='text' className='glare-dummy'/>
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
    <div className={theme+' page p-3 homepage justify-between'}>
      <div className='d-flex max-width'>
        <div>
          <div className='d-flex heading3' style={{width: '100%'}}>
            <div className='ellipsis heading3' style={{whiteSpace: 'nowrap'}}>
              *✧•｡˖.......................................................................
            </div>
          </div>

          <div className='flex-column g-0 section-width'>
            <div className='break'></div>
            <Logo size='10rem'/>
            <div className='center break'>
              <div className='heading2'>{t('home.slogan')}</div>          
            </div>
            <div className='body'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente beatae voluptates accusantium perferendis, vitae cumque earum! Asperiores doloribus voluptatem officiis. Cupiditate exercitationem qui aut, labore laborum culpa ratione repellat reiciendis!</div>         
          </div>          
        </div>

      </div>

      <div className='max-width d-flex justify-end'>
        <div className='d-flex justify-end fit bottom-0 right-0 g-0'>
          <span className={emailSent ? 'dissappear' : ''}><Glare radius='20px' element={() => emailInput(false)} dummy={() => emailInput(true)}/></span>
          <Glare radius='20px' element={() => emailBtn(false)} dummy={() => emailBtn(true)}/>
        </div>        
      </div>
    </div>

  )
}

export default Home
