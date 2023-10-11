import classNames from 'classnames/bind';
import styles from './StationWater.module.scss';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);
function StationWater(props) {
    const navigate = useNavigate();
    const { name, isMatching } = props;
    console.log(isMatching)
    const handleButtonClick = () => {
        navigate(`/detailsWater/${props.name}`);
    };
    const handleDivClick = () => {
        navigate(`/detailsWater/${props.name}`);
      };
    return ( 
        <div>
            <div className={cx('station', { 'matching-station': isMatching })}  onClick={handleDivClick}>
                <h2 className={cx('name')}>{name}</h2>
            </div>
            <button onClick={handleButtonClick}  style={{padding:"5px 35px",marginTop:"8px",marginLeft:"45px"}} className='btn btn-primary'>Chi tiết</button>
        </div>
     );
}

export default StationWater;