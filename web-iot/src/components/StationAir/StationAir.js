import classNames from 'classnames/bind';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './StationAir.module.scss';
const cx = classNames.bind(styles);


function StationAir(props) {
    const { stationId } = useParams();
    const navigate = useNavigate();
    const { name, isMatching } = props;

    const handleButtonClick = () => {
        navigate(`/detailsAir/${props.name}`);
    };

    const handleDivClick = () => {
        navigate(`/detailsAir/${props.name}`);
      };
    return ( 
        <div>
             <div className={cx('station', { 'matching-station': isMatching })}   onClick={handleDivClick}>
                <h2 className={cx('name')}>{name}</h2>
            </div>
            <button onClick={handleButtonClick} style={{ padding: "5px 35px", marginTop: "8px", marginLeft: "45px" }} className='btn btn-primary'>Chi tiết</button>
        </div>
    );
}

export default StationAir;
