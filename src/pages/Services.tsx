import { useTranslation } from 'react-i18next';
import './Services.scss';

const Services = () => {
  const { t } = useTranslation();

  return (
    <div className="services">
      <div className="services-content">
        <div className="service-section">
          <h3 className="service-title">{t('services.haircut.title')}</h3>
          <p className="service-description">{t('services.haircut.description')}</p>
          <div className="service-pricing">
            <div className="service-price">
              <span className="price-label">{t('services.haircut.priceMen')}</span>
              <span className="price-details">{t('services.haircut.priceMenDetails')}</span>
            </div>
            <div className="service-price">
              <span className="price-label">{t('services.haircut.priceWomen')}</span>
              <span className="price-details">{t('services.haircut.priceWomenDetails')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services; 