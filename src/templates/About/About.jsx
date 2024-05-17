import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import FaceEditor from "../../styles/components/FaceEditor";

export default function About() {
  const { t } = useTranslation();
    const theme = useSelector(state => state.shared.theme);
    return (
      <div className={theme+' page'}>
          <div className="page-content center">
            {t('header.about')} 
          </div>
          <div className="sidebar-dummy"></div>
      </div>
    )
}