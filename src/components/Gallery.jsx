import { Fragment } from 'react'
import PhotoCard from './PhotoCard.jsx'
import PhotoModal from './PhotoModal.jsx'

function Gallery({ zdjecia, onUsun, onPrzelacz }) {
  return (
    <div id="galeria" className="row g-4">
      {zdjecia.map(zdjecie => (
        
        
        
        <Fragment key={zdjecie.id}>
          <div className="col-12 col-md-6 col-lg-4">
            <PhotoCard
              {...zdjecie}
              onUsun={() => onUsun(zdjecie.id)}
              onPrzelacz={() => onPrzelacz(zdjecie.id)}
            />
          </div>
          <PhotoModal {...zdjecie} />
        </Fragment>
      ))}
    </div>
  )
}

export default Gallery
