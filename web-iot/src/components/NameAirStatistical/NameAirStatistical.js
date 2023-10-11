
import CollapseChart from "../CollapseChart/CollapseChart";
import ShapeChart from "../ShapeChart/ShapeChart";
import ComposedChartComponent from "../ComposedChart/ComposedChart";
import classNames from 'classnames/bind';
import styles from './NameAirStatistical.module.scss';
import { useEffect } from "react";
import { useState } from "react";
const cx = classNames.bind(styles);

function NameAirStatistical(props) {
    const [airData, setAirData] = useState(null);
    const [temperature,setTemperature] = useState([]);
    const [pm,setPM] = useState([]);
    const [CO2,setCO2] = useState([]);
    const { month,year,station_id } = props;
    useEffect(() => {

        //Gọi API làm cho CollapseChart
        const fetchData2 = async () => {
            try {
                const response = await fetch(`http://localhost:1104/api/temperatureName?year=${year}&month=${month}&station_id=${station_id}`);
                if (!response.ok) {
                    throw new Error('Lỗi khi gọi API');
                }
                const data = await response.json();
                setTemperature(data);
            } catch (error) {
                console.error('Lỗi gọi API:', error);
            }
        };
        fetchData2();

        
        //Gọi API làm cho ComposedChartComponent
        const fetchData3 = async () => {
            try {
                const response = await fetch(`http://localhost:1104/api/PMName?year=${year}&month=${month}&station_id=${station_id}`);
                if (!response.ok) {
                    throw new Error('Lỗi khi gọi API');
                }
                const data = await response.json();
                setPM(data);
            } catch (error) {
                console.error('Lỗi gọi API:', error);
            }
        };
        fetchData3();
        

        //Gọi API làm cho ShapeChart
        const fetchData4 = async () => {
            try {
                const response = await fetch(`http://localhost:1104/api/CO2Name?year=${year}&month=${month}&station_id=${station_id}`);
                if (!response.ok) {
                    throw new Error('Lỗi khi gọi API');
                }
                const data = await response.json();
                setCO2(data);
            } catch (error) {
                console.error('Lỗi gọi API:', error);
            }
        };
        fetchData4();
    }, [station_id]);
    useEffect(() => {
        fetch(`http://localhost:1104/api/solar-air/?station_id=${station_id}`)
            .then((response) => {
                console.log(response);
                if (!response.ok) {
                    throw new Error('Kết nối thất bại');
                }
                return response.json();
            })
            .then((data) => {
                setAirData(data);
                console.log(data)
            })
            .catch((error) => {
                console.error('Lỗi', error);
            });
    },[station_id]);
    return ( 
        <div className={cx('parents')}>
             <div className={cx('child')}>
             {airData && airData.data && airData.data.map((sensor, index) => (
    <div key={index}>
        {sensor.sensor_name} ({sensor.sensor_key}): {sensor.sensor_value} {sensor.sensor_unit}
    </div>
))}

             </div>
            <ShapeChart name="Biểu đồ thống kê lượng CO2" data={CO2} />
            <CollapseChart name="Biểu đồ thống kê tổng hợp" data={temperature} key1="soiltemperature" key2="temperature" key3="airhumidity" key4="soilhumidity" width="600px" height="500px"/>
            <ComposedChartComponent name="Biểu đồ thống kê PM" data={pm} key1="pm10" key2="pm25" key3="ec" />
        </div>
     );
}

export default NameAirStatistical;