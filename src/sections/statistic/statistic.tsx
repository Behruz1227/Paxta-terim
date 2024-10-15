import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress,
  TextField,
} from '@mui/material';
import { DashboardContent } from 'src/layouts/dashboard';
import useGet from 'src/hooks/get';
import { report_time, statistic } from 'src/hooks/api/url';
import { Button } from 'antd';

const Statistic: React.FC = () => {
  const { data, error, get: getDistricts, isLoading } = useGet();

  // State for date and time
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const { get: reports, data: reportsTime, isLoading: reportsLoading } = useGet();

  useEffect(() => {
    const [hour, minute] = time.split(':');
    getDistricts(`${statistic}?date=${date}&hour=${hour}&minute=${minute}`);
  }, [date, time]);

  useEffect(() => {
    reports(`${report_time}`);
  }, []);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);
  };

  const getMachineData = (resReportCarList: any[], type: string) => {
    const machine = resReportCarList.find((machine: any) => machine.rusumi === type);
    return machine ? [machine.ishlayotgani, machine.terilganPaxtaBirKunda] : [0, 0];
  };

  return (
    <DashboardContent>
      <TableContainer component={Paper} className="p-3" sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Typography
          variant="h6"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
            color: '#2c3e50',
            marginBottom: 3,
          }}
        >
          Қашқадарё вилоятида мавсумда қатнашадиган пахта териш машиналарининг ишлаши тўғрисида МAЛУМОТ
        </Typography>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', gap: '20px' }}>
          <TextField
            label="Sana"
            type="date"
            value={date}
            onChange={handleDateChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <div>
            <select
              onChange={(e) => {
                const selectedTime = e.target.value;
                const [hour, minute] = selectedTime.split(":");
                setTime(selectedTime);
                console.log(`Tanlangan vaqt: ${hour}:${minute}`);
              }}
              style={{ padding: "8px", margin: "4px" }}
            >
              {reportsTime?.map((time: string, index: number) => {
                const [hour, minute] = time.split(":");
                return (
                  <option key={index} value={time}>
                    {hour}:{minute !== "0" ? minute : ""}
                  </option>
                );
              })}
            </select>
          </div>


        </div>

        <Table
          aria-label="cotton harvesting table"
          sx={{
            borderCollapse: 'collapse',
            borderRadius: '8px',
            overflow: 'hidden',
            '& th, & td': {
              padding: '8px 16px',
              borderBottom: '1px solid #ddd',
            },
          }}
        >
          <TableHead>
            <TableRow>

              <TableCell align="center" className='font-bold'  sx={{ border: 1, boxShadow: 2, backgroundColor: 'white' }}>
              </TableCell>
              <TableCell align="center" colSpan={19} sx={{ border: 1, boxShadow: 2, fontWeight: 'bold', fontSize: 18, backgroundColor: 'white' }}>
                Пахта териш машиналари
              </TableCell>

            </TableRow>
            <TableRow sx={{ backgroundColor: '#f8f9fa', }}>
              <TableCell align="center" rowSpan={2} sx={{ border: 1, boxShadow: 2, fontWeight: 'bold', fontSize: 15 }}>
                Туманлар
              </TableCell>
              <TableCell align="center" colSpan={3} sx={{ border: 1, boxShadow: 2, fontWeight: 'bold', fontSize: 15 }}>
                Мавжуд сони
              </TableCell>
              <TableCell align="center" colSpan={2} sx={{ border: 1, boxShadow: 2, fontWeight: 'bold', fontSize: 15 }}>
                CE-220
              </TableCell>
              <TableCell align="center" colSpan={2} sx={{ border: 1, boxShadow: 2, fontWeight: 'bold', fontSize: 15 }}>
                John Deere
              </TableCell>
              <TableCell align="center" colSpan={2} sx={{ border: 1, boxShadow: 2, fontWeight: 'bold', fontSize: 15 }}>
                BOSHIRAN
              </TableCell>
              <TableCell align="center" colSpan={2} sx={{ border: 1, boxShadow: 2, fontWeight: 'bold', fontSize: 15 }}>
                ФМ WОРЛД
              </TableCell>
              <TableCell align="center" colSpan={2} sx={{ border: 1, boxShadow: 2, fontWeight: 'bold', fontSize: 15 }}>
                Донг Фенг
              </TableCell>
              <TableCell align="center" colSpan={1} sx={{ border: 1, boxShadow: 2, fontWeight: 'bold', fontSize: 15 }}>

              </TableCell>
              <TableCell align="center" colSpan={5} sx={{ border: 1, boxShadow: 2, fontWeight: 'bold', fontSize: 15 }}>
                Ишламаслик сабаблари
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>Жами сони</TableCell>
              <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>Ишлаётгани</TableCell>
              <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>Терилган пахта йил бошидан ,тн</TableCell>
              <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>Сони</TableCell>
              <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>Бир кунда, тн</TableCell>
              <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>Сони</TableCell>
              <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>Бир кунда, тн</TableCell>
              <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>Сони</TableCell>
              <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>Бир кунда, тн</TableCell>
              <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>Сони</TableCell>
              <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>Бир кунда, тн</TableCell>
              <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>Сони</TableCell>
              <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>Бир кунда, тн</TableCell>
              <TableCell align="center" sx={{ border: 1, boxShadow: 1,fontWeight:'bold',fontSize:16 }}>Ишламаёт
                гани</TableCell>
              <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>Ёқилғи йетказиб берилмаган</TableCell>
              <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>Ростлаш ишлари олиб борилмоқда</TableCell>
              <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>Оператор     
                (механизатор)  йўқ</TableCell>
              <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>Тамирда</TableCell>
              <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>Ташкилий сабаб</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={14} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : data?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={14} align="center">
                  Маълумот мавжуд эмас
                </TableCell>
              </TableRow>
            ) : (
              data?.map((row: any, index: any) => {
                const ce220Data = getMachineData(row.resReportCarList, 'CE_220');
                const johnDeereData = getMachineData(row.resReportCarList, 'JOHN_DEERE');
                const boshiranData = getMachineData(row.resReportCarList, 'BOSHIRAN');
                const fmWorldData = getMachineData(row.resReportCarList, 'FM_WORLD');
                const dongFengData = getMachineData(row.resReportCarList, 'DONG_FENG');
                return (
                  <TableRow
                    key={index}
                    sx={{
                      '&:nth-of-type(even)': {
                        backgroundColor: '#f2f2f2',
                      },
                      '&:hover': {
                        backgroundColor: '#e0f7fa',
                      },
                    }}
                  >
                    <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>
                      {row.districtName}
                    </TableCell>
                    <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>
                      {row.cambaySoni}
                    </TableCell>
                    <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>
                      {row.ishlayotgani}
                    </TableCell>
                    <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>
                      {row.terilganPaxtaMavsumBoshidan}
                    </TableCell>
                    <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>
                      {ce220Data[0]}
                    </TableCell>
                    <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>
                      {ce220Data[1]}
                    </TableCell>
                    <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>
                      {johnDeereData[0]}
                    </TableCell>
                    <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>
                      {johnDeereData[1]}
                    </TableCell>
                    <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>
                      {boshiranData[0]}
                    </TableCell>
                    <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>
                      {boshiranData[1]}
                    </TableCell>
                    <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>
                      {fmWorldData[0]}
                    </TableCell>
                    <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>
                      {fmWorldData[1]}
                    </TableCell>
                    <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>
                      {dongFengData[0]}
                    </TableCell>
                    <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>
                      {dongFengData[1]}
                    </TableCell>
                    <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>
                      {dongFengData[1]}
                    </TableCell>
                    <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>
                      {dongFengData[1]}
                    </TableCell>
                    <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>
                      {dongFengData[1]}
                    </TableCell>
                    <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>
                      {dongFengData[1]}
                    </TableCell>
                    <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>
                      {dongFengData[1]}
                    </TableCell>
                    <TableCell align="center" sx={{ border: 1, boxShadow: 1 }}>
                      {dongFengData[1]}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </DashboardContent>
  );
};

export default Statistic;
