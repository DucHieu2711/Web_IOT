const express = require('express');
const cors = require('cors'); 
const mysql = require('mysql2');
const mqtt = require('mqtt');
const { DateTime } = require('luxon');
const app = express();
const port = 1104;

// Tạo MQTT client
const brokerUrl = 'http://mqttserver.tk';
const brokerPort = 1883;
const brokerUsername = 'tram_chim_sub';
const brokerPassword = 'TramChimMQTT...';
let sseClients = [];
let lastData = null;
let newData = null;
function sendSSEData(data) {
    sseClients.forEach(client => {
        client.res.write(`data: ${JSON.stringify(data)}\n\n`);
    });
}

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    // Các cài đặt CORS khác nếu cần
    next();
});

app.get('/api/sse', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    sseClients.push({ req, res });

    // Gửi dữ liệu gần nhất ngay khi máy khách kết nối
    if (lastData) {
        res.write(`data: ${JSON.stringify(lastData)}\n\n`);
    }

    // Xử lý khi máy khách ngắt kết nối
    req.on('close', () => {
        sseClients = sseClients.filter(client => client.res !== res);
    });
});


const brokerClient = mqtt.connect(brokerUrl, {
  host: brokerUrl,
  port: brokerPort,
  username: brokerUsername,
  password: brokerPassword,
});

// Hàm callback khi kết nối thành công
brokerClient.on('connect', () => {
  console.log('Connected to broker');
  // Đăng ký để nhận thông điệp khi kết nối thành công
    //brokerClient.subscribe('/tram_chim_monitoring/dong_thap/solar-air-001', (err, granted) => {
    //    if (!err) {
    //        console.log('Đã đăng ký nhận dữ liệu từ broker');
    //    } else {
    //        console.error('Lỗi khi đăng ký:', err);
    //    }
    //});
    brokerClient.subscribe('/tram_chim_monitoring/dong_thap/solar-air-002', (err, granted) => {
        if (!err) {
            console.log('Đã đăng ký nhận dữ liệu từ broker');
        } else {
            console.error('Lỗi khi đăng ký:', err);
        }
    });
    brokerClient.subscribe('/tram_chim_monitoring/dong_thap/solar-air-003', (err, granted) => {
        if (!err) {
            console.log('Đã đăng ký nhận dữ liệu từ broker');
        } else {
            console.error('Lỗi khi đăng ký:', err);
        }
    });
    // brokerClient.subscribe('/tram_chim_monitoring/dong_thap/solar-air-004', (err, granted) => {
    //     if (!err) {
    //         console.log('Đã đăng ký nhận dữ liệu từ broker');
    //     } else {
    //         console.error('Lỗi khi đăng ký:', err);
    //     }
    // });
    brokerClient.subscribe('/tram_chim_monitoring/dong_thap/solar-air-005', (err, granted) => {
        if (!err) {
            console.log('Đã đăng ký nhận dữ liệu từ broker');
        } else {
            console.error('Lỗi khi đăng ký:', err);
        }
    });
    //brokerClient.subscribe('/tram_chim_monitoring/dong_thap/solar-air-006', (err, granted) => {
    //    if (!err) {
    //        console.log('Đã đăng ký nhận dữ liệu từ broker');
    //    } else {
    //        console.error('Lỗi khi đăng ký:', err);
    //    }
    //});
    //brokerClient.subscribe('/tram_chim_monitoring/dong_thap/water-sensor-001', (err, granted) => {
    //    if (!err) {
    //        console.log('Đã đăng ký nhận dữ liệu từ broker');
    //    } else {
    //        console.error('Lỗi khi đăng ký:', err);
    //    }
    //});
    //brokerClient.subscribe('/tram_chim_monitoring/dong_thap/water-sensor-002', (err, granted) => {
    //    if (!err) {
    //        console.log('Đã đăng ký nhận dữ liệu từ broker');
    //    } else {
    //        console.error('Lỗi khi đăng ký:', err);
    //    }
    //});
    //brokerClient.subscribe('/tram_chim_monitoring/dong_thap/water-sensor-003', (err, granted) => {
    //    if (!err) {
    //        console.log('Đã đăng ký nhận dữ liệu từ broker');
    //    } else {
    //        console.error('Lỗi khi đăng ký:', err);
    //    }
    //});
    //brokerClient.subscribe('/tram_chim_monitoring/dong_thap/water-sensor-004', (err, granted) => {
    //    if (!err) {
    //        console.log('Đã đăng ký nhận dữ liệu từ broker');
    //    } else {
    //        console.error('Lỗi khi đăng ký:', err);
    //    }
    //});
    //brokerClient.subscribe('/tram_chim_monitoring/dong_thap/water-sensor-005', (err, granted) => {
    //    if (!err) {
    //        console.log('Đã đăng ký nhận dữ liệu từ broker');
    //    } else {
    //        console.error('Lỗi khi đăng ký:', err);
    //    }
    //});
    //brokerClient.subscribe('/tram_chim_monitoring/dong_thap/water-sensor-006', (err, granted) => {
    //    if (!err) {
    //        console.log('Đã đăng ký nhận dữ liệu từ broker');
    //    } else {
    //        console.error('Lỗi khi đăng ký:', err);
    //    }
    //});
});

// Tạo kết nối đến cơ sở dữ liệu MySQL
const db = mysql.createConnection({
  host: 'localhost', // Thay đổi thành địa chỉ MySQL của bạn
  user: 'root', // Thay đổi thành tên người dùng MySQL của bạn
  password: 'hieu27112001@', // Thay đổi thành mật khẩu MySQL của bạn
  database: 'tram_chim' // Thay đổi thành tên cơ sở dữ liệu MySQL của bạn
});

// Kết nối đến cơ sở dữ liệu
db.connect(err => {
  if (err) {
    console.error('Lỗi kết nối đến cơ sở dữ liệu:', err);
  } else {
    console.log('Kết nối đến cơ sở dữ liệu thành công');
  }
});

