const KATEGORIE = [
  { value: 'wszystkie', label: 'Wszystkie' },
  { value: 'gory', label: 'Góry' },
  { value: 'morze', label: 'Morze' },
  { value: 'miasto', label: 'Miasto' },
]

function CategoryBar({ aktywna, onWybierz }) {
  return (
    <div id="kategorie" className="d-flex flex-wrap gap-2 mb-4">
      {KATEGORIE.map(kategoria => (
        <button
          key={kategoria.value}
          type="button"
          className={`btn btn-outline-primary${
            aktywna === kategoria.value ? ' active' : ''
          }`}
          aria-pressed={aktywna === kategoria.value}
          onClick={() => onWybierz(kategoria.value)}
        >
          {kategoria.label}
        </button>
      ))}
    </div>
  )
}

export default CategoryBar
