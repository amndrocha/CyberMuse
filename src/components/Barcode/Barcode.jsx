import './Barcode.scss';

export function Barcode (props) {
    let bars = new Array(props.bars).fill(0);
    bars = bars.map(e => {
        return(Math.floor(Math.random() * 4))
    });
    let height = props.height * 3;
    let box = height - (props.height / 2);
    return (
        <div className='barcode' style={{height: box+'rem'}}>
            {
                bars.map((bar,i) => {
                    return(
                        <div key={'bar'+i} className={'bar'+bar} style={{height: height+'rem'}}></div>
                    )
                })
            }            
        </div>
    )
}