brokerClient.on('message', (topic, receivedMessage) => {
    const messageString = receivedMessage.toString();

    try {
        const messageJSON = JSON.parse(messageString);
        console.log(`Received JSON message on topic ${topic}:`, messageJSON);

        const milliseconds = messageJSON.timestamp * 1000;
        const date = new Date(milliseconds);

        // Lưu messageJSON vào cơ sở dữ liệu MySQL
        const sql = 'INSERT INTO messtram ' +
            '(station_id, volt_battery, volt_solar, timestamp) ' +
            'VALUES (?, ?, ?, ?)';

        const values1 = [
            messageJSON.station_id,
            messageJSON.volt_battery,
            messageJSON.volt_solar,
            date,
        ];

        db.query(sql, values1, (error1, results1) => {
            if (error1) {
                console.error('Lỗi khi thực hiện truy vấn SQL:', error1);
            } else {
                console.log('Dữ liệu đã được lưu vào cơ sở dữ liệu (messtram).');
            }
        });

        if (messageJSON && Array.isArray(messageJSON.data_sensor)) {
            const sensorData = messageJSON.data_sensor;

            for (const sensor of sensorData) {
                // Lưu sensor vào cơ sở dữ liệu MySQL
                const sql2 = 'INSERT INTO datasensor ' +
                    '(station_id, sensor_name, sensor_key, sensor_unit, sensor_value, timestamp) ' +
                    'VALUES (?, ?, ?, ?, ?, ?)';

                const values2 = [
                    messageJSON.station_id,
                    sensor.sensor_name,
                    sensor.sensor_key,
                    sensor.sensor_unit,
                    sensor.sensor_value,
                    date,
                ];

                db.query(sql2, values2, (error2, results2) => {
                    if (error2) {
                        console.error('Lỗi khi thực hiện truy vấn SQL:', error2);
                    } else {
                        console.log('Dữ liệu đã được lưu vào cơ sở dữ liệu (datasensor).');
                    }
                });
            }

            // Gọi hàm gửi SSE tại đây khi có dữ liệu mới
            sendSSEData(messageJSON);
        } else {
            console.error('Dữ liệu JSON không hợp lệ hoặc thiếu trường "data_sensor".');
        }
    } catch (error) {
        console.error('Lỗi khi phân tích JSON:', error);
    }
    fetchDataFromDatabase();
});

function fetchDataFromDatabase() {
    const sql = 'SELECT * FROM datasensor';

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
        } else {
            // So sánh dữ liệu mới với dữ liệu cũ để kiểm tra xem có sự thay đổi
            if (JSON.stringify(result) !== JSON.stringify(newData)) {
                newData = result;
                // Gửi dữ liệu qua SSE nếu có sự thay đổi
                sendSSEData(newData);
                // Gọi lại API từ phía frontend để lấy dữ liệu mới
                // Thêm mã ở đây để gọi lại API từ frontend
            }
        }
    });
}

// Định nghĩa các tuyến (routes) cho API ở đây

app.use(cors());

app.use(cors({
    origin: 'http://localhost:3000',  // Thay đổi thành trang web của bạn
}));

app.listen(port, () => {
  console.log(`API đang chạy trên cổng ${port}`);
});

// Lấy tất cả dữ liệu từ một bảng
app.get('/api/data', (req, res) => {
    const sql = 'SELECT * FROM thongtintram'; // Thay đổi thành tên bảng của bạn

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
        } else {
            res.json(result);
        }
    });
});

// Lấy dữ liệu từ TRC-solar-air-003
app.get('/api/TRC-solar-air-003', (req, res) => {
    const subquery = '(SELECT MAX(timestamp) FROM messtram WHERE station_id = "TRC-solar-air-003")';

    const sql = `SELECT station_id, sensor_name, sensor_key, sensor_value, timestamp
               FROM datasensor
               WHERE station_id = "TRC-solar-air-003" AND timestamp = ${subquery}`;

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
        } else {
            res.json(result);
        }
    });
});


