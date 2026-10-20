import PhotoCard from './PhotoCard.jsx'

function Gallery({ zdjecia, onUsun, onPrzelacz }) {
  return (
    <div id="galeria" className="row g-4">
      {zdjecia.map(zdjecie => (
        <div className="col-12 col-md-6 col-lg-4" key={zdjecie.id}>
          <PhotoCard
            {...zdjecie}
            onUsun={() => onUsun(zdjecie.id)}
            onPrzelacz={() => onPrzelacz(zdjecie.id)}
          />
        </div>
      ))}
    </div>
  )
}

export default Gallery
