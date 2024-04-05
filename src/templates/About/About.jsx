import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function About() {
  const { t } = useTranslation();
    const theme = useSelector(state => state.shared.theme);
    return (
      <div className={theme} style={{height: '100%'}}>
        <div className="page">
          <div className="content">
            {t('header.about')} 
          </div>
        </div>
      </div>
    )
}