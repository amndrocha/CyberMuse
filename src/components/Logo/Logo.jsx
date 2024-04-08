import './Logo.scss';

export function Logo() {
    return (        
      <div className='max-width fit-height'>
        <img className='dark-hide' src='./assets/cyber.svg'/>
        <img className='dark-hide' src='./assets/muse.svg'/>
        <img className='light-hide' src='./assets/cyber2.svg'/>
        <img className='light-hide' src='./assets/muse2.svg'/>
        {/* <div className='logo-text cyber'>
          <img className='opacity-0' src='./assets/cyber.svg'/>
        </div>
        <div className='logo-text muse'>
          <img className='opacity-0' src='./assets/muse.svg'/>
        </div> */}
      </div>
    )
}
