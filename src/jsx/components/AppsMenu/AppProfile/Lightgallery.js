import React, { Fragment, Component } from 'react';
import SimpleReactLightbox from 'simple-react-lightbox';
import { SRLWrapper } from 'simple-react-lightbox';

//import img_thumb1 from '../../../../images/card/1.jpg';
//import img_thumb2 from '../../../../images/card/4.jpg';
//import img_thumb3 from '../../../../images/card/3.jpg';
//
//import img_large1 from '../../../../images/big/1.1.jpg';
//import img_large2 from '../../../../images/big/2.2.jpg';
//import img_large3 from '../../../../images/big/3.3.jpg';

import img_thumb2 from '../../../../images/profile/2.jpg';
import img_thumb3 from '../../../../images/profile/3.jpg';
import img_thumb4 from '../../../../images/profile/4.jpg';

const imgBlog = [
  { thumb: img_thumb2, large: img_thumb2 },
  { thumb: img_thumb3, large: img_thumb3 },
  { thumb: img_thumb4, large: img_thumb4 },
  { thumb: img_thumb3, large: img_thumb3 },
  { thumb: img_thumb4, large: img_thumb4 },
  { thumb: img_thumb2, large: img_thumb2 },
];

class Lightgallery extends Component {
  render() {
    return (
      <Fragment>
        <SimpleReactLightbox>
          <SRLWrapper>
            <div className='profile-interest mb-5'>
              <h5 className='text-primary d-inline'>Interest</h5>
              {/* map loop for gallery image */}
              <div className='row mt-4 sp4'>
                {imgBlog.map((item, index) => (
                  <div className='mb-1 col-lg-4 col-xl-4 col-sm-4 col-6' key={index}>
                    <a href={item.large}>
                      <img src={item.thumb} alt='' className='img-fluid' />
                    </a>
                  </div>
                ))}
                {/* map loop for gallery image  end*/}
              </div>
            </div>
          </SRLWrapper>
        </SimpleReactLightbox>
      </Fragment>
    );
  }
}

export default Lightgallery;
