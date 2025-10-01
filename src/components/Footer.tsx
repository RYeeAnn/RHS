import { useTranslation } from 'react-i18next';
import './Footer.scss';

const Footer = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>{t('footer.brand')}</h3>
            <p>{t('footer.tagline')}</p>
          </div>
          <div className="footer-contact">
            <h4>{t('footer.contact')}</h4>
            <p>{t('footer.byAppt')}</p>
            <a href="tel:+16049312885" className="phone-link">
              (604) 931-2885
            </a>
          </div>
          <div className="footer-hours">
            <h4>{t('footer.hours')}</h4>
            <p>{t('footer.weekdays')}</p>
            <p>{t('footer.weekdaysHours')}</p>
            <p>{t('footer.saturday')}</p>
            <p>{t('footer.saturdayHours')}</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} {t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 