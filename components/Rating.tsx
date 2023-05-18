import React, { useState } from 'react';
import { Rate } from 'antd';
import PropTypes from 'prop-types';

const StarRating = (props: any) => {
	const { tooltips, value } = props;

	const [ratingValue, setRatingValue] = useState(value || 1);
	return (
		<Rate tooltips={value} count={5} value={ratingValue} disabled={true} />
	);
};

export default StarRating;

StarRating.propTypes = {
	tooltips: PropTypes.oneOfType([PropTypes.array, PropTypes.any]),
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	disabled: PropTypes.bool,
};