// API endpoint cho air sensor
//http://localhost:1104/api/solar-air/?station_id=TRC-solar-air-005
app.get('/api/solar-air', (req, res) => {
    const stationId = req.query.station_id || 'TRC-solar-air-001';

    // Lấy tháng và năm hiện tại
    const today = new Date();
    const currentMonth = today.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
    const currentYear = today.getFullYear();

    const subquery = `(SELECT MAX(timestamp) FROM datasensor WHERE station_id = "${stationId}" AND MONTH(timestamp) = ${currentMonth} AND YEAR(timestamp) = ${currentYear})`;
    const sql1 = `SELECT sensor_name, sensor_key, sensor_value, sensor_unit FROM datasensor WHERE station_id = "${stationId}" AND timestamp = ${subquery}`;
    const sql2 = `SELECT max(sensor_value) as "Nhiệt độ cao nhất" FROM datasensor WHERE station_id = "${stationId}" AND sensor_name = "Nhiệt độ" AND MONTH(timestamp) = ${currentMonth} AND YEAR(timestamp) = ${currentYear}`;
    const sql3 = `SELECT max(sensor_value) as "Độ ẩm cao nhất" FROM datasensor WHERE station_id = "${stationId}"    AND sensor_name = "Độ ẩm" AND MONTH(timestamp) = ${currentMonth} AND YEAR(timestamp) = ${currentYear}`;
    const sql4 = `SELECT max(sensor_value) as "CO2 cao nhất" FROM datasensor WHERE station_id = "${stationId}" AND sensor_name = "CO2" AND MONTH(timestamp) = ${currentMonth} AND YEAR(timestamp) = ${currentYear}`;
    const sql5 = `(SELECT MAX(timestamp) as "Thời gian tối đa" FROM messtram WHERE station_id = "${stationId}" AND MONTH(timestamp) = ${currentMonth} AND YEAR(timestamp) = ${currentYear})`;

    db.query(sql1, (err, result) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
        } else {
            db.query(sql2, (err2, result2) => {
                if (err2) {
                    console.error('Lỗi truy vấn cơ sở dữ liệu:', err2);
                    res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
                } else {
                    db.query(sql3, (err3, result3) => {
                        if (err3) {
                            console.error('Lỗi truy vấn cơ sở dữ liệu:', err3);
                            res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
                        } else {
                            db.query(sql4, (err4, result4) => {
                                if (err4) {
                                    console.error('Lỗi truy vấn cơ sở dữ liệu:', err4);
                                    res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
                                } else {
                                    db.query(sql5, (err5, result5) => {
                                        if (err5) {
                                            console.error('Lỗi truy vấn cơ sở dữ liệu:', err5);
                                            res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
                                        } else {
                                            const timestampMax = result5[0]['Thời gian tối đa'];
                                            const formattedDate = new Date(timestampMax).toLocaleString('vi-VN');

                                            const responseData = {
                                                data: result,
                                                maxtemperature: result2,
                                                maxairhumidity: result3,
                                                maxCO2: result4,
                                                time: formattedDate
                                            };
                                            res.json(responseData);
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});


// API endpoint cho water sensors
app.get('/api/water-sensor', (req, res) => {
    const stationId = req.query.station_id || 'TRC-water-sensor-001';

    // Lấy tháng và năm hiện tại
    const today = new Date();
    const currentMonth = today.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
    const currentYear = today.getFullYear();

    // Truy vấn SQL riêng cho từng thông số
    const sql1 = `(SELECT sensor_name, sensor_key, sensor_value, sensor_unit FROM datasensor WHERE station_id = "${stationId}" AND timestamp = (SELECT MAX(timestamp) FROM messtram WHERE station_id = "${stationId}"))`;
    const sql2 = `(SELECT max(sensor_value)  as "Nhiệt độ cao nhất" FROM datasensor WHERE station_id = "${stationId}" AND sensor_name = "Nhiệt độ" AND MONTH(timestamp) = ${currentMonth} AND YEAR(timestamp) = ${currentYear})`;
    const sql3 = `(SELECT max(sensor_value)  as "Mực nước cao nhất" FROM datasensor WHERE station_id = "${stationId}" AND sensor_name = "Mực nước" AND MONTH(timestamp) = ${currentMonth} AND YEAR(timestamp) = ${currentYear})`;
    const sql4 = `(SELECT max(sensor_value)  as "Oxy cao nhất" FROM datasensor WHERE station_id = "${stationId}" AND sensor_name = "Oxy" AND MONTH(timestamp) = ${currentMonth} AND YEAR(timestamp) = ${currentYear})`;
    const sql5 = `(SELECT MAX(timestamp) as "Thời gian tối đa" FROM datasensor WHERE station_id = "${stationId}")`;

    db.query(sql1, (err, result) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
        } else {
            db.query(sql2, (err2, result2) => {
                if (err2) {
                    console.error('Lỗi truy vấn cơ sở dữ liệu:', err2);
                    res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
                } else {
                    db.query(sql3, (err3, result3) => {
                        if (err3) {
                            console.error('Lỗi truy vấn cơ sở dữ liệu:', err3);
                            res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
                        } else {
                            db.query(sql4, (err4, result4) => {
                                if (err4) {
                                    console.error('Lỗi truy vấn cơ sở dữ liệu:', err4);
                                    res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
                                } else {
                                    db.query(sql5, (err5, result5) => {
                                        if (err5) {
                                            console.error('Lỗi truy vấn cơ sở dữ liệu:', err5);
                                            res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
                                        } else {
                                            const timestampMax = result5[0]['Thời gian tối đa'];
                                            const formattedDate = new Date(timestampMax).toLocaleString('vi-VN');

                                            const responseData = {
                                                data: result,
                                                maxtemperature: result2,
                                                maxwaterlevel: result3,
                                                maxOxy: result4,
                                                time: formattedDate // Sử dụng giá trị ngày-tháng-năm-giờ-phút-giây đã được định dạng
                                            };
                                            res.json(responseData);
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});



//Lấy nhiệt độ cao nhất của năm truyền vào mặt định là hiện tại trạm truyền vào mặt định là trạm 1
http://localhost:1104/api/solar-air/maxairtemperature?station_id=TRC-solar-air-002
app.get('/api/solar-air/maxairtemperature', (req, res) => {
    const stationId = req.query.station_id || 'TRC-solar-air-001';
    const year = req.query.year || new Date().getFullYear();
    const month = req.query.month || new Date().getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng thêm 1

    // Truy vấn SQL để lấy dữ liệu nhiệt độ cao nhất cho tháng và năm cụ thể
    const sql = `SELECT MAX(sensor_value) AS max_temperature FROM datasensor 
                 WHERE station_id = "${stationId}" 
                 AND sensor_name = "Nhiệt độ" 
                 AND MONTH(timestamp) = "${month}" 
                 AND YEAR(timestamp) = "${year}"`;

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
        } else {
            res.json(result);
        }
    });
});

//Lấy độ ẩm nhất của năm truyền vào mặt định là hiện tại trạm truyền vào mặt định là trạm 1
http://localhost:1104/api/solar-air/maxairhumidity?station_id=TRC-solar-air-002
app.get('/api/solar-air/maxairhumidity', (req, res) => {
    const stationId = req.query.station_id || 'TRC-solar-air-001';
    const year = req.query.year || new Date().getFullYear();
    const month = req.query.month || new Date().getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng thêm 1

    // Truy vấn SQL để lấy dữ liệu nhiệt độ trong tháng
    const sql = `select max(sensor_value) as "Độ ẩm cao nhất" from datasensor 
                where station_id = "${stationId}" and sensor_name = "Độ ẩm" AND month(timestamp) >= "${month}" AND month(timestamp) <= "${month}" AND year(timestamp) = "${year}"`;

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
        } else {
            res.json(result);
        }
    });
});

//Lấy CO2 nhất của năm truyền vào mặt định là hiện tại trạm truyền vào mặt định là trạm 1
http://localhost:1104/api/solar-air/maxco2?station_id=TRC-solar-air-002
app.get('/api/solar-air/maxco2', (req, res) => {
    const stationId = req.query.station_id || 'TRC-solar-air-001';
    const year = req.query.year || new Date().getFullYear();
    const month = req.query.month || new Date().getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng thêm 1

    // Truy vấn SQL để lấy dữ liệu nhiệt độ trong tháng
    const sql = `select max(sensor_value) as "CO2 cao nhất" from datasensor 
                where station_id = "${stationId}" and sensor_name = "CO2" AND month(timestamp) >= "${month}" AND month(timestamp) <= "${month}" AND year(timestamp) = "${year}"`;

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
        } else {
            res.json(result);
        }
    });
});

//Lấy mực nước nhất của năm truyền vào mặt định là hiện tại trạm truyền vào mặt định là trạm 1
http://localhost:1104/api/water-sensor/maxwaterlevel?station_id=TRC-solar-air-001
app.get('/api/water-sensor/maxwaterlevel', (req, res) => {
    const stationId = req.query.station_id || 'TRC-water-sensor-001';
    const year = req.query.year || new Date().getFullYear();
    const month = req.query.month || new Date().getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng thêm 1

    // Truy vấn SQL để lấy dữ liệu nhiệt độ trong tháng
    const sql = `select max(sensor_value) as "Mực nước cao nhất" from datasensor 
                where station_id = "${stationId}" and sensor_name = "Mực nước" AND month(timestamp) >= "${month}" AND month(timestamp) <= "${month}" AND year(timestamp) = "${year}"`;

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
        } else {
            res.json(result);
        }
    });
});

//Lấy nhiệt độ nước nhất của năm truyền vào mặt định là hiện tại trạm truyền vào mặt định là trạm 1
http://localhost:1104/api/water-sensor/maxwatertemperature?station_id=TRC-solar-air-001
app.get('/api/water-sensor/maxwatertemperature', (req, res) => {
    const stationId = req.query.station_id || 'TRC-water-sensor-001';
    const year = req.query.year || new Date().getFullYear();
    const month = req.query.month || new Date().getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng thêm 1

    // Truy vấn SQL để lấy dữ liệu nhiệt độ trong tháng
    const sql = `select max(sensor_value) as "Nhiệt độ cao nhất" from datasensor 
                where station_id = "${stationId}" and sensor_name = "Nhiệt độ" AND month(timestamp) >= "${month}" AND month(timestamp) <= "${month}" AND year(timestamp) = "${year}"`;

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
        } else {
            res.json(result);
        }
    });
});

//Lấy ph nhất của năm truyền vào mặt định là hiện tại trạm truyền vào mặt định là trạm 1
http://localhost:1104/api/water-sensor/maxph?station_id=TRC-solar-air-001
app.get('/api/water-sensor/maxph', (req, res) => {
    const stationId = req.query.station_id || 'TRC-water-sensor-001';
    const year = req.query.year || new Date().getFullYear();
    const month = req.query.month || new Date().getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng thêm 1

    // Truy vấn SQL để lấy dữ liệu nhiệt độ trong tháng
    const sql = `select max(sensor_value) as "pH cao nhất" from datasensor 
                where station_id = "${stationId}" and sensor_name = "pH" AND month(timestamp) >= "${month}" AND month(timestamp) <= "${month}" AND year(timestamp) = "${year}"`;

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
        } else {
            res.json(result);
        }
    });
});

// thống kê nhiệt độ 
http://localhost:1104/api/solar-air/bieudonhietdo?station_id=TRC-solar-air-005&year=2023&month=10
app.get('/api/solar-air/bieudonhietdo', (req, res) => {
    const stationId = req.query.station_id || 'TRC-solar-air-001';
    const year = req.query.year || new Date().getFullYear();
    const month = req.query.month || new Date().getMonth() + 1; // Lấy tháng hiện tại nếu không có tháng được cung cấp

    // Truy vấn SQL để lấy dữ liệu nhiệt độ trong tháng và năm cụ thể
    const sql = `
    SELECT
      DATE_FORMAT(timestamp, '%Y-%m-%d %H:%i:%s') AS date,
      ROUND(AVG(sensor_value), 0) AS average_temperature
    FROM
      datasensor
    WHERE
      station_id = "${stationId}"
      AND LOWER(sensor_name) = "nhiệt độ"
      AND MONTH(timestamp) = "${month}"
      AND YEAR(timestamp) = "${year}"
    GROUP BY
      DATE_FORMAT(timestamp, '%Y-%m-%d %H:%i:%s')
    `;

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
        } else {
            const data = result.map(row => ({
                date: row.date,
                temperature: row.average_temperature.toString(), // Chuyển thành chuỗi để loại bỏ số 0 sau dấu thập phân
            }));

            res.json(data);
        }
    });
});

//thống kê CO2
app.get('/api/solar-air/bieudoco2', (req, res) => {
    const stationId = req.query.station_id || 'TRC-solar-air-001';
    const year = req.query.year || new Date().getFullYear();
    const month = req.query.month || new Date().getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng thêm 1

    // Truy vấn SQL để lấy dữ liệu CO2 trong tháng
    const sql = `
    SELECT
      DATE_FORMAT(timestamp, '%Y-%m-%d %H:%i:%s') AS date,
      AVG(sensor_value) AS average_CO2
    FROM
      datasensor
    WHERE
      station_id = "${stationId}"
      AND sensor_name = "CO2"
      AND MONTH(timestamp) = "${month}"
      AND YEAR(timestamp) = "${year}"
    GROUP BY
      DATE_FORMAT(timestamp, '%Y-%m-%d %H:%i:%s')
    `;

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
        } else {
            const data = result.map(row => ({
                date: row.date,
                ppm: parseInt(row.average_CO2),
            }));

            res.json(data);
        }
    });
});



//http://localhost:1104/api/solar-air/bieudodoamvanhietdo?station_id=TRC-solar-air-003&year=2023&month=10
app.get('/api/solar-air/bieudodoamvanhietdo', (req, res) => {
    const stationId = req.query.station_id || 'TRC-solar-air-001';
    const year = req.query.year || new Date().getFullYear();
    const month = req.query.month || new Date().getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng thêm 1

    // Truy vấn SQL để lấy dữ liệu độ ẩm đất và độ ẩm không khí trong tháng
    const sql = `
    SELECT
      DATE_FORMAT(timestamp, '%Y-%m-%d %H:%i:%s') AS date,
      AVG(CASE WHEN sensor_name = "Nhiệt Độ Đất" THEN sensor_value END) AS average_soil_temperature,
      AVG(CASE WHEN sensor_name = "Độ ẩm Đất" THEN sensor_value END) AS average_soil_humidity
    FROM
      datasensor
    WHERE
      station_id = "${stationId}"
      AND (sensor_name = "Nhiệt Độ Đất" OR sensor_name = "Độ ẩm Đất")
      AND MONTH(timestamp) = "${month}"
      AND YEAR(timestamp) = "${year}"
    GROUP BY
      DATE_FORMAT(timestamp, '%Y-%m-%d %H:%i:%s')
    `;

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
        } else {
            const data = result.map(row => ({
                date: row.date,
                temperature: parseInt(row.average_soil_temperature) ,
                percent: parseInt(row.average_soil_humidity),
            }));

            res.json(data);
        }
    });
});





