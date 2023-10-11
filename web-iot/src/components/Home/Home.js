import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import StationAir from '../StationAir/StationAir';
import StationWater from '../StationWater/StationWater';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);
function Home() {
  const [apiData, setApiData] = useState(null);
  const [matchingStationIds, setMatchingStationIds] = useState([]);
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
  
  useEffect(() => {
    // Kiểm tra xem apiData có giá trị không rỗng trước khi gọi API thứ hai
    if (apiData) {
      fetch('http://localhost:1104/api/compare-dates')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Kết nối thất bại');
          }
          return response.json();
        })
        .then((data) => {
          const secondApiData = data.result;
  
          // Trích xuất chuỗi station_id từ danh sách đối tượng của API thứ nhất
          const firstApiStationIds = apiData.map((item) => item.station_id);
  
          // Kiểm tra nếu station_id từ API thứ hai tồn tại trong danh sách station_id từ API thứ nhất
          const matchingIds = secondApiData.filter((item) =>
            firstApiStationIds.includes(item)
          );
  
          // Lưu trữ kết quả vào state matchingStationIds
          setMatchingStationIds(matchingIds);
          console.log(matchingStationIds)
        })
        .catch((error) => {
          console.error('Lỗi', error);
        });
    }
  }, [apiData]);  
  console.log(apiData)
  console.log(matchingStationIds)
  return (
    <div className="App">
      <h2 style={{marginTop:"20px",fontFamily:"sans-serif",color:"#ee6b12"}}>Hệ thống giám sát quan trắc nước và không khí</h2>
      <div style={{display:"flex"}}>
      {apiData && apiData.slice(0, 6).map((item, index) => {
      const isMatchingStation = matchingStationIds.includes(item.station_id);
      return (
        <StationAir
      key={index}
      name={item.station_id}
      isMatching={isMatchingStation}
    />
      );
    })}
    </div>

    <div style={{display:"flex",marginTop:"10px"}}>
    {apiData && apiData.slice(6, 12).map((item, index) => {
       const isMatchingStation = matchingStationIds.includes(item.station_id);
       console.log(isMatchingStation)
       return (
        <StationWater
       key={index}
      name={item.station_id}
      isMatching={isMatchingStation}
    />
       );
    })}
    </div>
    <Link to="/statistical" className='btn btn-info mt-3'>Thống kê tổng hợp</Link>
     </div>
  );
}

export default Home;
