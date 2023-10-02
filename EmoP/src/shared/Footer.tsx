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

              <li>
                <a href="{NEW_ROUTE}">Новое</a>
              </li>
            </ul>
          </div>

          <div className="links">
            <h3 className="services-h3">Наши контакты</h3>

            <ul>
              <li>
                <a href="#">Instagram</a>
              </li>
              <li>
                <a href="#">VK</a>
              </li>
              <li>
                <a href="#">Сайт KIPK</a>
              </li>

              <li>
                <a href="#"></a>
              </li>
            </ul>
          </div>

          <div className="links">
            <h3 className="categories-h3">Оставить обращение</h3>

            <ul>
              <li>
                <a href="#">Анонимное обращение</a>
              </li>
              <li>
                <a href="#">Связяться с психологом</a>
              </li>
              <li>
                <a href="#">Просмотреть статус обращения</a>
              </li>
            </ul>
          </div>

          <div className="links">
            <h3 className="contact-h3">Наши данные</h3>

            <ul>
              <li>Email: contact@gmail.com</li>

              <li>Mobile No.: +1-111-111-1111</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="copyright"></div>

          <div className="social">
            <a href="#">
              <Chrome />
            </a>

            <a href="#">
              <Instagram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
