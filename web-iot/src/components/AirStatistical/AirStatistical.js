
import CollapseChart from "../CollapseChart/CollapseChart";
import ShapeChart from "../ShapeChart/ShapeChart";
import ComposedChartComponent from "../ComposedChart/ComposedChart";
import classNames from 'classnames/bind';
import styles from './AirStatistical.module.scss';
import { useEffect } from "react";
import { useState } from "react";
const cx = classNames.bind(styles);

function AirStatistical(props) {
    const [airData, setAirData] = useState({});
    const [temperature,setTemperature] = useState([]);
    const [pm,setPM] = useState([]);
    const [CO2,setCO2] = useState([]);
    const { month,year } = props;
    console.log(year);
    useEffect(() => {
        // Gọi API khi thành phần được tạo
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:1104/api/air-max-values?year=${year}&month=${month}`);
                if (!response.ok) {
                    throw new Error('Lỗi khi gọi API');
                }
                const data = await response.json();
                setAirData(data);
            } catch (error) {
                console.error('Lỗi gọi API:', error);
            }
        };

        fetchData();

        //Gọi API làm cho CollapseChart
        const fetchData2 = async () => {
            try {
                const response = await fetch(`http://localhost:1104/api/temperature-values?year=${year}&month=${month}`);
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
                const response = await fetch(`http://localhost:1104/api/PM-values?year=${year}&month=${month}`);
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
                const response = await fetch(`http://localhost:1104/api/co2-values?year=${year}&month=${month}`);
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
    }, []);
    return ( 
        <div className={cx('parents')}>
             <div className={cx('child')}>
             {Object.keys(airData).map((key, index) => (
                    <p key={index}>{key}: {airData[key]}</p>
                ))}
             </div>
            <ShapeChart name="Biểu đồ thống kê lượng CO2" data={CO2} />
            <CollapseChart name="Biểu đồ thống kê tổng hợp" data={temperature} key1="soiltemperature" key2="temperature" key3="airhumidity" key4="soilhumidity" width="600px" height="500px"/>
            <ComposedChartComponent name="Biểu đồ thống kê PM" data={pm} key1="pm10" key2="pm25" key3="ec" />
        </div>
     );
}

export default AirStatistical;