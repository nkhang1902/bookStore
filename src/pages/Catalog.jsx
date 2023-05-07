import React from 'react'
import Layout from '../layout/Layout'
import css from "./Catalog.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown,faStar,faStarHalf } from '@fortawesome/free-solid-svg-icons'

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper'
import "swiper/css";
import "swiper/css/pagination";
import Select from 'react-select'
const options = [
  { value: 'ascending', label: 'Ascending' },
  { value: 'decrease', label: 'Decrease' }
]
const Catalog = () => {
  return (
    <div>
      <Layout>
        <div className= {css.filter} >
            <div className={css.container}>
              <ul className={css.filer_ca_au} >
                <li className={css.child}>
                  <a >Catagories <FontAwesomeIcon icon={faAngleDown}/></a>
                  <div className={css.mega_menu}>
                    <ul className={css.cata}>
                      <li><div>Fantasy</div></li>
                      <li><div>Adventure</div></li>
                      <li><div>Romance</div></li>
                      <li><div>Families & Relationships</div></li>
                      <li><div>Contemporary</div></li>
                      <li><div>Dystopian</div></li>
                      <li><div>Mystery</div></li>
                      <li><div>Horror</div></li>
                      <li><div>Thriller</div></li>
                      <li><div>Paranormal</div></li>
                      <li><div>Historical fiction</div></li>
                      <li><div>Science Fiction</div></li>
                      <li><div>Children’s</div></li>
                      <li><div>Memoir</div></li>
                      <li><div>Cookbook</div></li>
                      <li><div>Art</div></li>
                      <li><div>Self-help</div></li>
                      <li><div>Development</div></li>
                      <li><div>Motivational</div></li>
                      <li><div>Health</div></li>
                      <li><div>History</div></li>
                      <li><div>Travel</div></li>
                      <li><div>Guide / How-to</div></li>
                      <li><div>Humor</div></li>
                    </ul>
                    
                  </div>
                </li>
                <li className={css.child}>
                  <a >Author <FontAwesomeIcon icon={faAngleDown}/></a>
                  <div className={css.mega_menu}>
                    <ul className={css.cata}>
                      <li><div>Ernest Miller Hemingway</div></li>
                      <li><div>Franz Kafka</div></li>
                      <li><div>J.R.R.Tolkien</div></li>
                      <li><div>Gabriel Garcia Marquez</div></li>
                      <li><div>Harper Lee</div></li>
                    </ul>
                    
                  </div>
                </li>
              </ul>
            </div>
        </div>
        <section className={css.product_slider} id={css.pro}>
          <div className={css.row}>
              <div className={css.content}>
                <h3>Best choose</h3>
              </div>
              <Swiper
                slidesPerView={1}
                spaceBetween={10}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 4,
                  },
                  1024: {
                    slidesPerView: 5,
                  },
                }}
                modules={[Autoplay]}
                className={css.mySwiper}
              >
                <a href=""><SwiperSlide><img src="https://www.reader.com.vn/uploads/images/2019/10/30/19/dac-nhan-tam_600x865.png" /></SwiperSlide></a>
                <a href=""><SwiperSlide><img src="https://www.reader.com.vn/uploads/images/2019/10/30/19/dac-nhan-tam_600x865.png" /></SwiperSlide></a>
                <a href=""><SwiperSlide><img src="https://www.reader.com.vn/uploads/images/2019/10/30/19/dac-nhan-tam_600x865.png" /></SwiperSlide></a>
                <a href=""><SwiperSlide><img src="https://www.reader.com.vn/uploads/images/2019/10/30/19/dac-nhan-tam_600x865.png" /></SwiperSlide></a>
                <a href=""><SwiperSlide><img src="https://www.reader.com.vn/uploads/images/2019/10/30/19/dac-nhan-tam_600x865.png" /></SwiperSlide></a>
                <a href=""><SwiperSlide><img src="https://www.reader.com.vn/uploads/images/2019/10/30/19/dac-nhan-tam_600x865.png" /></SwiperSlide></a>
                <a href=""><SwiperSlide><img src="https://www.reader.com.vn/uploads/images/2019/10/30/19/dac-nhan-tam_600x865.png" /></SwiperSlide></a>
                <a href=""><SwiperSlide><img src="https://www.reader.com.vn/uploads/images/2019/10/30/19/dac-nhan-tam_600x865.png" /></SwiperSlide></a>
                <a href=""><SwiperSlide><img src="https://www.reader.com.vn/uploads/images/2019/10/30/19/dac-nhan-tam_600x865.png" /></SwiperSlide></a>
                <a href=""><SwiperSlide><img src="https://www.reader.com.vn/uploads/images/2019/10/30/19/dac-nhan-tam_600x865.png" /></SwiperSlide></a>
              </Swiper>
          </div>
        </section>
        <div className = {css.products}>
            <div className = {css.pro_container}>
                <h1 className = {css.lg_title}>My Product</h1>
                <Select className={css.select} options={options} />
                <div className = {css.product_items}>
                    <div className = {css.product}>
                        <div className = {css.product_content}>
                            <div className = {css.product_img}>
                                <img src = "https://www.reader.com.vn/uploads/images/2019/10/30/19/dac-nhan-tam_600x865.png" alt = "product image"/>
                            </div>
                            <div className = {css.product_btns}>
                                <button type = "button" className = {css.btn_cart}> add to cart
                                    
                                </button>
                                <button type = "button" className = {css.btn_buy}> buy now
                                    
                                </button>
                            </div>
                        </div>

                        <div className = {css.product_info}>
                            <div className = {css.product_info_top}>
                                <h2 className = {css.sm_title}>lifestyle</h2>
                                <div className = {css.rating}>
                                    <span><FontAwesomeIcon icon={faStar}/></span>
                                    <span><FontAwesomeIcon icon={faStar}/></span>
                                    <span><FontAwesomeIcon icon={faStar}/></span>
                                    <span><FontAwesomeIcon icon={faStar}/></span>
                                    <span><FontAwesomeIcon icon={faStarHalf}/></span>
                                </div>
                            </div>
                            <a href = "#" className = {css.product_name}>mens shoes DN 23XX, new product</a>
                            <p className = {css.product_price}>$ 150.00</p>
                            <p className = {css.product_price}>$ 133.00</p>
                        </div>

                        <div class = "off-info">
                            <h2 className = {css.sm_title}>25% off</h2>
                        </div>
                    </div>
                    <div className = {css.product}>
                        <div className = {css.product_content}>
                            <div className = {css.product_img}>
                                <img src = "https://www.reader.com.vn/uploads/images/2019/10/30/19/dac-nhan-tam_600x865.png" alt = "product image"/>
                            </div>
                            <div className = {css.product_btns}>
                                <button type = "button" className = {css.btn_cart}> add to cart
                                    
                                </button>
                                <button type = "button" className = {css.btn_buy}> buy now
                                    
                                </button>
                            </div>
                        </div>

                        <div className = {css.product_info}>
                            <div className = {css.product_info_top}>
                                <h2 className = {css.sm_title}>lifestyle</h2>
                                <div className = {css.rating}>
                                    <span><FontAwesomeIcon icon={faStar}/></span>
                                    <span><FontAwesomeIcon icon={faStar}/></span>
                                    <span><FontAwesomeIcon icon={faStar}/></span>
                                    <span><FontAwesomeIcon icon={faStar}/></span>
                                    <span><FontAwesomeIcon icon={faStarHalf}/></span>
                                </div>
                            </div>
                            <a href = "#" className = {css.product_name}>mens shoes DN 23XX, new product</a>
                            <p className = {css.product_price}>$ 150.00</p>
                            <p className = {css.product_price}>$ 133.00</p>
                        </div>
                    </div>
                    <div className = {css.product}>
                        <div className = {css.product_content}>
                            <div className = {css.product_img}>
                                <img src = "https://www.reader.com.vn/uploads/images/2019/10/30/19/dac-nhan-tam_600x865.png" alt = "product image"/>
                            </div>
                            <div className = {css.product_btns}>
                                <button type = "button" className = {css.btn_cart}> add to cart
                                    
                                </button>
                                <button type = "button" className = {css.btn_buy}> buy now
                                    
                                </button>
                            </div>
                        </div>

                        <div className = {css.product_info}>
                            <div className = {css.product_info_top}>
                                <h2 className = {css.sm_title}>lifestyle</h2>
                                <div className = {css.rating}>
                                    <span><FontAwesomeIcon icon={faStar}/></span>
                                    <span><FontAwesomeIcon icon={faStar}/></span>
                                    <span><FontAwesomeIcon icon={faStar}/></span>
                                    <span><FontAwesomeIcon icon={faStar}/></span>
                                    <span><FontAwesomeIcon icon={faStarHalf}/></span>
                                </div>
                            </div>
                            <a href = "#" className = {css.product_name}>mens shoes DN 23XX, new product</a>
                            <p className = {css.product_price}>$ 150.00</p>
                            <p className = {css.product_price}>$ 133.00</p>
                        </div>
                    </div>
                    <div className = {css.product}>
                        <div className = {css.product_content}>
                            <div className = {css.product_img}>
                                <img src = "https://www.reader.com.vn/uploads/images/2019/10/30/19/dac-nhan-tam_600x865.png" alt = "product image"/>
                            </div>
                            <div className = {css.product_btns}>
                                <button type = "button" className = {css.btn_cart}> add to cart
                                    
                                </button>
                                <button type = "button" className = {css.btn_buy}> buy now
                                    
                                </button>
                            </div>
                        </div>

                        <div className = {css.product_info}>
                            <div className = {css.product_info_top}>
                                <h2 className = {css.sm_title}>lifestyle</h2>
                                <div className = {css.rating}>
                                    <span><FontAwesomeIcon icon={faStar}/></span>
                                    <span><FontAwesomeIcon icon={faStar}/></span>
                                    <span><FontAwesomeIcon icon={faStar}/></span>
                                    <span><FontAwesomeIcon icon={faStar}/></span>
                                    <span><FontAwesomeIcon icon={faStarHalf}/></span>
                                </div>
                            </div>
                            <a href = "#" className = {css.product_name}>mens shoes DN 23XX, new product</a>
                            <p className = {css.product_price}>$ 150.00</p>
                            <p className = {css.product_price}>$ 133.00</p>
                        </div>

                        <div class = "off-info">
                            <h2 className = {css.sm_title}>25% off</h2>
                        </div>
                    </div>
                    <div className = {css.product}>
                        <div className = {css.product_content}>
                            <div className = {css.product_img}>
                                <img src = "https://www.reader.com.vn/uploads/images/2019/10/30/19/dac-nhan-tam_600x865.png" alt = "product image"/>
                            </div>
                            <div className = {css.product_btns}>
                                <button type = "button" className = {css.btn_cart}> add to cart
                                    
                                </button>
                                <button type = "button" className = {css.btn_buy}> buy now
                                    
                                </button>
                            </div>
                        </div>

                        <div className = {css.product_info}>
                            <div className = {css.product_info_top}>
                                <h2 className = {css.sm_title}>lifestyle</h2>
                                <div className = {css.rating}>
                                    <span><FontAwesomeIcon icon={faStar}/></span>
                                    <span><FontAwesomeIcon icon={faStar}/></span>
                                    <span><FontAwesomeIcon icon={faStar}/></span>
                                    <span><FontAwesomeIcon icon={faStar}/></span>
                                    <span><FontAwesomeIcon icon={faStarHalf}/></span>
                                </div>
                            </div>
                            <a href = "#" className = {css.product_name}>womens shoes DN 23XX, new product</a>
                            <p className = {css.product_price}>$ 150.00</p>
                            <p className = {css.product_price}>$ 133.00</p>
                        </div>
                    </div>
                    <div className = {css.product}>
                        <div className = {css.product_content}>
                            <div className = {css.product_img}>
                                <img src = "https://www.reader.com.vn/uploads/images/2019/10/30/19/dac-nhan-tam_600x865.png" alt = "product image"/>
                            </div>
                            <div className = {css.product_btns}>
                                <button type = "button" className = {css.btn_cart}> add to cart
                                    
                                </button>
                                <button type = "button" className = {css.btn_buy}> buy now
                                    
                                </button>
                            </div>
                        </div>

                        <div className = {css.product_info}>
                            <div className = {css.product_info_top}>
                                <h2 className = {css.sm_title}>lifestyle</h2>
                                <div className = {css.rating}>
                                    <span><FontAwesomeIcon icon={faStar}/></span>
                                    <span><FontAwesomeIcon icon={faStar}/></span>
                                    <span><FontAwesomeIcon icon={faStar}/></span>
                                    <span><FontAwesomeIcon icon={faStar}/></span>
                                    <span><FontAwesomeIcon icon={faStarHalf}/></span>
                                </div>
                            </div>
                            <a href = "#" className = {css.product_name}>womens shoes DN 23XX, new product</a>
                            <p className = {css.product_price}>$ 150.00</p>
                            <p className = {css.product_price}>$ 133.00</p>
                        </div>
                    </div>
                    <div className = {css.product}>
                        <div className = {css.product_content}>
                            <div className = {css.product_img}>
                                <img src = "https://www.reader.com.vn/uploads/images/2019/10/30/19/dac-nhan-tam_600x865.png" alt = "product image"/>
                            </div>
                            <div className = {css.product_btns}>
                                <button type = "button" className = {css.btn_cart}> add to cart
                                    
                                </button>
                                <button type = "button" className = {css.btn_buy}> buy now
                                    
                                </button>
                            </div>
                        </div>

                        <div className = {css.product_info}>
                            <div className = {css.product_info_top}>
                                <h2 className = {css.sm_title}>lifestyle</h2>
                                <div className = {css.rating}>
                                    <span><FontAwesomeIcon icon={faStar}/></span>
                                    <span><FontAwesomeIcon icon={faStar}/></span>
                                    <span><FontAwesomeIcon icon={faStar}/></span>
                                    <span><FontAwesomeIcon icon={faStar}/></span>
                                    <span><FontAwesomeIcon icon={faStarHalf}/></span>
                                </div>
                            </div>
                            <a href = "#" className = {css.product_name}>womens shoes DN 23XX, new product</a>
                            <p className = {css.product_price}>$ 150.00</p>
                            <p className = {css.product_price}>$ 133.00</p>
                        </div>
                    </div>
                    <div className = {css.product}>
                        <div className = {css.product_content}>
                            <div className = {css.product_img}>
                                <img src = "https://www.reader.com.vn/uploads/images/2019/10/30/19/dac-nhan-tam_600x865.png" alt = "product image"/>
                            </div>
                            <div className = {css.product_btns}>
                                <button type = "button" className = {css.btn_cart}> add to cart
                                    
                                </button>
                                <button type = "button" className = {css.btn_buy}> buy now
                                    
                                </button>
                            </div>
                        </div>

                        <div className = {css.product_info}>
                            <div className = {css.product_info_top}>
                                <h2 className = {css.sm_title}>lifestyle</h2>
                                <div className = {css.rating}>
                                    <span><FontAwesomeIcon icon={faStar}/></span>
                                    <span><FontAwesomeIcon icon={faStar}/></span>
                                    <span><FontAwesomeIcon icon={faStar}/></span>
                                    <span><FontAwesomeIcon icon={faStar}/></span>
                                    <span><FontAwesomeIcon icon={faStarHalf}/></span>
                                </div>
                            </div>
                            <a href = "#" className = {css.product_name}>womens shoes DN 23XX, new product</a>
                            <p className = {css.product_price}>$ 150.00</p>
                            <p className = {css.product_price}>$ 133.00</p>
                        </div>

                        <div class = {css.off_info}>
                            <h2 className = {css.sm_title}>35% off</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
      </Layout>
    </div>
  )
}

export default Catalog