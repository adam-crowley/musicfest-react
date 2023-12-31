import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Nav() {
  const [isNavExpanded, setIsNavExpanded] = useState(true)

  function handleClick() {
    setIsNavExpanded(!isNavExpanded)
  }

  useEffect(() => {
    function handleResize() {
      const breakpoint = 768
      const isMobile = window.innerWidth <= breakpoint
      setIsNavExpanded(isMobile)
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <nav className="flex justify-between md:justify-center relative z-10 py-2 md:py-3 pr-5 md:pr-10 pl-5 md:pl-10 bg-dd-yellow">
      <div className="nav__spacer"></div>
      <ul
        className={`nav__list ${
          !isNavExpanded ? 'nav__list--open' : 'nav__list--closed'
        }`}
      >
        <li className="mx-7 my-2 md:my-0">
          <Link
            to="/schedule/friday"
            className="text-dd-dark-purple hover:text-dd-light-purple"
          >
            Friday
          </Link>
        </li>
        <li className="mx-7 my-2 md:my-0">
          <Link
            to="/schedule/saturday"
            className="text-dd-dark-purple hover:text-dd-light-purple"
          >
            Saturday
          </Link>
        </li>
        <li className="mx-7 my-2 md:my-0">
          <Link
            to="/schedule/sunday"
            className="text-dd-dark-purple hover:text-dd-light-purple"
          >
            Sunday
          </Link>
        </li>
        <li className="mx-7 my-2 md:my-0">
          <Link
            to="/locations"
            className="text-dd-dark-purple hover:text-dd-light-purple"
          >
            Locations
          </Link>
        </li>
      </ul>
      <button className="nav__menu-btn my-2 md:my-0" onClick={handleClick}>
        {isNavExpanded ? (
          <>
            <span className="nav__menu-title">Menu</span>
            <svg className="nav__menu--open"></svg>
          </>
        ) : (
          <>
            <svg className="nav__menu--close"></svg>
          </>
        )}
      </button>
    </nav>
  )
}

export default Nav
