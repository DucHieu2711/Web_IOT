import classNames from 'classnames/bind';
import styles from './ContentsWater.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
const cx = classNames.bind(styles);

function ContentsWater() {
    const { stationId } = useParams();
    const [data, setData] = useState(null);
    useEffect(() => {
        fetch(`http://localhost:1104/api/water-sensor?station_id=${stationId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Kết nối thất bại');
                }
                return response.json();
            })
            .then((data) => {
                setData(data);
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
                 {item.sensor_name === "Mực Nước" && (
                    <p>Cao nhất: {data.maxwaterlevel[0]['Mực nước cao nhất']} cm</p>
                )}
                 {item.sensor_name === "Oxy" && (
                    <p>Cao nhất: {data.maxOxy[0]['Oxy cao nhất"']} ppm</p>
                )}
                </div>
            ))}
        </div>
     );
}

export default ContentsWater;