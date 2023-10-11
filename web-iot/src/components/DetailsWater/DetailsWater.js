import classNames from 'classnames/bind';
import styles from './DetailsWater.module.scss';
import DomainChart from '../DomainChart/DomainChart';
import ColumnChart from '../ColumnChart/ColumnChart';
import LineChartComponent from '../LineChart/LineChart';
import ContentsWater from '../ContentsWater/ContentsWater';
import CollapseChart from '../CollapseChart/CollapseChart';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);
function DetailsWater() {
    const [data, setData] = useState(null);
    const [dataCollapse, setDataCollapse] = useState([]);
    const [dataPh, setDataPh] = useState([]);
    const [dataEc, setDataEc] = useState([]);
    const [dataTurbidity, setdataTurbidity] = useState([]);
    const { stationId } = useParams();
    const [timeUpdate,setTimeUpdate] = useState(null);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
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
                if(data && data.time){
                    setTimeUpdate(data.time)
                }
            })
            .catch((error) => {
                console.error('Lỗi', error);
            });

            //Biểu đồ tổng hợp
            fetch(`http://localhost:1104/api/water-sensor/bieudotonghop?station_id=${stationId}&year=${currentYear}&month=${currentMonth}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Kết nối thất bại');
                }
                return response.json();
            })
            .then((data) => {
                setDataCollapse(data);
                console.log(data)
            })
            .catch((error) => {
                console.error('Lỗi', error);
            });

            //Biểu đồ độ Ph
            fetch(`http://localhost:1104/api/water-sensor/bieudoph?station_id=${stationId}&year=${currentYear}&month=${currentMonth}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Kết nối thất bại');
                }
                return response.json();
            })
            .then((data) => {
                setDataPh(data);
                console.log(data)
            })
            .catch((error) => {
                console.error('Lỗi', error);
            });

            //Biểu đồ độ dẫn điện
            fetch(`http://localhost:1104/api/water-sensor/bieudoec?station_id=${stationId}&year=${currentYear}&month=${currentMonth}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Kết nối thất bại');
                }
                return response.json();
            })
            .then((data) => {
                setDataEc(data);
            })
            .catch((error) => {
                console.error('Lỗi', error);
            });

            //Biểu đồ độ đục
             fetch(`http://localhost:1104/api/water-sensor/bieudododuc?station_id=${stationId}&year=${currentYear}&month=${currentMonth}`)
             .then((response) => {
                 if (!response.ok) {
                     throw new Error('Kết nối thất bại');
                 }
                 return response.json();
             })
             .then((data) => {
                 setdataTurbidity(data);
             })
             .catch((error) => {
                 console.error('Lỗi', error);
             });
    }, [stationId, currentYear, currentMonth]);
    return ( 
        <div  className={cx('details')}>
            <div className={cx('detail')}>
                <CollapseChart name="Biểu đồ thống kê tổng hợp" data={dataCollapse} key1="waterlevel" key2="do" key3="tds" key4="temperature" width="500px" height="400px"/>
                <ContentsWater />
            </div>
            <div className={cx('chart')}>
            <ColumnChart name="Biểu đồ thống kê độ pH" data={dataPh} dataKey="pH" />
            <DomainChart name="Biểu đồ thống kê độ dẫn điện" data={dataEc}  dataKey="ec" width="350px" height="300px"/>
            <ColumnChart name="Biểu đồ thống kê độ đục" data={dataTurbidity} dataKey="NTU" />
            </div>
            <p className={cx('timeUpdate')}>Cập nhật vào: {timeUpdate}</p>
            <p className={cx('timeUpdate')}>Thống kê của {currentMonth}/{currentYear}</p>
        </div>
        
     );
}

export default DetailsWater;