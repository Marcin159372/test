import React, { useState } from "react";

const filmy = [
  "Incepcja",
  "Matrix",
  "Skazani na Shawshank",
  "Pulp Fiction",
  "Forrest Gump",
];

function Pozycja({ nazwa }) {
  return <li>{nazwa}</li>;
}

function App() {
  const [imieNazwisko, ustawImieNazwisko] = useState("");
  const [numerFilmu, ustawNumerFilmu] = useState("");

  function handleSubmit(zdarzenie) {
    zdarzenie.preventDefault();
    console.log(imieNazwisko);

    const wybranyFilm = filmy[Number(numerFilmu) - 1];
    if (wybranyFilm) {
      console.log(wybranyFilm);
    } else {
      console.log("Nieprawidłowy numer filmu");
    }
  }

  return (
    <main>
      <h1>Liczba filmów: {filmy.length}</h1>

      <ol>
        {filmy.map((nazwa) => (
          <Pozycja key={nazwa} nazwa={nazwa} />
        ))}
      </ol>

      <form onSubmit={handleSubmit}>
        <div className="pole">
          <label htmlFor="imieNazwisko">Imię i nazwisko:</label>
          <input
            id="imieNazwisko"
            type="text"
            value={imieNazwisko}
            onChange={(zdarzenie) => ustawImieNazwisko(zdarzenie.target.value)}
          />
        </div>

        <div className="pole">
          <label htmlFor="numerFilmu">Numer filmu:</label>
          <input
            id="numerFilmu"
            type="number"
            value={numerFilmu}
            onChange={(zdarzenie) => ustawNumerFilmu(zdarzenie.target.value)}
          />
        </div>

        <button type="submit">Zatwierdź wybór</button>
      </form>
    </main>
  );
}

export default App;
