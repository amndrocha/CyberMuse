import './FaceEditor.scss'

function FaceEditor() {
  return (
    <div className='face-wrapper'>
      <div className="face-frame">
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
    </div>
    
  );
}

export default FaceEditor;
