import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <main className="container mt-4">
      <h1>Nie ma takiej strony</h1>
      <Link to="/">Wróć do galerii</Link>
    </main>
  )
}

export default NotFoundPage
