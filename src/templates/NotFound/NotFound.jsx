import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const { t } = useTranslation();
  const theme = useSelector(state => state.shared.theme);
  const navigate = useNavigate();

  function handleClick() {
    navigate("/");
  }

  return (
    <div className={theme} style={{height: '100%'}}>
      <div className="page fixed-top justify-center">
        <div className="content center g-1" style={{flexDirection: 'column'}}>
          {t('error.notFound')}
          <button type="button" onClick={handleClick}>
            Go home
          </button>
        </div>
      </div>
    </div>
  )
}