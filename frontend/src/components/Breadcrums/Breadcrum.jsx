
import './Breadcrum.css';
import breadcrum_arrow from '../Assets/breadcrum_arrow.png';
import PropTypes from 'prop-types';

const Breadcrum = (props) => {
    const { product } = props;

    if (!product || !product.category || !product.name) {
        return null; // Or return a fallback UI
    }

    return (
        <div className='breadcrum'>
            HOME <img src={breadcrum_arrow} alt=""/>
            SHOP <img src={breadcrum_arrow} alt=""/>
            {product.category} <img src={breadcrum_arrow} alt=""/>
            {product.name}
        </div>
    );
}

Breadcrum.defaultProps = {
    product: {
        category: 'Unknown Category',
        name: 'Unknown Product'
    }
};

Breadcrum.propTypes = {
    product: PropTypes.shape({
        category: PropTypes.string,
        name: PropTypes.string
    })
};

export default Breadcrum;
