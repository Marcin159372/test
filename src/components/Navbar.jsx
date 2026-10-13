function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom">
      <div className="container">
        <a className="navbar-brand fw-bold" href="#">
          Galeria Podróży
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menuGlowne"
          aria-controls="menuGlowne"
          aria-expanded="false"
          aria-label="Przełącz menu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="menuGlowne">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#galeria">
                Galeria
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#kategorie">
                Kategorie
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#stopka">
                Kontakt
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
