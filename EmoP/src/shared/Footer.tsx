import { ABOUT_ROUTE, HOME_ROUTE } from "@/app/consts";
import { Chrome, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-top">
          <div className="links">
            <h3 className="quick-links-h3">Ссылки</h3>

            <ul>
              <li>
                <a href={HOME_ROUTE}>Главная страница</a>
              </li>

              <li>
                <a href={ABOUT_ROUTE}>О нас</a>
              </li>
            </ul>
          </div>

          <div className="links">
            <h3 className="quick-links-h3">Наши контакты</h3>

            <ul>
              <li>
                <a href="https://www.instagram.com/kipk_colledji/">Instagram</a>
              </li>
              <li>
                <a href="https://kipk.edu.kz/">Сайт KIPK</a>
              </li>
            </ul>
          </div>

          <div className="links">
            <h3 className="quick-links-h3">Получить помощь</h3>

            <ul>
              <li>
                <a href="">Анонимное обращение</a>
              </li>
              <li>
                <a href="#">Связяться с психологом</a>
              </li>
            </ul>
          </div>

          <div className="links">
            <h3 className="quick-links-h3">Наши данные</h3>

            <ul>
              <li>Email: contact@gmail.com</li>

              <li>Mobile No.: +1-111-111-1111</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="copyright"></div>

          <div className="social">
            <a href="https://kipk.edu.kz/">
              <Chrome />
            </a>

            <a href="https://www.instagram.com/kipk_colledji/">
              <Instagram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