//bieu do tong hop 4 cai nhiet do oxy TDS Mưc nước
//http://localhost:1104/api/water-sensor/bieudotonghop?station_id=TRC-water-sensor-001&year=2023&month=10
app.get('/api/water-sensor/bieudotonghop', (req, res) => {
    const stationId = req.query.station_id || 'TRC-water-sensor-001';
    const year = req.query.year || new Date().getFullYear();
    const month = req.query.month || new Date().getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng thêm 1

    // Truy vấn SQL để lấy dữ liệu nhiệt độ trong tháng
    const sql = `
    SELECT
      DATE_FORMAT(timestamp, '%Y-%m-%d %H:%i:%s') AS date,
      AVG(CASE WHEN sensor_name = "Nhiệt độ" THEN sensor_value ELSE NULL END) AS temperature,
      AVG(CASE WHEN sensor_name = "Oxy" THEN sensor_value ELSE NULL END) AS do,
      AVG(CASE WHEN sensor_name = "TDS" THEN sensor_value ELSE NULL END) AS tds,
      AVG(CASE WHEN sensor_name = "Mực Nước" THEN sensor_value ELSE NULL END) AS waterlevel
    FROM
      datasensor
    WHERE
      station_id = "${stationId}"
      AND month(timestamp) = "${month}"
      AND year(timestamp) = "${year}"
    GROUP BY
      DATE_FORMAT(timestamp, '%Y-%m-%d %H:%i:%s')
    `;

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
        } else {
            const data = result.map(row => ({
                date: row.date,
                temperature: parseInt(row.temperature),
                do: parseInt(row.do),
                tds: parseInt(row.tds),
                waterlevel: parseInt(row.waterlevel),
            }));

            res.json(data);
        }
    });
});


