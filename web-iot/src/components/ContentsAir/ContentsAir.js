import classNames from 'classnames/bind';
import styles from './ContentsAir.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import isEqual from 'lodash/isEqual';
const cx = classNames.bind(styles);

function ContentsAir() {
    const { stationId } = useParams();
    const [data, setData] = useState(null);
    const [forceUpdate, setForceUpdate] = useState(0);
   
    const fetchDataFromDatabase = () => {
        fetch(`http://localhost:1104/api/solar-air?station_id=${stationId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Kết nối thất bại');
                }
                return response.json();
            })
            .then((newData) => {
                // Luôn cập nhật dữ liệu mới khi có sự kiện SSE
                setData(newData);
                setForceUpdate((prev) => prev + 1);
            })
            .catch((error) => {
                console.error('Lỗi', error);
            });
    };

    useEffect(() => {
        // Gọi hàm kiểm tra dữ liệu mới từ cơ sở dữ liệu
        fetchDataFromDatabase();
    }, [stationId,forceUpdate]);

    useEffect(() => {
        const eventSource = new EventSource(`http://localhost:1104/api/sse`);
    
        eventSource.onmessage = (event) => {
            const newData = JSON.parse(event.data);
    
            // So sánh dữ liệu mới với dữ liệu cũ
            if (!isEqual(data, newData)) {
                alert('Dữ liệu đã được cập nhật')
                fetchDataFromDatabase();
    
                // Gọi setForceUpdate để render lại Components ContentsAir
                setForceUpdate((prev) => prev + 1);
            }
        };
    
        eventSource.onerror = (error) => {
            console.error('Lỗi kết nối SSE:', error);
        };
    
        return () => {
            eventSource.close();
        };
    }, [data]);

    return ( 
        <div key={forceUpdate} className={cx('items')}>
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