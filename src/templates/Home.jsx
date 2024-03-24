import { useState } from 'react'
import { supabase } from '../supabase';
import './Home.scss'
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

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
  

  const theme = useSelector(state => state.shared.theme);
  const isDark = theme === 'dark-theme';
  return (
    <div className={theme} style={{height: '100%'}}>
      <div className='page'>
        <div className='content'>
            <div className='logo-box' style={{filter: isDark ? 'invert(1)' : 'none'}}>
                <div className='logo'>
                <img className='logo-stars' src='./assets/stars.png'/>
                <div className='cyber'>Cyber</div>
                <div className='muse'>Muse</div>
                </div>
            </div>

            <div className='home-description'>
              <div className='paragraph'>
                {t('home.description.p1')} <b>{t('home.description.p2')}</b> {t('home.description.p3')}              
              </div>
              <div className='paragraph'>
                {t('home.description.p4')}
              </div>
            </div>

            <div className='input-box'>
                <input type='text' value={input} onChange={(e) => setInput(e.target.value)} placeholder={emailSent ? t('home.email.confirmation') : t('home.email.placeholder')} disabled={emailSent}/>
                <button className={emailSent ? 'none' : 'visible'} onClick={insertEmail}>ok {heart}</button>
            </div>
        </div>
      </div>      
    </div>

  )
}

export default Home