//http://localhost:1104/api/water-sensor/bieudoph?station_id=TRC-water-sensor-001&year=2023&month=10
app.get('/api/water-sensor/bieudoph', (req, res) => {
    const stationId = req.query.station_id || 'TRC-water-sensor-001';
    const year = req.query.year || new Date().getFullYear();
    const month = req.query.month || new Date().getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng thêm 1

    // Truy vấn SQL để lấy dữ liệu nhiệt độ trong tháng
    const sql = `
    SELECT
      DATE_FORMAT(timestamp, '%Y-%m-%d %H:%i:%s') AS date,
      AVG(sensor_value) AS average_pH
    FROM
      datasensor
    WHERE
      station_id = "${stationId}"
      AND sensor_name = "pH"
      AND MONTH(timestamp) >= "${month}"
      AND MONTH(timestamp) <= "${month}"
      AND YEAR(timestamp) = "${year}"
    GROUP BY
      DATE_FORMAT(timestamp, '%Y-%m-%d %H:%i:%s')
    `;

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
        } else {
            const data = result.map(row => ({
                date: row.date,
                pH: parseInt(row.average_pH),
            }));

            res.json(data);
        }
    });
});

//Biểu đồ độ đẫn điện
app.get('/api/water-sensor/bieudoec', (req, res) => {
    const stationId = req.query.station_id || 'TRC-water-sensor-001';
    const year = req.query.year || new Date().getFullYear();
    const month = req.query.month || new Date().getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng thêm 1

    // Truy vấn SQL để lấy dữ liệu Độ Dẫn Điện trong tháng
    const sql = `
    SELECT
      DATE_FORMAT(timestamp, '%Y-%m-%d %H:%i:%s') AS date,
      AVG(sensor_value) AS average_ec
    FROM
      datasensor
    WHERE
      station_id = "${stationId}"
      AND sensor_name = "Độ Dẫn Điện"
      AND MONTH(timestamp) >= "${month}"
      AND MONTH(timestamp) <= "${month}"
      AND YEAR(timestamp) = "${year}"
    GROUP BY
      DATE_FORMAT(timestamp, '%Y-%m-%d %H:%i:%s')
    `;

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
        } else {
            const data = result.map(row => ({
                date: row.date,
                ec: parseInt(row.average_ec),
            }));

            res.json(data);
        }
    });
});
//Biểu đồ độ đục
app.get('/api/water-sensor/bieudododuc', (req, res) => {
    const stationId = req.query.station_id || 'TRC-water-sensor-001';
    const year = req.query.year || new Date().getFullYear();
    const month = req.query.month || new Date().getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng thêm 1

    // Truy vấn SQL để lấy dữ liệu Độ Dẫn Điện trong tháng
    const sql = `
    SELECT
      DATE_FORMAT(timestamp, '%Y-%m-%d %H:%i:%s') AS date,
      AVG(sensor_value) AS average_turbidity
    FROM
      datasensor
    WHERE
      station_id = "${stationId}"
      AND sensor_name = "Độ Đục"
      AND MONTH(timestamp) >= "${month}"
      AND MONTH(timestamp) <= "${month}"
      AND YEAR(timestamp) = "${year}"
    GROUP BY
      DATE_FORMAT(timestamp, '%Y-%m-%d %H:%i:%s')
    `;

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
        } else {
            const data = result.map(row => ({
                date: row.date,
                NTU: parseInt(row.average_turbidity),
            }));

            res.json(data);
        }
    });
});
app.get('/api/water-sensor/bieudomucnuoc', (req, res) => {
    const stationId = req.query.station_id || 'TRC-water-sensor-001';
    const year = req.query.year || new Date().getFullYear();
    const month = req.query.month || new Date().getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng thêm 1

    // Truy vấn SQL để lấy dữ liệu nhiệt độ trong tháng
    const sql = `
    SELECT
      DATE(timestamp) AS date,
      AVG(sensor_value) AS average_water_level
    FROM
      datasensor
    WHERE
      station_id = "${stationId}"
      AND sensor_name = "Mực nước"
      AND month(timestamp) >= "${month}"
      AND month(timestamp) <= "${month}"
      AND year(timestamp) = "${year}"
    GROUP BY
      DATE(timestamp)
    `;

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
        } else {
            const data = result.map(row => ({
                date: row.date,
                water_level: row.average_water_level,
            }));

            res.json(data);
        }
    });
});

