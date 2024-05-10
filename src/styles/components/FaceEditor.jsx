import { toPng } from 'html-to-image';
import './FaceEditor.scss';
import { useCallback, useRef } from 'react';

function FaceEditor() {
  const ref = useRef()

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return
    }

    toPng(ref.current, { cacheBust: true, })
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = 'my-image-name.png'
        link.href = dataUrl
        link.click()
      })
      .catch((err) => {
        console.log(err)
      })
  }, [ref])

  return (
    <div className='face-wrapper'>
      <div className="face-frame" ref={ref}>
        <div className='face-shade'></div>
        <div className="eyes-wrapper mirror">
          <div className='eyes'>
            <div className="mirrored eye">
              <div className='eyeball'>
                <div className='iris'>
                  <img className='iris-base' src="./items/iris-base.png"/>
                  <img className='iris-color' src="./items/iris-color.png"/>
                  <img className='pupil' src="./items/pupil.png"/>
                </div>
              </div>
            </div>
            <div className="eye">
              <div className='eyeball'>
                <div className='iris'>
                  <img className='iris-base' src="./items/iris-base.png"/>
                  <img className='iris-color' src="./items/iris-color.png"/>
                  <img className='pupil' src="./items/pupil.png"/>
                </div>
              </div>
            </div>
          </div>
          <img className="opacity-0 eye" src='./items/eye-shape.png'/>
        </div>
      </div>
      <button style={{fontSize: '12px', marginTop: '20px'}} onClick={onButtonClick}>Download Face</button>
    </div>
  );
}

export default FaceEditor;
