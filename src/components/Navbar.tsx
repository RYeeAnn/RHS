import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Navbar.scss';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(i18n.language);
  const location = useLocation();

  useEffect(() => {
    // Ensure we sync with i18n's actual language
    setCurrentLang(i18n.language);
    
    // Listen for language changes
    const handleLanguageChange = (lng: string) => {
      setCurrentLang(lng);
    };
    
    i18n.on('languageChanged', handleLanguageChange);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'zh' : 'en';
    i18n.changeLanguage(newLang);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && <div className="navbar-overlay" onClick={closeMenu}></div>}
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMenu}>
            {t('home.title')}
          </Link>

          <div className="navbar-right">
          <ul className={`navbar-menu ${isOpen ? 'active' : ''}`}>
            <li>
              <Link 
                to="/" 
                onClick={closeMenu}
                className={location.pathname === '/' ? 'active' : ''}
              >
                {t('nav.home')}
              </Link>
            </li>
            <li>
              <Link 
                to="/services" 
                onClick={closeMenu}
                className={location.pathname === '/services' ? 'active' : ''}
              >
                {t('nav.services')}
              </Link>
            </li>
            <li>
              <Link 
                to="/appointment" 
                onClick={closeMenu}
                className={location.pathname === '/appointment' ? 'active' : ''}
              >
                {t('nav.appointment')}
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                onClick={closeMenu}
                className={location.pathname === '/contact' ? 'active' : ''}
              >
                {t('nav.contact')}
              </Link>
            </li>
            <li className="mobile-language-toggle">
              <button onClick={toggleLanguage} className="language-toggle-mobile">
                {currentLang === 'en' ? '中文 Chinese' : 'EN English'}
              </button>
            </li>
          </ul>

          <button onClick={toggleLanguage} className="language-toggle desktop-only">
            {currentLang === 'en' ? '中文' : 'EN'}
          </button>

          <button 
            className={`burger-menu ${isOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
    </>
  );
};

export default Navbar;
