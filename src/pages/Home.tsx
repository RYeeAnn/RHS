import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './Home.scss';

const Home = () => {
  const { t } = useTranslation();
  
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>{t('home.title')}</h1>
          <p className="location">{t('home.location')}</p>
          <div className="cta-buttons">
            <a href="tel:+16049312885" className="cta-button primary">
              <span className="phone-icon">📞</span>
              {t('home.cta')}
            </a>
            <Link to="/contact" className="cta-button secondary">
              <span className="icon">✉️</span>
              {t('home.bookAppointment')}
            </Link>
          </div>
        </div>
      </section>

      <section className="intro">
        <div className="intro-container">
          <h2>{t('home.welcome')}</h2>
          <p className="appointment-note">
            <em>{t('home.appointmentNote')}</em>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home; 