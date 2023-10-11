import classNames from 'classnames/bind';
import styles from './ContentsAir.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
const cx = classNames.bind(styles);

function ContentsAir() {
    const { stationId } = useParams();
    const [data, setData] = useState(null);
    useEffect(() => {
        fetch(`http://localhost:1104/api/solar-air?station_id=${stationId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Kết nối thất bại');
                }
                return response.json();
            })
            .then((data) => {
                setData(data);
                console.log(data)
            })
            .catch((error) => {
                console.error('Lỗi', error);
            });
    }, [stationId]);
    return ( 
        <div className={cx('items')}>
        {data && data.data.map((item, index) => (
            <div className={cx('item')} key={index}>
                <p>{item.sensor_name}</p>
                <p>({item.sensor_key})</p>
                <p className={cx('value')}>{item.sensor_value} {item.sensor_unit}</p>
                {item.sensor_name === "Nhiệt Độ" && (
                    <p>Cao nhất: {data.maxtemperature[0]['Nhiệt độ cao nhất']} °C</p>
                )}
                 {item.sensor_name === "Độ Ẩm" && (
                    <p>Cao nhất: {data.maxairhumidity[0]['Độ ẩm cao nhất']} %</p>
                )}
                 {item.sensor_name === "CO2" && (
                    <p>Cao nhất: {data.maxCO2[0]['CO2 cao nhất']} ppm</p>
                )}
            </div>
        ))}
    </div>
     );
}

export default ContentsAir;