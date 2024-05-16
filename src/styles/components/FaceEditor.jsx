import { toPng } from 'html-to-image';
import './FaceEditor.scss';
import { useCallback, useEffect, useRef, useState } from 'react';

function FaceEditor() {
  const sensitivity = 0.1;
  const [eyeGap, setEyeGap] = useState(20);
  const [eyeHeight, setEyeHeight] = useState(70);
  const [initialPos, setInitialPos] = useState(0);
  const ref = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const [triggered, setTriggered] = useState(null);

  const triggerEyeGap = (e) => {
    setTriggered('eyeGap');
    setInitialPos(e.clientX - ref.current.getBoundingClientRect().left);
    setIsDragging(true);
  };

  const triggerEyeHeight = (e) => {
    setTriggered('eyeHeight');
    setInitialPos(e.clientY - ref.current.getBoundingClientRect().top);
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      if (triggered === 'eyeGap') {
        const newEyeGap = (e.clientX - ref.current.getBoundingClientRect().left - initialPos) * sensitivity;
        if (eyeGap + newEyeGap > 10) {
          setEyeGap(eyeGap + newEyeGap);
        }
      }
      if (triggered === 'eyeHeight') {
        const newEyeHeight = (e.clientY - ref.current.getBoundingClientRect().top - initialPos) * 0.03;
        if (eyeHeight + newEyeHeight > 0) {
          setEyeHeight(eyeHeight + newEyeHeight);
        }
      }
    }
  };

  const downloadImage = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'my-image-name.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);

  useEffect(() => {
    const makeUnselectable = (element) => {
      if (element) {
        element.classList.add('unselectable');
        element.setAttribute('unselectable', 'on');
        element.setAttribute('draggable', 'false');
        element.addEventListener('dragstart', (e) => e.preventDefault());

        Array.from(element.querySelectorAll('*')).forEach(child => {
          child.setAttribute('draggable', 'false');
          child.setAttribute('unselectable', 'on');
        });
      }
    };

    makeUnselectable(ref.current);
  }, []);

  return (
    <div className='face-wrapper'>
      <div className="face-frame" ref={ref} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
        <div className='face-shade'></div>
        <div id='eyes' className="eyes-wrapper mirror" style={{ top: eyeHeight + 'px' }}>
          <div className='eyes'>
            <div className="mirrored eye" onMouseDown={triggerEyeHeight}>
              <div className='eyeball selected'>
                <div className='iris'>
                  <img draggable="false" className='iris-base' src="./items/iris-base.png"/>
                  <img draggable="false" className='iris-color' src="./items/iris-color.png"/>
                  <img draggable="false" className='pupil' src="./items/pupil.png"/>
                </div>
              </div>
            </div>
            <div className='eye-gap' style={{ width: eyeGap + 'px' }} onMouseDown={triggerEyeGap}></div>
            <div className="eye" onMouseDown={triggerEyeHeight}>
              <div className='eyeball'>
                <div className='iris'>
                  <img draggable="false" className='iris-base' src="./items/iris-base.png"/>
                  <img draggable="false" className='iris-color' src="./items/iris-color.png"/>
                  <img draggable="false" className='pupil' src="./items/pupil.png"/>
                </div>
              </div>
            </div>
          </div>
          <img draggable="false" className="opacity-0 eye" src='./items/eye-shape.png'/>
        </div>
      </div>
      <button style={{ fontSize: '12px', marginTop: '20px' }} onClick={downloadImage}>Download Face</button>
    </div>
  );
}

export default FaceEditor;
