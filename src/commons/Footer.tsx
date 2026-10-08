const currentYear = new Date().getFullYear()

export function Footer() {
  return (
    <footer>
      <p>© {currentYear} Blocs App</p>
    </footer>
  )
}
