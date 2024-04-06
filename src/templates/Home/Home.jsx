import { useState } from 'react'
import { supabase } from '../../supabase';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Blur } from '../../components/Blur/Blur';

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
    <div className={theme+' page'} style={{height: '100%'}}>
      
    </div>

  )
}

export default Home
