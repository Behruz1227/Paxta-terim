import { Box, Button, IconButton, Skeleton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { Pagination } from 'antd';
import React, { useEffect, useState } from 'react';
import { Iconify } from 'src/components/iconify';
import { Inputs } from 'src/components/input/input';
import { Modals } from 'src/components/modal/modal';
import { farms_get, farms_global, report_get, reportAdmin } from 'src/hooks/api/url';
import useDelete from 'src/hooks/delete';
import useGet from 'src/hooks/get';
import usePut from 'src/hooks/put';

const ReportHokims: React.FC = () => {
  const { get: getFarms, data: farmsData, isLoading: farmsLoading } = useGet();
  const { remove: deleteFarms, data: delFarmsData, isLoading: delFarmsLoading } = useDelete();
  const { data: editFarmsData, isLoading: editFarmsLoading, put: editFarm } = usePut();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isOpenDelModal, setIsOpenDelModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [farmId, setFarmId] = useState('');
  const [farmName, setFarmName] = useState('');
  const [farmInn, setFarmInn] = useState('');
  const [cottonPickedId, setCottonPickedId] = useState('');

  useEffect(() => {
    getFarms(`${reportAdmin}?page=${currentPage - 1}&size=${pageSize}`);
  }, [currentPage, pageSize]);

  const farms = farmsData?.object || [];

  const handlePaginationChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const handleFarmDelete = () => {
    deleteFarms(farms_global, farmId);
  };

  console.log(farmsData);


  const toggleDelModal = () => setIsOpenDelModal(!isOpenDelModal);
  const toggleEditModal = () => setIsOpenEditModal(!isOpenEditModal);


  useEffect(() => {
    if (!isOpenEditModal || !isOpenEditModal) {
      setFarmInn('');
      setCottonPickedId('');
      setFarmName('');
    }
  }, [isOpenEditModal, isOpenEditModal]);

  return (
    <div className='p-5'>
      <Box sx={{ maxHeight: '400px', overflowY: 'auto' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="center">Т/р</TableCell>
              <TableCell align="center">ПТМ модел</TableCell>
              <TableCell align="center">Туман</TableCell>
              <TableCell align="center">Сектор</TableCell>
              <TableCell align="center">Ҳудуд</TableCell>
              <TableCell align="center">Фермер хўжалик</TableCell>
              <TableCell align="center">Майдони</TableCell>
              <TableCell align="center">Пахта ҳажми</TableCell>
              <TableCell align="center">ПТМ ҳолати</TableCell>
              <TableCell align="center">ПТМ ишламаган санаси</TableCell>
              <TableCell align="center">Ишламаган вақти</TableCell>
              <TableCell align="center">Ишламаслик сабаби</TableCell>
              <TableCell align="center">Ф.И.О</TableCell>
              <TableCell align="center">Сана</TableCell>
              <TableCell align="center">Вақт</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {farmsLoading ? (
              [...Array(10)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell align="center">
                    <Skeleton variant="text" width={40} />
                  </TableCell>
                  <TableCell align="center">
                    <Skeleton variant="text" width={150} />
                  </TableCell>
                  <TableCell align="center">
                    <Skeleton variant="text" width={150} />
                  </TableCell>
                  <TableCell align="center">
                    <Skeleton variant="text" width={100} />
                  </TableCell>
                  <TableCell align="center">
                    <Skeleton variant="text" width={100} />
                  </TableCell>
                </TableRow>
              ))
            ) : farms.length > 0 ? (
              farms.map((item: any, index: number) => (
                <TableRow key={index} style={{ cursor: 'pointer' }}>
                  <TableCell align="center">{(currentPage - 1) * pageSize + index + 1}</TableCell>
                  <TableCell align="center">
                    <Typography fontWeight="bold">{item.model}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontWeight="bold">{item.districtName}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontWeight="bold">{item.sectorNumber}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontWeight="bold">{item.areaName}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontWeight="bold">{item.farmName}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontWeight="bold">{item.dialField}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontWeight="bold">{item.cottonSize}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      fontWeight="bold"
                      style={{ background: item.machineActive ? '' : '', color: item.machineActive ? "black" : "black", padding: 5, borderRadius: 10 }}
                    >
                      {item.machineActive ? 'Faol  ' : 'Faol emas'}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontWeight="bold">{item.downDate}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontWeight="bold">{item.downTime}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontWeight="bold">{item.machineStatus}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontWeight="bold">{item.fullName}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontWeight="bold">{item.date}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontWeight="bold">{item.time}</Typography>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">No farms found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
      {
        farmsData && (
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={farmsData.totalElements}
            onChange={handlePaginationChange}
            showSizeChanger={false}
          />
        )
      }
    </div >
  );
};

export default ReportHokims;
