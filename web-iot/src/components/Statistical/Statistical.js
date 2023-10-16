import classNames from 'classnames/bind';
import styles from './Statistical.module.scss';
import { useEffect, useState } from 'react';
import AirStatistical from '../AirStatistical/AirStatistical';
import WaterStatical from '../WaterStatistical/WaterStatistical';
import DetailsAir from '../DetailsAir/DetailsAir';
import NameAirStatistical from '../NameAirStatistical/NameAirStatistical';
import NameWaterStatical from '../NameWaterStatistical/NameWaterStatistical';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);
function Statiscal() {
    const [apiData, setApiData] = useState(null);
    const [selectedOption, setSelectedOption] = useState("air-max-values");
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [isDataSelected, setIsDataSelected] = useState(false);
    useEffect(() => {
        //API để lấy tên trạm 
        const apiUrl = 'http://localhost:1104/api/data';
        fetch(apiUrl)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Kết nối thất bại');
            }
            return response.json();
          })
          .then((data) => {
            setApiData(data);
          })
          .catch((error) => {
            console.error('Lỗi', error);
          });
      }, []);

      const handleOptionChange = (option) => {
        setSelectedOption(option);
      };
      
      useEffect(() => {
        if (selectedMonth && selectedYear && isDataSelected) {
          setIsDataSelected(false); // Đặt lại isDataSelected để cho lần sau
        }
      }, [selectedMonth, selectedYear]);
    return ( 
        <div className='App'>
            <h1 className="mt-4" style={{color:"#FF6347",fontSize:"28px"}}>Thống kê tổng hợp</h1>
            <div className={cx('type')}>
            <p className='mt-3'>Thống kê theo</p>
            <label>
            <input
            type="radio"
            name="option"
            value="air-max-values"
            checked={selectedOption === "air-max-values"}
            onChange={() => handleOptionChange("air-max-values")}
          />
                    Tất cả trạm Khí
            </label>
            <label>
            <input
            type="radio"
            name="option"
            value="water-max-values"
            checked={selectedOption === "water-max-values"}
            onChange={() => handleOptionChange("water-max-values")}
          />
                    Tất cả trạm Nước
            </label>
            {apiData ? (
            <select
            style={{ marginLeft: "20px", padding: "4.5px 12px" }}
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="">Chọn trạm</option>
            {apiData.map((station) => (
              <option key={station.station_id} value={station.station_id}>
                {station.station_id}
              </option>
            ))}
          </select>
            ) : (
            <p>Loading...</p>
            )}
           <input
            type="number"
             placeholder="Nhập tháng"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            />
          <input
            type="number"
             placeholder="Nhập năm"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
/>
            <button
                style={{ marginLeft: "40px", padding: "7px 20px" }}
                className="btn btn-info"
                onClick={() => {
                  if (selectedMonth && selectedYear) {
                    // Kiểm tra giá trị tháng
                    const monthValue = parseInt(selectedMonth, 10);
                    if (monthValue < 1 || monthValue > 12) {
                      alert("Tháng không hợp lệ. Vui lòng nhập lại!!!");
                      return;
                    }
              
                    // Kiểm tra giá trị năm
                    const currentYear = new Date().getFullYear();
                    const yearValue = parseInt(selectedYear, 10);
                    if (yearValue > currentYear) {
                      alert("Năm không hợp lệ. Vui lòng nhập lại!!!");
                      return;
                    }
              
                    setIsDataSelected(true);
                  } else {
                    alert("Vui lòng chọn cả năm và tháng.");
                  }
                }}
                >Thống kê
              </button>
            </div>
            {isDataSelected && selectedOption === "air-max-values" && (
        <AirStatistical month={selectedMonth} year={selectedYear} />
      )}
      {isDataSelected && selectedOption === "water-max-values" && (
        <WaterStatical month={selectedMonth} year={selectedYear} />
      )}
      
      {isDataSelected && (
  (selectedOption.startsWith("TRC-solar-air") && (
    <NameAirStatistical station_id={selectedOption} month={selectedMonth} year={selectedYear} />
  )))}

{isDataSelected && (
  (selectedOption.startsWith("TRC-water-sensor") && (
    <NameWaterStatical station_id={selectedOption} month={selectedMonth} year={selectedYear} />
  )))}
  <Link to="/" style={{textDecoration:"none", color:"white",marginBottom:"20px"}}>Quay lại</Link>
        </div>
        
     );
}

export default Statiscal;