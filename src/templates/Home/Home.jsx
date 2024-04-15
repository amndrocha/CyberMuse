import { useState } from 'react'
import { supabase } from '../../supabase';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Logo } from '../../components/Logo/Logo';

import './Home.scss'
import { Glare } from '../../components/Glare/Glare';
import { Sparkles } from '../../components/Sparkles/Sparkles';

function Home() {
  const { t, i18n } = useTranslation();
  const [emailSent, setEmailSent] = useState(false);
  const [input, setInput] = useState('');
  const language = useSelector(state => state.shared.language);
  const theme = useSelector(state => state.shared.theme);

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

  return (
    <div className={theme+' page'}>
      <div className='page-content'>
        <div className='flex-column justify-between max-height'>
          <div className='flex-column g-0 section-width' style={{paddingTop: '3rem'}}>
            <Logo/>
            <div className='slogan-wrapper pointer-events-none'>
              <img className='slogan' src={'./assets/slogan1-'+language+'.svg'}/>
              <img className='slogan-dummy' src={'./assets/slogan1-'+language+'.svg'}/>
            </div>
            <div className='body'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente beatae voluptates accusantium perferendis, vitae cumque earum! Asperiores doloribus voluptatem officiis. Cupiditate exercitationem qui aut, labore laborum culpa ratione repellat reiciendis!</div> 
            <div className='center fit g-0 desktop-hide' style={{marginTop: '1rem'}}>
              <span className={emailSent ? 'dissappear' : ''}>
                <Glare radius='20px' element={() => emailInput(false)} dummy={() => emailInput(true)}/>
              </span>

              <div className='fit relative clip corner glare-shadow p1' style={{'--radius': '20px'}}>
                  <button><span className='opacity-0'>{emailSent ? t('home.email.confirmation') : 'ok'}</span></button>
                  <div className='glare'>
                    <button onClick={() => setEmailSent(true)} className='glare-dummy'>
                      <span className={emailSent ? 'dissappear slow opacity-0' : ''}>ok</span>
                      <span className={emailSent ? 'appear fit' : 'd-none'} style={{marginLeft: '-0.5rem'}}>{t('home.email.confirmation')}</span>
                    </button>
                  </div>            
              </div>
            </div>
          </div>

          <div className='max-width d-flex justify-end mobile-hide'>
            <div className='d-flex justify-end fit g-0'>
              <span className={emailSent ? 'dissappear' : ''}>
                <Glare radius='20px' element={() => emailInput(false)} dummy={() => emailInput(true)}/>
              </span>

              <div className='fit relative clip corner glare-shadow p1' style={{'--radius': '20px'}}>
                  <button>
                    <span className='opacity-0' style={{marginLeft: '-0.5rem'}}>{emailSent ? t('home.email.confirmation') : 'ok'}</span>
                    </button>
                  <div className='glare'>
                    <button onClick={() => setEmailSent(true)} className='glare-dummy'>
                      <span style={{marginLeft: '-0.5rem'}}>{emailSent ? t('home.email.confirmation') : 'ok'}</span>
                    </button>
                  </div>            
              </div>              
            </div>        
          </div>                
        </div>   

      </div>
      <div className='sidebar-dummy'></div>
    </div>
  )
}

export default Home
