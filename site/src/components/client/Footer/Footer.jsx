import React from "react";
import { AiFillPhone } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { AiFillLinkedin } from "react-icons/ai";
import { AiOutlineTwitter } from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";
import { AiFillYoutube } from "react-icons/ai";

const Footer = () => {
  return (
    <footer>
      <div className="container-lg container-fluid ">
        <div className="row">
          <div className="col-lg-9 col-12 g-5">
            <div className="row">
              <div className="col-lg-3 col-6 g-5">
                <div className="list">
                  <ul>
                    <li>Ilk Bank</li>
                    <li>Bank haqqında</li>
                    <li>İnsan resursları</li>
                    <li>Xidmət şəbəkəsi</li>
                    <li>Xəbərlər</li>
                    <li>Təklif və şikayətlər</li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-6 g-5">
                <div className="list">
                  <ul>
                    <li>Məhsullar</li>
                    <li>Kartlar</li>
                    <li>Kreditlər</li>
                    <li>Depozitlər</li>
                    <li>Sığorta</li>
                    <li>Pul köçürmələri</li>
                    <li>Fərdi Bankçılıq</li>
                    <li>Onlayn Xidmətlər</li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-6 g-5">
                <div className="list">
                  <ul>
                    <li>Çevik keçidlər</li>
                    <li>Bank kartı sifariş et</li>
                    <li>Kredit sifariş et</li>
                    <li>Debet kart sifariş et</li>
                    <li>Onlayn ödənişlər</li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-6 g-5">
                <div className="list">
                  <ul>
                    <li>Digər</li>
                    <li>Onlayn növbə</li>
                    <li>Tariflər</li>
                    <li>Necə etməli</li>
                    <li>FAQ</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-12 g-5">
            <div className="dowland_links">
              <h3>
                Mobil tətbiqini yükləmək üçün <br /> QR-kodu oxudun.
              </h3>
              <img
                src="https://www.kapitalbank.az/assets/static/img/qr-code.svg"
                alt=""
              />
              <div className="mobile_store">
                <div className="store">
                  <a
                    href="https://play.google.com/store/apps/details?id=az.kapitalbank.mbanking"
                    target="_blank"
                  >
                    <img
                      src="https://www.kapitalbank.az/assets/static/img/play-store.svg"
                      alt=""
                    />
                    <p>
                      <strong>Google Play</strong> Mobil tətbiqi yüklə
                    </p>
                  </a>
                </div>
                <div className="store">
                  <a
                    href="https://apps.apple.com/us/app/birbank/id1293207342"
                    target="_blank"
                  >
                    <img
                      src="https://www.kapitalbank.az/assets/static/img/app-store.svg"
                      alt=""
                    />
                    <p>
                      <strong>App Store</strong> Mobil tətbiqi yüklə
                    </p>
                  </a>
                </div>
                <div className="store">
                  <a
                    href="https://appgallery.huawei.com/#/app/C102156391"
                    target="_blank"
                  >
                    <img
                      src="https://www.kapitalbank.az/assets/static/img/app-gallery.svg"
                      alt=""
                    />
                    <p>
                      <strong>App Gallery</strong> Mobil tətbiqi yüklə
                    </p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer_socials mt-4 ">
          <ul>
            <li>
              <a href="#" className="phoneNumber">
                <AiFillPhone /> <span>6060</span>
              </a>
            </li>
            <li>
              <a href="#">
                <BsFacebook />
              </a>
            </li>
            <li>
              <a href="#">
                <AiFillLinkedin />
              </a>
            </li>
            <li>
              <a href="#">
                <AiOutlineTwitter />
              </a>
            </li>
            <li>
              <a href="#">
                <AiOutlineInstagram />
              </a>
            </li>
            <li>
              <a href="#">
                <AiFillYoutube />
              </a>
            </li>
          </ul>
        </div>
        <div className="footer_bottom">
          <div className="row">
            <div className="col-md-6 col-12 d-flex align-items-center  justify-content-start">
              <p className="copyright font-s font-14 text-white m-0 text-center">
                © 2023 «Ilk Bank» ASC. Bütün hüquqlar qorunur.
              </p>
            </div>
            <div className="col-md-6 col-12">
              <div className="footer_logos">
                <div className="logo">
                  <a
                    href="https://www.e-gov.az/"
                    target="_blank"
                    rel="noopener"
                    aria-label="e-gov.az"
                    className="d-flex align-items-center underline-none "
                    title="e-gov.az"
                  >
                    <img
                      src="https://www.kapitalbank.az/assets/static/img/content/elements/png/93817465.png"
                      alt="e-gov.az"
                    />
                  </a>
                </div>
                <div className="logo">
                  <a
                    href="https://adif.az/"
                    target="_blank"
                    rel="noopener"
                    aria-label="adif.az"
                    className="d-flex align-items-center underline-none h-100"
                    title="adif.az"
                  >
                    
                    <img
                      width="75"
                      src="https://www.kapitalbank.az/assets/static/img/content/elements/png/aesf-logo.png"
                      alt="adif.az"
                    />
                  </a>
                </div>
                <div className="logo">
                  <a
                    href="http://infobank.az/"
                    target="_blank"
                    rel="noopener"
                    aria-label="infobank.az"
                    className="d-flex align-items-center underline-none h-100"
                    title="infobank.az"
                  >
                    
                    <img
                      src="https://www.kapitalbank.az/assets/static/img/content/elements/png/info.png"
                      alt="infobank.az"
                    />
                  </a>
                </div>
                <div className="logo">
                  <a
                    href="https://bizimpullar.az/"
                    target="_blank"
                    rel="noopener"
                    aria-label="bizimpullar.az"
                    className="d-flex align-items-center underline-none h-100"
                    title="bizimpullar.az"
                  >
                    
                    <img
                      src="https://www.kapitalbank.az/assets/static/img/content/elements/png/msp.png"
                      alt="bizimpullar.az"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;