app.get('/api/compare-dates', (req, res) => {
    // Truy vấn SQL để lấy danh sách trạm và thời gian cuối cùng mà mỗi trạm báo cáo
    const sql = `
    SELECT station_id, MAX(timestamp) as last_report_time
    FROM messtram
    GROUP BY station_id`;

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
        } else {
            // Lấy ngày hiện tại và đặt thời gian thành 00:00:00.000
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);

            // Lọc các trạm có thời gian cuối cùng báo cáo là ngày hôm nay
            const todayStations = result.filter(row => {
                const lastReportDate = new Date(row.last_report_time);
                lastReportDate.setHours(0, 0, 0, 0);
                return lastReportDate.getTime() === currentDate.getTime();
            });

            // Lấy danh sách tên trạm
            const stationNames = todayStations.map(station => station.station_id);

            res.json({ result: stationNames });
        }
    });
});
//cài npm install date-fns
//Lấy dữ liệu của tất cả các trạm 
app.get('/api/air-data', (req, res) => {
    const { month, year } = req.query;

    // Kiểm tra nếu tháng và năm được cung cấp từ URL
    if (!month || !year) {
        return res.status(400).json({ error: 'Vui lòng cung cấp tháng và năm trong URL.' });
    }

    // Tạo truy vấn SQL để lấy dữ liệu
    const sql = `
    SELECT timestamp, sensor_name, sensor_value, sensor_unit, station_id
    FROM datasensor
    WHERE sensor_name IN ('CO2', 'Nhiệt Độ', 'Độ Ẩm')
    AND station_id LIKE 'TRC-solar-air%'
    AND MONTH(timestamp) = ? AND YEAR(timestamp) = ?
    ORDER BY timestamp;
  `;

    // Thực hiện truy vấn
    db.query(sql, [month, year], (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            return res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
        }

        res.json(results);
    });
});

//Thống kê tổng hợp

//Lấy toàn bộ thông tin max của tất cả các trạm khí
app.get('/api/air-max-values', (req, res) => {
    const { year, month } = req.query;

    const sql = `
    SELECT
      sensor_name,
      MAX(sensor_value) AS max_value,
      sensor_unit
    FROM
      datasensor
    WHERE
      station_id LIKE 'TRC-solar-air%'
      AND YEAR(timestamp) = ?
      AND MONTH(timestamp) = ?
    GROUP BY
      sensor_name, sensor_unit
  `;

    db.query(sql, [year, month], (err, result) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
        } else {
            // Tạo một đối tượng để lưu trữ kết quả theo định dạng cao nhất của các thuộc tính
            const formattedData = {};

            // Duyệt qua kết quả truy vấn và xác định giá trị tương ứng cho mỗi loại sensor
            result.forEach(row => {
                const sensorName = row.sensor_name;
                const maxUnitValue = row.max_value + ' ' + row.sensor_unit;
                formattedData[sensorName + " Cao Nhất"] = maxUnitValue;
            });

            res.json(formattedData);
        }
    });
});



//Lấy toàn bộ thông tin max của tất cả các trạm nước
app.get('/api/water-max-values', (req, res) => {
    const { year, month } = req.query;

    const sql = `
    SELECT
      sensor_name,
      MAX(sensor_value) AS max_value,
      sensor_unit
    FROM
      datasensor
    WHERE
      station_id LIKE 'TRC-water-sensor%'
      AND YEAR(timestamp) = ?
      AND MONTH(timestamp) = ?
    GROUP BY
      sensor_name, sensor_unit
  `;

    db.query(sql, [year, month], (err, result) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
        } else {
            // Tạo một đối tượng để lưu trữ kết quả theo định dạng cao nhất của các thuộc tính
            const formattedData = {};

            // Duyệt qua kết quả truy vấn và xác định giá trị tương ứng cho mỗi loại sensor
            result.forEach(row => {
                const sensorName = row.sensor_name;
                const maxUnitValue = row.max_value + ' ' + row.sensor_unit;
                formattedData[sensorName + " Cao Nhất"] = maxUnitValue;
            });

            res.json(formattedData);
        }
    });
});



//Lấy giá trị Co2 của tất cả các trạm khí
app.get('/api/CO2-values', (req, res) => {
    const { year, month } = req.query;

    const sql = `
    SELECT
      station_id,
      sensor_value
    FROM
      datasensor
    WHERE
      station_id LIKE 'TRC-solar-air%'
      AND sensor_name = 'CO2'
      AND YEAR(timestamp) = ?
      AND MONTH(timestamp) = ?
  `;

    db.query(sql, [year, month], (err, result) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
        } else {
            res.json(result);
        }
    });
});

//Lấy giá trị nhiệt độ độ ẩm đất và KK
app.get('/api/temperature-values', (req, res) => {
    const { year, month } = req.query;

    const sql = `
        SELECT
            station_id,
            DATE_FORMAT(timestamp, '%Y-%m-%d %H:%i:%s') AS date,
            MAX(CASE WHEN sensor_name = 'Nhiệt Độ' THEN sensor_value END) AS temperature,
            MAX(CASE WHEN sensor_name = 'Độ Ẩm' THEN sensor_value END) AS airhumidity,
            MAX(CASE WHEN sensor_name = 'Nhiệt Độ Đất' THEN sensor_value END) AS soiltemperature,
            MAX(CASE WHEN sensor_name = 'Độ Ẩm Đất' THEN sensor_value END) AS soilhumidity
        FROM
            datasensor
        WHERE
            station_id LIKE 'TRC-solar-air%'
            AND (sensor_name = 'Nhiệt Độ'
                OR sensor_name = 'Độ Ẩm'
                OR sensor_name = 'Nhiệt Độ Đất'
                OR sensor_name = 'Độ Ẩm Đất')
            AND YEAR(timestamp) = ?
            AND MONTH(timestamp) = ?
        GROUP BY station_id, DATE_FORMAT(timestamp, '%Y-%m-%d %H:%i:%s')
    `;

    db.query(sql, [year, month], (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
        } else {
            // Sắp xếp kết quả theo timestamp tăng dần
            results.sort((a, b) => {
                return new Date(a.date) - new Date(b.date);
            });

            res.json(results);
        }
    });
});







