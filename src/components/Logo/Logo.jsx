import './Logo.scss';

export function Logo() {
    return (        
      <div className='max-width fit-height'>
        <div className='logo-text cyber'>
          <img className='opacity-0' src='./assets/cyber.svg'/>
        </div>
        <div className='logo-text muse'>
          <img className='opacity-0' src='./assets/muse.svg'/>
        </div>
      </div>
    )
}
