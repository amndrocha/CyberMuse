import './Blur.scss';


export function Blur(props) {
    let radial = 'radial-gradient(circle, '+props.color+'0%, rgba(0,0,0,0) 70%)';
    return (
        <div className='blur-container' style={{width: props.size, backgroundColor: props.color ? props.color : 'red', background: radial}}>
            <div className='blur-dummy' style={{marginTop: props.size}}></div>
            <div className='blur'></div>
        </div>
    )
}