//Lấy giá trị PM và độ dẫn điện
app.get('/api/PM-values', (req, res) => {
    const { year, month } = req.query;

    const sql = `
        SELECT
            station_id,
            DATE_FORMAT(timestamp, '%Y-%m-%d %H:%i:%s') AS date,
            MAX(CASE WHEN sensor_name = 'PM 10' THEN sensor_value END) AS pm10,
            MAX(CASE WHEN sensor_name = 'PM 2.5' THEN sensor_value END) AS pm25,
            MAX(CASE WHEN sensor_name = 'Độ Dẫn Điện' THEN sensor_value END) AS ec
        FROM
            datasensor
        WHERE
            station_id LIKE 'TRC-solar-air%'
            AND (sensor_name = 'PM 10'
                OR sensor_name = 'PM 2.5'
                OR sensor_name = 'Độ Dẫn Điện')
            AND YEAR(timestamp) = ?
            AND MONTH(timestamp) = ?
        GROUP BY station_id, DATE_FORMAT(timestamp, '%Y-%m-%d %H:%i:%s')
        ORDER BY date;
    `;

    db.query(sql, [year, month], (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
        } else {
            res.json(results);
        }
    });
});

//Lấy giá trị Mực nước
app.get('/api/ec-values', (req, res) => {
    const { year, month } = req.query;

    const sql = `
        SELECT
            station_id,
            DATE_FORMAT(timestamp, '%Y-%m-%d %H:%i:%s') AS date,
            MAX(CASE WHEN sensor_name = 'Độ Dẫn Điện' THEN sensor_value END) AS ec
        FROM
            datasensor
        WHERE
            station_id LIKE 'TRC-water-sensor%'
            AND (sensor_name = 'Độ Dẫn Điện')
            AND YEAR(timestamp) = ?
            AND MONTH(timestamp) = ?
        GROUP BY station_id, DATE_FORMAT(timestamp, '%Y-%m-%d %H:%i:%s')
    `;

    db.query(sql, [year, month], (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
        } else {
            // Sắp xếp kết quả theo timestamp tăng dần
            results.sort((a, b) => {
                return new Date(a.date) - new Date(b.date);
            });

            res.json(results);
        }
    });
});

//Lấy giá trị nhiệt độ và Oxy
app.get('/api/oxy-values', (req, res) => {
    const { year, month } = req.query;

    const sql = `
        SELECT
            station_id,
            DATE_FORMAT(timestamp, '%Y-%m-%d %H:%i:%s') AS date,
            MAX(CASE WHEN sensor_name = 'Nhiệt Độ' THEN sensor_value END) AS temperature,
            MAX(CASE WHEN sensor_name = 'Oxy' THEN sensor_value END) AS do
        FROM
            datasensor
        WHERE
            station_id LIKE 'TRC-water-sensor%'
            AND (sensor_name = 'Nhiệt Độ'
            OR sensor_name = 'Oxy')
            AND YEAR(timestamp) = ?
            AND MONTH(timestamp) = ?
        GROUP BY station_id, DATE_FORMAT(timestamp, '%Y-%m-%d %H:%i:%s')
    `;

    db.query(sql, [year, month], (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
        } else {
            // Sắp xếp kết quả theo timestamp tăng dần
            results.sort((a, b) => {
                return new Date(a.date) - new Date(b.date);
            });

            res.json(results);
        }
    });
});

//Lấy giá trị Mực nước,TDS,Độ dẫn điện,độ đục
app.get('/api/waterlever-values', (req, res) => {
    const { year, month } = req.query;

    const sql = `
        SELECT
            station_id,
            DATE_FORMAT(timestamp, '%Y-%m-%d %H:%i:%s') AS date,
            MAX(CASE WHEN sensor_name = 'Mực Nước' THEN sensor_value END) AS cm,
            MAX(CASE WHEN sensor_name = 'TDS' THEN sensor_value END) AS tds,
             MAX(CASE WHEN sensor_name = 'pH' THEN sensor_value END) AS pH,
            MAX(CASE WHEN sensor_name = 'Độ Đục' THEN sensor_value END) AS NTU
        FROM
            datasensor
        WHERE
            station_id LIKE 'TRC-water-sensor%'
            AND (sensor_name = 'Mực Nước'
            OR sensor_name = 'TDS'
             OR sensor_name = 'pH'
             OR sensor_name = 'Độ Đục')
            AND YEAR(timestamp) = ?
            AND MONTH(timestamp) = ?
        GROUP BY station_id, DATE_FORMAT(timestamp, '%Y-%m-%d %H:%i:%s')
    `;

    db.query(sql, [year, month], (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
        } else {
            // Sắp xếp kết quả theo timestamp tăng dần
            results.sort((a, b) => {
                return new Date(a.date) - new Date(b.date);
            });

            res.json(results);
        }
    });
});
//Lấy nhiệt độ độ ẩm đất và BT truyền tên trạm vô
//http://localhost:1104/api/temperatureName?year=2023&month=10&station_id=TRC-solar-air-001
app.get('/api/temperatureName', (req, res) => {
    const stationId = req.query.station_id || 'TRC-solar-air-001';
    const year = req.query.year;
    const month = req.query.month;

    const sql = `
        SELECT
            station_id,
            DATE_FORMAT(timestamp, '%Y-%m-%d %H:%i:%s') AS date,
            MAX(CASE WHEN sensor_name = 'Nhiệt Độ Đất' THEN sensor_value END) AS soiltemperature,
            MAX(CASE WHEN sensor_name = 'Nhiệt Độ' THEN sensor_value END) AS temperature,
            MAX(CASE WHEN sensor_name = 'Độ Ẩm' THEN sensor_value END) AS airhumidity,
            MAX(CASE WHEN sensor_name = 'Độ Ẩm Đất' THEN sensor_value END) AS soilhumidity
        FROM datasensor
        WHERE station_id = "${stationId}"
            AND (sensor_name = 'Nhiệt Độ'
                OR sensor_name = 'Độ Ẩm'
                OR sensor_name = 'Nhiệt Độ Đất'
                OR sensor_name = 'Độ Ẩm Đất')
            AND YEAR(timestamp) = ${year}
            AND MONTH(timestamp) = ${month}
        GROUP BY station_id, DATE_FORMAT(timestamp, '%Y-%m-%d %H:%i:%s')
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
        } else {
            const responseData = results.map((result) => ({
                station_id: result.station_id,
                date: result.date,
                soiltemperature: result.soiltemperature,
                temperature: result.temperature,
                airhumidity: result.airhumidity,
                soilhumidity: result.soilhumidity,
            }));
            res.json(responseData);
        }
    });
});

//Lấy nhiệt độ độ ẩm đất và BT truyền tên trạm vô
//http://localhost:1104/api/CO2Name?year=2023&month=10&station_id=TRC-solar-air-001
app.get('/api/CO2Name', (req, res) => {
    const stationId = req.query.station_id || 'TRC-solar-air-001';
    const year = req.query.year;
    const month = req.query.month;

    const sql = `
        SELECT
            station_id,
            DATE_FORMAT(timestamp, '%Y-%m-%d %H:%i:%s') AS date,
            MAX(CASE WHEN sensor_name = 'CO2' THEN sensor_value END) AS sensor_value
        FROM datasensor
        WHERE station_id = "${stationId}"
            AND (sensor_name = 'CO2')
            AND YEAR(timestamp) = ${year}
            AND MONTH(timestamp) = ${month}
        GROUP BY station_id, DATE_FORMAT(timestamp, '%Y-%m-%d %H:%i:%s')
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
        } else {
            const responseData = results.map((result) => ({
                station_id: result.station_id,
                sensor_value: result.sensor_value,
            }));
            res.json(responseData);
        }
    });
});

