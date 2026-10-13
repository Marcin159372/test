




function PhotoModal({ id, title, description, imageLarge, alt }) {
  const modalId = `zdjecie${id}`
  const labelId = `${modalId}Label`

  return (
    <div className="modal fade" id={modalId} tabIndex="-1" aria-labelledby={labelId} aria-hidden="true">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title h5" id={labelId}>
              {title}
            </h2>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Zamknij"
            ></button>
          </div>
          <div className="modal-body">
            <img src={imageLarge} className="img-fluid rounded" alt={alt} />
            <p className="mt-3 mb-0 text-body-secondary">{description}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Zamknij
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PhotoModal
