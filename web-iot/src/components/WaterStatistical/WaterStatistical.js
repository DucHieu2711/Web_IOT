
import CollapseChart from "../CollapseChart/CollapseChart";
import classNames from 'classnames/bind';
import styles from './WaterStatistical.module.scss';
import { useEffect } from "react";
import { useState } from "react";
import DomainChart from "../DomainChart/DomainChart";
import LineChartComponent from "../LineChart/LineChart";
const cx = classNames.bind(styles);

function WaterStatical(props) {
    const [airData, setAirData] = useState({});
    const [ec,setEc] = useState([]);
    const [waterlever,setWaterLever] = useState([]);
    const [oxy,setOxy] = useState([]);
    const { month,year } = props;
    useEffect(() => {
        // Gọi API khi thành phần được tạo
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:1104/api/water-max-values?year=${year}&month=${month}`);
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

        //Gọi API làm cho DomainChart
        const fetchData2 = async () => {
            try {
                const response = await fetch(`http://localhost:1104/api/waterlever-values?year=${year}&month=${month}`);
                if (!response.ok) {
                    throw new Error('Lỗi khi gọi API');
                }
                const data = await response.json();
                setWaterLever(data);
            } catch (error) {
                console.error('Lỗi gọi API:', error);
            }
        };
        fetchData2();

        
        //Gọi API làm cho CollapseChart
        const fetchData3 = async () => {
            try {
                const response = await fetch(`http://localhost:1104/api/ec-values?year=${year}&month=${month}`);
                if (!response.ok) {
                    throw new Error('Lỗi khi gọi API');
                }
                const data = await response.json();
                setEc(data);
            } catch (error) {
                console.error('Lỗi gọi API:', error);
            }
        };
        fetchData3();
        

        //Gọi API làm cho LineChart
        const fetchData4 = async () => {
            try {
                const response = await fetch(`http://localhost:1104/api/oxy-values?year=${year}&month=${month}`);
                if (!response.ok) {
                    throw new Error('Lỗi khi gọi API');
                }
                const data = await response.json();
                setOxy(data);
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
             <DomainChart classNames={cx('ec')} name="Biểu đồ thống kê độ dẫn điện" data={ec} dataKey="ec" width="600px" height="380px"/>
            <CollapseChart name="Biểu đồ thống kê tổng hợp" data={waterlever} key1="cm" key2="tds" key3="pH" key4="NTU" width="600px" height="500px"/>
            <LineChartComponent data={oxy} name="Biểu đồ nhiệt độ và Oxy" dataKey1="do" dataKey2="temperature" width="600px" height="500px"/>
        </div>
     );
}

export default WaterStatical;