//Lấy nhiệt độ độ ẩm đất và BT truyền tên trạm vô
//http://localhost:1104/api/PMName?year=2023&month=10&station_id=TRC-solar-air-001
app.get('/api/PMName', (req, res) => {
    const stationId = req.query.station_id || 'TRC-solar-air-001';
    const year = req.query.year;
    const month = req.query.month;

    const sql = `
        SELECT
            station_id,
            DATE_FORMAT(timestamp, '%Y-%m-%d %H:%i:%s') AS date,
            MAX(CASE WHEN sensor_name = 'PM 10' THEN sensor_value END) AS pm10,
            MAX(CASE WHEN sensor_name = 'PM 2.5' THEN sensor_value END) AS pm25,
            MAX(CASE WHEN sensor_name = 'Độ Dẫn Điện' THEN sensor_value END) AS ec
        FROM datasensor
        WHERE station_id = "${stationId}"
            AND (sensor_name = 'PM 10'
                OR sensor_name = 'PM 2.5'
                OR sensor_name = 'Độ Dẫn Điện')
            AND YEAR(timestamp) = ${year}
            AND MONTH(timestamp) = ${month}
        GROUP BY station_id, DATE_FORMAT(timestamp, '%Y-%m-%d %H:%i:%s')
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
        } else {
            const responseData = results.map((result) => ({
                station_id: result.station_id,
                date: result.date,
                pm10: result.pm10,
                pm25: result.pm25,
                ec: result.ec,
            }));
            res.json(responseData);
        }
    });
});

//Lấy nhiệt CO2 và BT truyền tên trạm vô
//http://localhost:1104/api/ECName?year=2023&month=10&station_id=TRC-water-sensor-001
app.get('/api/ECName', (req, res) => {
    const stationId = req.query.station_id || 'TRC-water-sensor-001';
    const year = req.query.year;
    const month = req.query.month;

    const sql = `
        SELECT
            station_id,
            DATE_FORMAT(timestamp, '%Y-%m-%d %H:%i:%s') AS date,
            MAX(CASE WHEN sensor_name = 'Độ Dẫn Điện' THEN sensor_value END) AS ec
        FROM datasensor
        WHERE station_id = "${stationId}"
            AND (sensor_name = 'Độ Dẫn Điện')
            AND YEAR(timestamp) = ${year}
            AND MONTH(timestamp) = ${month}
        GROUP BY station_id, DATE_FORMAT(timestamp, '%Y-%m-%d %H:%i:%s')
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
        } else {
            const responseData = results.map((result) => ({
                station_id: result.station_id,
                ec: result.ec,
            }));
            res.json(responseData);
        }
    });
});

//Lấy mực nước TDS pH Độ Đục
//http://localhost:1104/api/waterleverName?year=2023&month=10&station_id=TRC-solar-air-001
app.get('/api/waterleverName', (req, res) => {
    const stationId = req.query.station_id || 'TRC-water-sensor-001';
    const year = req.query.year;
    const month = req.query.month;

    const sql = `
        SELECT
            station_id,
            DATE_FORMAT(timestamp, '%Y-%m-%d %H:%i:%s') AS date,
            MAX(CASE WHEN sensor_name = 'Mực Nước' THEN sensor_value END) AS cm,
            MAX(CASE WHEN sensor_name = 'TDS' THEN sensor_value END) AS tds,
            MAX(CASE WHEN sensor_name = 'pH' THEN sensor_value END) AS pH,
            MAX(CASE WHEN sensor_name = 'Độ Đục' THEN sensor_value END) AS NTU
        FROM datasensor
        WHERE station_id = "${stationId}"
            AND (sensor_name = 'Mực Nước'
                OR sensor_name = 'TDS'
                OR sensor_name = 'pH'
                OR sensor_name = 'Độ Đục')
            AND YEAR(timestamp) = ${year}
            AND MONTH(timestamp) = ${month}
        GROUP BY station_id, DATE_FORMAT(timestamp, '%Y-%m-%d %H:%i:%s')
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
        } else {
            const responseData = results.map((result) => ({
                station_id: result.station_id,
                date: result.date,
                cm: result.cm,
                tds: result.tds,
                pH: result.pH,
                NTU: result.NTU,
            }));
            res.json(responseData);
        }
    });
});

//Lấy nhiệt nhiệt độ và oXY
//http://localhost:1104/api/temperatureName?year=2023&month=10&station_id=TRC-water-sensor-003
app.get('/api/OxyName', (req, res) => {
    const stationId = req.query.station_id || 'TRC-water-sensor-001';
    const year = req.query.year;
    const month = req.query.month;

    const sql = `
        SELECT
            station_id,
            DATE_FORMAT(timestamp, '%Y-%m-%d %H:%i:%s') AS date,
            MAX(CASE WHEN sensor_name = 'Nhiệt Độ' THEN sensor_value END) AS temperature,
            MAX(CASE WHEN sensor_name = 'Oxy' THEN sensor_value END) AS do
        FROM datasensor
        WHERE station_id = "${stationId}"
            AND (sensor_name = 'Nhiệt Độ'
                OR sensor_name = 'Oxy')
            AND YEAR(timestamp) = ${year}
            AND MONTH(timestamp) = ${month}
        GROUP BY station_id, DATE_FORMAT(timestamp, '%Y-%m-%d %H:%i:%s')
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
        } else {
            const responseData = results.map((result) => ({
                station_id: result.station_id,
                date: result.date,
                temperature: result.temperature,
                do: result.do,
            }));
            res.json(responseData);
        }
    });
});


















