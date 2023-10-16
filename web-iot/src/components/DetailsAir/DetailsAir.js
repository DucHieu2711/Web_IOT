import classNames from 'classnames/bind';
import styles from './DetailsAir.module.scss';
import RoundChart from '../RoundChart/RoundChart';
import DomainChart from '../DomainChart/DomainChart';
import ColumnChart from '../ColumnChart/ColumnChart';
import LineChartComponent from '../LineChart/LineChart';
import ContentsAir from '../ContentsAir/ContentsAir';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCallback } from 'react';

const cx = classNames.bind(styles);
function DetailsAir() {
    const { stationId } = useParams();
    const [data, setData] = useState(null);
    const [humidity,setHumidity] = useState(null)
    const [timeUpdate,setTimeUpdate] = useState(null);
    const [temperatureData, setTemperatureData] = useState([]);
    const [co2Data, setCO2Data] = useState([]);
    const [soiltemperature, setSoiTemperature] = useState([]);
    const [maxTemperature,setMaxTemperature] = useState(null)
    const [forceUpdateContentsAir, setForceUpdateContentsAir] = useState(0);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    useEffect(() => {
        refreshContentsAir();
        fetch(`http://localhost:1104/api/solar-air?station_id=${stationId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Kết nối thất bại');
                }
                return response.json();
            })
            .then((data) => {
                setData(data);
                if(data && data.time){
                    setTimeUpdate(data.time)
                }
                if (data && data.data) {
                    const humidityData = data.data.find((item) => item.sensor_name === 'Độ Ẩm');
                    if (humidityData) {
                      setHumidity(humidityData.sensor_value);
                      console.log(humidity.sensor_value)
                    }
                  }
            })
            .catch((error) => {
                console.error('Lỗi', error);
            });


            //API vẽ biểu đồ nhiệt độ 
            fetch(`http://localhost:1104/api/solar-air/bieudonhietdo?station_id=${stationId}&year=${currentYear}&month=${currentMonth}`)
            .then((response) => {
              if (!response.ok) {
                throw new Error('Kết nối thất bại');
              }
              return response.json();
            })
            .then((data) => {
              setTemperatureData(data);
            })
            .catch((error) => {
              console.error('Lỗi', error);
            });

            // Gọi API lấy dữ liệu CO2
        fetch(`http://localhost:1104/api/solar-air/bieudoco2?station_id=${stationId}&year=${currentYear}&month=${currentMonth}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Kết nối thất bại');
            }
            return response.json();
        })
        .then((data) => {
            setCO2Data(data);
        })
        .catch((error) => {
            console.error('Lỗi', error);
        });

         // Gọi API lấy dữ liệu độ ẩm đất và nhiệt độ đất
         fetch(`http://localhost:1104/api/solar-air/bieudodoamvanhietdo?station_id=${stationId}&year=${currentYear}&month=${currentMonth}`)
         .then((response) => {
             if (!response.ok) {
                 throw new Error('Kết nối thất bại');
             }
             return response.json();
         })
         .then((data) => {
             setSoiTemperature(data);
         })
         .catch((error) => {
             console.error('Lỗi', error);
         });

    }, [stationId, currentYear, currentMonth]);

    const refreshContentsAir = useCallback(() => {
        fetch(`http://localhost:1104/api/solar-air?station_id=${stationId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Kết nối thất bại');
                }
                return response.json();
            })
            .then((newData) => {
                setData(newData);
                if (newData && newData.time) {
                    setTimeUpdate(newData.time);
                }
                if (newData && newData.data) {
                    const humidityData = newData.data.find((item) => item.sensor_name === 'Độ Ẩm');
                    if (humidityData) {
                        setHumidity(humidityData.sensor_value);
                        console.log(humidity.sensor_value);
                    }
                }
            })
            .catch((error) => {
                console.error('Lỗi', error);
            });
    }, [stationId]);
    return ( 
        <div  className={cx('details')}>
            <div className={cx('detail')}>
                <RoundChart className={cx('round-chart')} customThreshold={humidity}/>
                <ContentsAir forceUpdate={forceUpdateContentsAir}/>
            </div>
            <div className={cx('chart')}>
            <ColumnChart  name="Biểu đồ thống kê nhiệt độ" data={temperatureData} dataKey="temperature"/>
            <DomainChart name="Biểu đồ thống kê lượng CO2" data={co2Data} dataKey="ppm" width="350px" height="300px"/>
            <LineChartComponent data={soiltemperature} name="Biểu đồ nhiệt độ và độ ẩm đất" dataKey1="percent" dataKey2="temperature" width="350px" height="300px"/>
            </div>
            <p className={cx('timeUpdate')}>Cập nhật vào: {timeUpdate}</p>
            <p className={cx('timeUpdate')}>Thống kê của {currentMonth}/{currentYear}</p>
        </div>
        
     );
}

export default DetailsAir;