import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import './Play.scss'
import FaceEditor from "../../styles/components/FaceEditor";

export default function Play() {
  const { t } = useTranslation();
    const theme = useSelector(state => state.shared.theme);
    return (
      <div className={theme+' play-page'}>
          <FaceEditor></FaceEditor>
      </div>
    )
}