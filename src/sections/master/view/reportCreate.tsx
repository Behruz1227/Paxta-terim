import {
    Box,
    Button,
    IconButton,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
} from '@mui/material';

import React, { useEffect, useState } from 'react';
import { Iconify } from 'src/components/iconify';
import { Inputs } from 'src/components/input/input';
import { cottom_get, farmList, getDistirct, report_time, reposrtAdd } from 'src/hooks/api/url';
import useGet from 'src/hooks/get';
import axios from 'axios';

const ReportView: React.FC = () => {
    const { get: getFarms, data: farmsData, isLoading: farmsLoading } = useGet();
    const { get: cottom, data: cottomData, isLoading: cottomLoading } = useGet();
    const { get: farmsLar, data: farmData, isLoading: farmLoading } = useGet();
    const { get: reports, data: reportsTime, isLoading: reportsLoading } = useGet();

    const [farmId, setFarmId] = useState(''); // Store selected farmId
    const [selectedHudud, setSelectedHudud] = useState('');
    const [selectedHududId, setSelectedHududId] = useState('');
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [isModalDelete, setIsModalDelete] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<string | null>(null);

    const [firstname, setFirstName] = useState('');  // Paxta maydoni
    const [lastName, setLastName] = useState('');    // Paxta hajmi
    const [phoneNumber, setPhoneNumber] = useState(''); // PTM ishlashi (true/false)
    const [password, setPassword] = useState('');    // PTM ni ishsiz holati
    const [lavozimi, setLavozimi] = useState('');    // PTM holati / Sana / Vaqt

    useEffect(() => {
        getFarms(`${getDistirct}`);
    }, []);
    useEffect(() => {
        reports(`${report_time}`);
    }, []);
    console.log(reportsTime);


    useEffect(() => {
        if (farmId) {
            cottom(`${cottom_get}/${farmId}`);
        }
    }, [farmId]);

    useEffect(() => {
        if (selectedHududId) {
            farmsLar(`${farmList}/${selectedHududId}`);
        }
    }, [selectedHududId]);

    const handleHududChange = (e: any) => {
        const selectedHududId = e.target.value;
        const selectedHudud = cottomData?.find(
            (hudud: any) => hudud.cottonPickedId === selectedHududId
        );
        if (selectedHudud) {
            setSelectedHudud(selectedHudud.areaName);
            setSelectedHududId(selectedHududId);
        }
    };

    const handleRowClick = (id: string, farmId: string) => {
        setSelectedIds((prev) => {
            if (prev.includes(id)) {
                return prev.filter((itemId) => itemId !== id);
            } else {
                return [...prev, id];
            }
        });
        setFarmId(farmId);
    };

    const openModal = (id: string) => {
        setItemToDelete(id);
        setIsModalDelete(true);
    };

    const machineStatusOptions = [
        'DALA_TAYYOR_EMASLIGI_UCHUN',
        'TASHKILOTCHILIK_YUQLIGI_UCHUN',
        'SERVIS_XIZMATI_UCHUN',
        'NOSOZLIGI_UCHUN',
        'YOQILGI_YOQLIGI_UCHUN',
    ];

    const closeModal = () => {
        setIsModalDelete(false);
        setItemToDelete(null);
    };

    const del = () => {
        console.log(`Deleting item with id: ${itemToDelete}`);
        closeModal();
    };

    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setter(e.target.value);
    };

    const handleFormSubmit = () => {
        const reportData = {
            farmId: farmId,
            dialField: firstname ? parseInt(firstname) : 0,
            cottonSize: lastName ? parseInt(lastName) : 0,
            machineActive: phoneNumber === 'true',
            downTime: password ? parseInt(password) : 0,
            machineStatus: lavozimi,
            date: new Date().toISOString().split('T')[0],
            hour: parseInt(lavozimi.split(':')[0]),
            minute: parseInt(lavozimi.split(':')[1]),
        };
        axios.post(`${reposrtAdd}`, reportData)
            .then(response => {
                console.log('Report submitted successfully', response.data);
            })
            .catch(error => {
                console.error('Error submitting report', error);
            });

        console.log('Form submitted:', reportData);
    };

    return (
        <div className="p-5">
            <FormControl fullWidth>
                <InputLabel id="farm-select-label">Tuman tanlang</InputLabel>
                <Select
                    labelId="farm-select-label"
                    id="farm-select"
                    value={farmId}
                    label="Tuman tanlang"
                    onChange={(e) => setFarmId(e.target.value as string)}
                >
                    {farmsData?.map((farm: any) => (
                        <MenuItem key={farm.id} value={farm.id}>
                            {farm.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <div className="p-6"></div>
            <FormControl fullWidth disabled={!farmId}>
                <InputLabel id="hudud-select-label">Hudud tanlang</InputLabel>
                <Select
                    labelId="hudud-select-label"
                    id="hudud-select"
                    label="Hudud tanlang"
                    value={selectedHududId}
                    onChange={handleHududChange}
                >
                    {cottomData?.map((hudud: any) => (
                        <MenuItem key={hudud.cottonPickedId} value={hudud.cottonPickedId}>
                            Hudud nomi: {hudud.areaName}, sektor: {hudud.sectorNumber}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <div className='p-6'></div>
            <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">T/r</TableCell>
                            <TableCell align="center">F.M xo'jalik nomi</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {farmData?.length > 0 ? (
                            farmData.map((item: any, index: number) => (
                                <TableRow
                                    key={index}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleRowClick(item.cottonPickedId, item.farmId)} // Pass farmId
                                    selected={selectedIds.includes(item.cottonPickedId)}
                                >
                                    <TableCell align="center">
                                        <Typography fontWeight="bold">{index + 1}</Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography fontWeight="bold">{item.farmName}</Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton onClick={() => openModal(item.cottonPickedId)}>
                                            <Iconify icon="solar:pen-bold" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} align="center">
                                    No farms found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Box>

            {/* Modal */}
            <div className='p-4'>
                <Dialog open={isModalDelete} onClose={closeModal} maxWidth="sm" fullWidth>
                    <DialogTitle>Hisobot qo'shish</DialogTitle>
                    <DialogContent>
                        <Inputs
                            label="Paxta maydoni"
                            value={firstname}
                            onChange={handleInputChange(setFirstName)}
                            type="number"
                        />
                        <div className='p-4'></div>
                        <Inputs
                            label="Paxta hajmi"
                            value={lastName}
                            onChange={handleInputChange(setLastName)}
                            type="number"
                        />
                        <div className='p-4'></div>
                        <FormControl fullWidth disabled={!farmId}>
                            <InputLabel id="machine-status-label">Mashina holati</InputLabel>
                            <Select
                                labelId="machine-status-label"
                                id="machine-status-select"
                                value={lavozimi}
                                onChange={(e) => setLavozimi(e.target.value)}
                            >
                                {machineStatusOptions.map((option, index) => (
                                    <MenuItem key={index} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <div className='p-4'></div>
                        <FormControl fullWidth disabled={!farmId}>
                            <InputLabel id="machine-status-label">Mashina holati</InputLabel>
                            <Select
                                labelId="machine-status-label"
                                id="machine-status-select"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            >
                                {reportsTime.map((time:any, index:number) => (
                                    <MenuItem key={index} value={time}>
                                        {time}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* <Inputs
                            label="PTM ishlashi"
                            value={phoneNumber}
                            onChange={handleInputChange(setPhoneNumber)}
                            type="text" 
                        /> */}
                        <div className='p-4'></div>
                        <Inputs
                            label="PTM ni ishsiz holati"
                            value={password}
                            onChange={handleInputChange(setPassword)}
                            type="number"
                        />
                        <div className='p-4'></div>
                        {/* <Inputs
                            label="PTM holati"
                            value={lavozimi}
                            onChange={handleInputChange(setLavozimi)}
                            type="text"
                        /> */}
                        <div className='p-4'></div>
                        <Inputs
                            label="Sana"
                            value={lavozimi}
                            onChange={handleInputChange(setLavozimi)}
                            type="date"
                        />
                        <div className='p-4'></div>
                        <Inputs
                            label="Vaqt"
                            value={lavozimi}
                            onChange={handleInputChange(setLavozimi)}
                            type="time"
                        />
                    </DialogContent>

                    <DialogActions>
                        <Button variant="outlined" color="error" onClick={closeModal}>Cancel</Button>
                        <Button variant="contained" color="success" onClick={handleFormSubmit}>Submit</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
};

export default ReportView;
