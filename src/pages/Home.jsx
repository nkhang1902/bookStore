
import React from 'react'
import '../style/Home.css'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};


const Home = () => {
  return (
    <div>
        <div>
          <div class='content'>
          <h2>Best Sellers</h2>
          <div class='crs'>
          <Carousel  focusOnSelect={true} centerMode={true} responsive={responsive}>
            <div class='card'>
              <img class='product--image' src='https://www.adobe.com/express/create/cover/media_178ebed46ae02d6f3284c7886e9b28c5bb9046a02.jpeg?width=400&format=jpeg&optimize=medium'/>
              <h3>Book Name</h3>
              <p>Author Name</p>
              <p className='price'>$14.99</p>
            </div>
            <div class='card'>
              <img className='product--image' src='https://www.adobe.com/express/create/cover/media_178ebed46ae02d6f3284c7886e9b28c5bb9046a02.jpeg?width=400&format=jpeg&optimize=medium'/>
              <h3>Book Name</h3>
              <p>Author Name</p>
              <p className='price'>$14.99</p>
            </div>
            <div class='card'>
              <img className='product--image' src='https://www.adobe.com/express/create/cover/media_178ebed46ae02d6f3284c7886e9b28c5bb9046a02.jpeg?width=400&format=jpeg&optimize=medium'/>
              <h3>Book Name</h3>
              <p>Author Name</p>
              <p className='price'>$14.99</p>
            </div>
            <div class='card'>
              <img className='product--image' src='https://www.adobe.com/express/create/cover/media_178ebed46ae02d6f3284c7886e9b28c5bb9046a02.jpeg?width=400&format=jpeg&optimize=medium'/>
              <h3>Book Name</h3>
              <p>Author Name</p>
              <p className='price'>$14.99</p>
            </div>
            <div class='card'>
              <img className='product--image' src='https://www.adobe.com/express/create/cover/media_178ebed46ae02d6f3284c7886e9b28c5bb9046a02.jpeg?width=400&format=jpeg&optimize=medium'/>
              <h3>Book Name</h3>
              <p>Author Name</p>
              <p className='price'>$14.99</p>
            </div>
            <div class='card'>
              <img className='product--image' src='https://www.adobe.com/express/create/cover/media_178ebed46ae02d6f3284c7886e9b28c5bb9046a02.jpeg?width=400&format=jpeg&optimize=medium'/>
              <h3>Book Name</h3>
              <p>Author Name</p>
              <p className='price'>$14.99</p>
            </div>
          </Carousel>
          </div>
          </div>
        </div>
        <div>
          <div class='content'>
          <h2>New Release</h2>
          <div class='crs'>
          <Carousel  focusOnSelect={true} centerMode={true} responsive={responsive}>
            <div class='card'>
              <img class='product--image' src='https://www.adobe.com/express/create/cover/media_178ebed46ae02d6f3284c7886e9b28c5bb9046a02.jpeg?width=400&format=jpeg&optimize=medium'/>
              <h3>Book Name</h3>
              <p>Author Name</p>
              <p className='price'>$14.99</p>
            </div>
            <div class='card'>
              <img className='product--image' src='https://www.adobe.com/express/create/cover/media_178ebed46ae02d6f3284c7886e9b28c5bb9046a02.jpeg?width=400&format=jpeg&optimize=medium'/>
              <h3>Book Name</h3>
              <p>Author Name</p>
              <p className='price'>$14.99</p>
            </div>
            <div class='card'>
              <img className='product--image' src='https://www.adobe.com/express/create/cover/media_178ebed46ae02d6f3284c7886e9b28c5bb9046a02.jpeg?width=400&format=jpeg&optimize=medium'/>
              <h3>Book Name</h3>
              <p>Author Name</p>
              <p className='price'>$14.99</p>
            </div>
            <div class='card'>
              <img className='product--image' src='https://www.adobe.com/express/create/cover/media_178ebed46ae02d6f3284c7886e9b28c5bb9046a02.jpeg?width=400&format=jpeg&optimize=medium'/>
              <h3>Book Name</h3>
              <p>Author Name</p>
              <p className='price'>$14.99</p>
            </div>
            <div class='card'>
              <img className='product--image' src='https://www.adobe.com/express/create/cover/media_178ebed46ae02d6f3284c7886e9b28c5bb9046a02.jpeg?width=400&format=jpeg&optimize=medium'/>
              <h3>Book Name</h3>
              <p>Author Name</p>
              <p className='price'>$14.99</p>
            </div>
            <div class='card'>
              <img className='product--image' src='https://www.adobe.com/express/create/cover/media_178ebed46ae02d6f3284c7886e9b28c5bb9046a02.jpeg?width=400&format=jpeg&optimize=medium'/>
              <h3>Book Name</h3>
              <p>Author Name</p>
              <p className='price'>$14.99</p>
            </div>
          </Carousel>
          </div>
          </div>
        </div>
        <div>
          <div class='content'>
          <h2>Earth Day Book</h2>
          <div class='crs'>
          <Carousel  focusOnSelect={true} centerMode={true} responsive={responsive}>
            <div class='card'>
              <img class='product--image' src='https://www.adobe.com/express/create/cover/media_178ebed46ae02d6f3284c7886e9b28c5bb9046a02.jpeg?width=400&format=jpeg&optimize=medium'/>
              <h3>Book Name</h3>
              <p>Author Name</p>
              <p className='price'>$14.99</p>
            </div>
            <div class='card'>
              <img className='product--image' src='https://www.adobe.com/express/create/cover/media_178ebed46ae02d6f3284c7886e9b28c5bb9046a02.jpeg?width=400&format=jpeg&optimize=medium'/>
              <h3>Book Name</h3>
              <p>Author Name</p>
              <p className='price'>$14.99</p>
            </div>
            <div class='card'>
              <img className='product--image' src='https://www.adobe.com/express/create/cover/media_178ebed46ae02d6f3284c7886e9b28c5bb9046a02.jpeg?width=400&format=jpeg&optimize=medium'/>
              <h3>Book Name</h3>
              <p>Author Name</p>
              <p className='price'>$14.99</p>
            </div>
            <div class='card'>
              <img className='product--image' src='https://www.adobe.com/express/create/cover/media_178ebed46ae02d6f3284c7886e9b28c5bb9046a02.jpeg?width=400&format=jpeg&optimize=medium'/>
              <h3>Book Name</h3>
              <p>Author Name</p>
              <p className='price'>$14.99</p>
            </div>
            <div class='card'>
              <img className='product--image' src='https://www.adobe.com/express/create/cover/media_178ebed46ae02d6f3284c7886e9b28c5bb9046a02.jpeg?width=400&format=jpeg&optimize=medium'/>
              <h3>Book Name</h3>
              <p>Author Name</p>
              <p className='price'>$14.99</p>
            </div>
            <div class='card'>
              <img className='product--image' src='https://www.adobe.com/express/create/cover/media_178ebed46ae02d6f3284c7886e9b28c5bb9046a02.jpeg?width=400&format=jpeg&optimize=medium'/>
              <h3>Book Name</h3>
              <p>Author Name</p>
              <p className='price'>$14.99</p>
            </div>
          </Carousel>
          </div>
          </div>
        </div>
    </div>
  )
}
export default Home