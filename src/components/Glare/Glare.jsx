import './Glare.scss';

export function Glare(props) {
    return (
        <div className='fit relative clip corner glare-shadow p1' style={{'--radius': props.radius}}>
            <props.element/>
            <div className='glare'>
                <props.dummy/>
            </div>            
        </div>

    )
}
