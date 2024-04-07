import './Logo.scss';

export function Logo(props) {
    let size = props.size || '10rem';
    let alternate = props.alternate || false;
    return (        
      <div className='logo-wrapper home-logo-size'>
        <div className={'logo '+props.theme}>
          <div className={alternate ? 'cyber-l' : 'cyber-sm'}>CYBER</div>
          <div className={alternate ? 'muse-sm' : 'muse-l'}>MUSE</div>
        </div>          
      </div>
    )
}
