import { toPng } from 'html-to-image';
import './FaceEditor.scss';
import { useCallback, useEffect, useRef, useState } from 'react';

import RotateIcon from "../../assets/icons/RotateIcon";
import ResizeIcon from "../../assets/icons/ResizeIcon";

function FaceEditor() {
  const sensitivity = 0.1;
  const [eyeGap, setEyeGap] = useState(20);
  const [mirrored, setMirrored] = useState(20);
  const [eyeHeight, setEyeHeight] = useState(70);
  const [eyesSelected, setEyesSelected] = useState(false);
  const [initialPos, setInitialPos] = useState(0);
  const ref = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const [triggered, setTriggered] = useState(null);

  

  const triggerEyeGap = (e, isMirrored) => {
    setTriggered('eyeGap');
    setMirrored(isMirrored);
    setInitialPos(e.clientX - ref.current.getBoundingClientRect().left);
  };

  const triggerEyeHeight = (e) => {
    setTriggered('eyeHeight');
    setInitialPos(e.clientY - ref.current.getBoundingClientRect().top);
  };

  const handleMouseUp = () => {
    setTriggered('');
  };

  const handleMouseMove = (e) => {
    if (triggered === 'eyeGap') {
      let newEyeGap;
      newEyeGap = (e.clientX - ref.current.getBoundingClientRect().left - initialPos) * sensitivity;
      if (eyeGap + newEyeGap > 10) {
        setEyeGap(eyeGap + newEyeGap);
        if (mirrored) {
          setEyeGap(eyeGap - newEyeGap);
        } else {
          setEyeGap(eyeGap + newEyeGap);
        }
      }
    }
    if (triggered === 'eyeHeight') {
      const newEyeHeight = (e.clientY - ref.current.getBoundingClientRect().top - initialPos) * 0.1;
      if (eyeHeight + newEyeHeight > 0) {
        setEyeHeight(eyeHeight + newEyeHeight);
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
        <div className='face-container d-flex flex-column'>
          <div className='eye-top' style={{ height: eyeHeight + 'px' }}></div>
          <div id='eyes' className="eyes-wrapper mirror d-flex flex-column align-center">
            <div className='eyes'>
              <div className={eyesSelected == 'left-eye' ? "mirrored eye selected" : "mirrored eye"} onMouseDown={triggerEyeHeight} onClick={() => setEyesSelected('left-eye')}>
                <div className={eyesSelected == 'left-eye' ? "mini-button resize selected" : "d-none"}><ResizeIcon/></div>
                <div className={eyesSelected == 'left-eye' ? "mini-button rotate selected" : "d-none"}><RotateIcon/></div>
                <div className='eyeball'>
                  <div className='iris'>
                    <img draggable="false" className='iris-base' src="./items/iris-base.png"/>
                    <img draggable="false" className='iris-color' src="./items/iris-color.png"/>
                    <img draggable="false" className='pupil' src="./items/pupil.png"/>
                  </div>
                </div>
              </div>
              <div className='eye-gap d-flex align-center justify-center' style={{ width: eyeGap + 'px' }}>
                <div className='arrow left' onMouseDown={(e) => triggerEyeGap(e, true)}></div>
                <div className='line'></div>
                <div className='arrow right' onMouseDown={(e) => triggerEyeGap(e, false)}></div>
              </div>
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
          <div className='chin'></div>    
        </div>

      </div>
      <button style={{ fontSize: '12px', marginTop: '20px' }} onClick={downloadImage}>Download Face</button>
    </div>
  );
}

export default FaceEditor;
