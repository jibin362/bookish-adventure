import React from 'react';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getImage } from '../helpers/utils';
import { kebabCase } from 'lodash';

function PosterItem({ data }) {
  const image = getImage(data.image);

  return (
    <div className="w-full mb-90px">
      <div className="bg-black mb-24px">
        <LazyLoadImage
          src={image}
          className="object-contain w-full h-34"
          alt={kebabCase(data.name)}
        />
      </div>
      <p className="text-white text-base">{data.name}</p>
    </div>
  );
}

PosterItem.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  })
};

export default PosterItem;
