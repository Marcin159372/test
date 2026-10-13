const KATEGORIE = [
  { value: 'gory', label: 'Góry' },
  { value: 'morze', label: 'Morze' },
  { value: 'miasto', label: 'Miasto' },
]




function FiltersOffcanvas({ aktywna, onWybierz }) {
  function przelacz(kategoria) {
    onWybierz(aktywna === kategoria ? 'wszystkie' : kategoria)
  }

  return (
    <div
      className="offcanvas offcanvas-start"
      tabIndex="-1"
      id="panelFiltrow"
      aria-labelledby="panelFiltrowLabel"
    >
      <div className="offcanvas-header">
        <h2 className="offcanvas-title h5" id="panelFiltrowLabel">
          Filtry
        </h2>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Zamknij"
        ></button>
      </div>

      <div className="offcanvas-body">
        <p className="text-body-secondary">Zaznacz kategorię, którą chcesz zobaczyć:</p>

        {KATEGORIE.map(kategoria => (
          <div className="form-check" key={kategoria.value}>
            <input
              className="form-check-input"
              type="checkbox"
              id={`filtr-${kategoria.value}`}
              checked={aktywna === kategoria.value || aktywna === 'wszystkie'}
              onChange={() => przelacz(kategoria.value)}
            />
            <label className="form-check-label" htmlFor={`filtr-${kategoria.value}`}>
              {kategoria.label}
            </label>
          </div>
        ))}

        <button
          type="button"
          className="btn btn-primary w-100 mt-4"
          data-bs-dismiss="offcanvas"
        >
          Zamknij
        </button>
      </div>
    </div>
  )
}

export default FiltersOffcanvas
