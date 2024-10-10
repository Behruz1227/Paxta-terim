import { Box, Button, IconButton, Skeleton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { Pagination } from 'antd';
import React, { useEffect, useState } from 'react';
import { Iconify } from 'src/components/iconify';
import { Inputs } from 'src/components/input/input';
import { Modals } from 'src/components/modal/modal';
import { farms_get, farms_global } from 'src/hooks/api/url';
import useDelete from 'src/hooks/delete';
import useGet from 'src/hooks/get';

const FarmsView: React.FC = () => {
    const { get: getFarms, data: farmsData, isLoading: farmsLoading } = useGet();
    const { remove: deleteFarms, data: delFarmsData, isLoading: delFarmsLoading } = useDelete()
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isOpenDelModal, setIsOpenDelModal] = useState(false);
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const [farmId, setFarmId] = useState('')
    // const

    useEffect(() => {
        getFarms(`${farms_get}?page=${currentPage - 1}&size=${pageSize}`);
    }, [currentPage, pageSize]);

    const farms = farmsData?.object || [];

    const handlePaginationChange = (page: number, size: number) => {
        setCurrentPage(page);
        setPageSize(size);
    };

    const handleFarmDelete = () => {
        deleteFarms(farms_global, farmId);
    }

    const toggleDelModal = () => setIsOpenDelModal(!isOpenDelModal);
    const toggleEditModal = () => setIsOpenEditModal(!isOpenEditModal);

    useEffect(() => {
        if (delFarmsData) {
            getFarms(`${farms_get}?page=${currentPage - 1}&size=${pageSize}`);
            toggleDelModal();
            setFarmId('')
            setCurrentPage(1)
            setPageSize(10)
        }
    }, [delFarmsData])

    return (
        <div className='p-5'>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">T/r</TableCell>
                        <TableCell align="center">Ferma nomi</TableCell>
                        <TableCell align="center">Ferma area nomi</TableCell>
                        <TableCell align="center">Ferma innsi</TableCell>
                        <TableCell align="center">Ferma sector raqami</TableCell>
                        <TableCell align="center">Actions</TableCell>
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
                                <TableCell align="center">
                                    <Skeleton variant="rectangular" width={100} height={40} />
                                </TableCell>
                            </TableRow>
                        ))
                    ) : farms.length > 0 ? (
                        farms.map((item: any, index: number) => (
                            <TableRow
                                key={index}
                                style={{ cursor: 'pointer' }}
                            >
                                <TableCell align="center">{(currentPage - 1) * pageSize + index + 1}</TableCell>
                                <TableCell align="center" component="th" scope="row">
                                    <Typography fontWeight="bold">
                                        {item.farmName}
                                    </Typography>
                                </TableCell>
                                <TableCell align="center" component="th" scope="row">
                                    <Typography fontWeight="bold">
                                        {item.areaName}
                                    </Typography>
                                </TableCell>
                                <TableCell align="center" component="th" scope="row">
                                    <Typography fontWeight="bold">
                                        {item.inn}
                                    </Typography>
                                </TableCell>
                                <TableCell align="center" component="th" scope="row">
                                    <Typography fontWeight="bold">
                                        {item.sectorNumber}
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        onClick={() => {
                                            toggleEditModal()
                                            setFarmId(item.farmId)
                                        }}
                                    >
                                        <Iconify icon="solar:pen-bold" />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => {
                                            toggleDelModal()
                                            setFarmId(item.farmId)
                                        }}
                                        sx={{ color: 'error.main' }}
                                    >
                                        <Iconify icon="solar:trash-bin-trash-bold" />
                                    </IconButton>
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
            {farmsData && (
                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={farmsData.totalElements}
                    onChange={handlePaginationChange}
                    showSizeChanger={false}
                />
            )}
            <Modals title="Fermani o'chirish" open={isOpenDelModal} onClose={toggleDelModal}>
                <Box mt={2}>
                    <Button variant="contained" color="error" onClick={toggleDelModal}>
                        Bekor qilish
                    </Button>
                    <Button variant="contained" disabled={farmsLoading} onClick={handleFarmDelete} color="success" sx={{ ml: 2 }}>
                        {farmsLoading ? 'Yuklanmoqda...' : 'O\'chirish'}
                    </Button>
                </Box>
            </Modals>
            <Modals title="Fermani o'zgartarish" open={isOpenEditModal} onClose={toggleEditModal}>
                <Box mt={2}>
                    <div>
                        <Inputs
                            label="Ferma nomini kiriting"
                        />
                        <Inputs
                            label="Ferma innsini kiriting"
                        />
                    </div>
                    <Button variant="contained" color="error" onClick={toggleEditModal}>
                        Bekor qilish
                    </Button>
                    <Button variant="contained" disabled={farmsLoading} color="success" sx={{ ml: 2 }}>
                        {farmsLoading ? 'Yuklanmoqda...' : 'Saqlash'}
                    </Button>
                </Box>
            </Modals>
        </div>
    );
};

export default FarmsView;
