export function Sparkles(props) {
    const el = () => {
        return(
            <></>
        )
    }
    let sparkle = props.element1 !== el;
    return (
        <>
            <div className='sparkles center justify-between heading3 absolute d-flex top-0 g-0 desktop-hide max-width'>
                <props.element1/>  
                <props.element2/>                
            </div>
            <div className='sparkles center heading3 absolute d-flex top-0 g-0 mobile-hide'>
                <props.element1/>         
                <div className='ellipsis heading3 center'>
                .........................................................................................................................................................................
                </div>
                <div style={{width: '30vw', maxWidth: '100%'}}></div>
                <props.element2/>
                <div className='sidebar-dummy'></div>                   
            </div>        
        </>

    )
}
