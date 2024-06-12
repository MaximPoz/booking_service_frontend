import { Link } from "react-router-dom";
import style from "./style.module.css";

export const FootBar = ({footer}) => {
  return (
    <div className={style.container}>
      <div className={style.footBar}>
        <div className={style.menu}>
          <ul>
            {footer.map((item, index) => (
              <li key={index} className={style.item}>
                <Link to={`/${item.url}`}>{item.nameNav}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
