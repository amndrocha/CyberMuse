import { useSelector } from "react-redux";

export default function About() {
    const theme = useSelector(state => state.shared.theme);
    return (
      <div className={theme} style={{height: '100%'}}>
        <div className="page">
          <div className="content">
            About
          </div>
        </div>
      </div>
    )
}