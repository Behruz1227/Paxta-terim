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
    CircularProgress,
} from '@mui/material';

import React, { useEffect, useState } from 'react';
import { Iconify } from 'src/components/iconify';
import { Inputs } from 'src/components/input/input';
import { cottom_get, farmList, getDistirct, report_time, reposrtAdd } from 'src/hooks/api/url';
import useGet from 'src/hooks/get';
import axios from 'axios';
import toast from 'react-hot-toast';

const ReportView: React.FC = () => {
    const { get: getFarms, data: farmsData, isLoading: farmsLoading } = useGet();
    const { get: cottom, data: cottomData, isLoading: cottomLoading } = useGet();
    const { get: farmsLar, data: farmData, isLoading: farmLoading } = useGet();
    const { get: reports, data: reportsTime, isLoading: reportsLoading } = useGet();

    const [farmId, setFarmId] = useState('');
    const [selectedHudud, setSelectedHudud] = useState('');
    const [selectedHududId, setSelectedHududId] = useState('');
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [isModalDelete, setIsModalDelete] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<string | null>(null);
    const [ptmMaydoni, setPtmMaydoni] = useState('');
    const [lastName, setLastName] = useState('');
    const [ptmDate, setPtmDate] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [lavozimi, setLavozimi] = useState(true);
    const [ptmHolati, setPtmHolati] = useState(null);
    const [hour, setHour] = useState('');
    const [paxtaHajmi, setPaxtaHajmi] = useState('');


    useEffect(() => {
        getFarms(`${getDistirct}`);
    }, []);
    useEffect(() => {
        reports(`${report_time}`);
    }, []);
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
    console.log(12333232, password);

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
        { value: 'ROSTLASH_ISHLARI_OLIB_BORILMOQDA', label: 'Rostlash ishlari olib borilmoqda' },
        { value: 'OPERATORI_YUQ', label: 'Operator yo‘q' },
        { value: 'TAMIRDA', label: 'Ta’mirda' },
        { value: 'TASHKILIY_SABAB', label: 'Tashkiliy sabab' },
        { value: 'YOQILGI_YETKAZIB_BERILMAGAN', label: 'Yoqilg‘i yetkazib berilmagan' }
    ];

    const del = () => {
        console.log(`Deleting item with id: ${itemToDelete}`);
        closeModal();
    };

    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setter(e.target.value);
    };
    const Clear = () => {
        farmId
    }

    const closeModal = () => {
        setFarmId('');
        setPtmMaydoni('');
        setPaxtaHajmi('');
        setLavozimi(false);
        setPassword('');
        setPtmHolati(null);
        setPtmDate('');
        setHour('');
        setIsModalDelete(false);
        setItemToDelete(null);
    };
    const handleFormSubmit = () => {
        const reportData = {
            farmId: farmId,
            dialField: ptmMaydoni ? parseInt(ptmMaydoni) : 0,
            cottonSize: paxtaHajmi ? parseInt(paxtaHajmi) : 0,
            machineActive: lavozimi,
            downHour: parseInt(password) ? parseInt(password) : 0,
            downMinute: parseInt(password) ? parseInt(password) : 0,
            machineStatus: ptmHolati,
            downDate: new Date(ptmDate).toISOString().split('T')[0],
            date: new Date().toISOString().split('T')[0],
            hour: parseInt(hour.split(':')[0]),
            minute: parseInt(hour.split(':')[0]),
        };

        console.log(ptmDate);

        console.log(1233131, password);
        console.log(reportData);

        axios.post(`${reposrtAdd}`, reportData)
            .then(response => {
                toast("Hisobot muvaffaqiyatli qo'shildi ✅")
                closeModal()
                console.log('Report submitted successfully', response.data);
            })
            .catch(error => {
                toast("Hisobot qo'shilmadi ❌")
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
                    {farmsLoading ? (
                        <MenuItem disabled>
                            <CircularProgress size={24} />
                            Ma'lumotlar yuklanmoqda...
                        </MenuItem>
                    ) :
                        farmsData?.map((farm: any) => (
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
                    {cottomLoading ? (
                        <MenuItem disabled>
                            <CircularProgress size={24} />
                            Ma'lumotlar yuklanmoqda...
                        </MenuItem>
                    ) : (
                        cottomData?.map((hudud: any) => (
                            <MenuItem key={hudud.cottonPickedId} value={hudud.cottonPickedId}>
                                Hudud nomi: {hudud.areaName}, sektor: {hudud.sectorNumber}
                            </MenuItem>
                        ))
                    )}
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
                        {farmLoading ? (
                            <TableRow>
                                <TableCell colSpan={14} align="center">
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>
                        ) : (
                            farmData?.map((item: any, index: number) => (
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
                        )
                        }
                    </TableBody>
                </Table>
            </Box>

            {/* Modal */}
            <div className='p-4'>
                <Dialog open={isModalDelete} onClose={closeModal} maxWidth="sm" fullWidth>
                    <DialogTitle>Hisobot qo'shish</DialogTitle>
                    <DialogContent>
                        Paxta maydoni (gektar)
                        <Inputs
                            label="Paxta maydoni"
                            value={ptmMaydoni}
                            onChange={handleInputChange(setPtmMaydoni)}
                            type="number"
                        />
                        <div className='p-4'></div>
                        Paxta hajmi (tonna)
                        <Inputs
                            label="Paxta hajmi"
                            value={paxtaHajmi}
                            onChange={handleInputChange(setPaxtaHajmi)}
                            type="number"
                        />
                        <div className='p-4'></div>
                        <div>Hisobot topshirish vaqti</div>
                        <div>
                            {reportsLoading ? (
                                <MenuItem disabled>
                                    <CircularProgress size={24} />
                                    Ma'lumotlar yuklanmoqda...
                                </MenuItem>
                            ) : (
                                reportsTime?.map((time: any, index: number) => (
                                    <Button
                                        key={index}
                                        variant={time === phoneNumber ? "contained" : "outlined"}
                                        onClick={() => {
                                            setHour(time);
                                            console.log("Selected time:", time);
                                        }}
                                        sx={{
                                            margin: "4px",
                                            backgroundColor: time === phoneNumber ? "#4CAF50 !important" : "#fff", // Force the background color to change
                                            color: time === phoneNumber ? "#fff" : "#000", // Text color change
                                            borderColor: time === phoneNumber ? "#4CAF50" : "#000", // Border color change
                                        }}
                                    >
                                        {time.split(":")[0]}:{time.split(":")[4] !== "00" ? time.split(":")[1] : ""}
                                    </Button>
                                ))
                            )
                            }
                        </div>
                        <div className='p-4'></div>
                        Hisobot topshirish sanasi
                        <Inputs
                            label=""
                            value={lastName}
                            onChange={handleInputChange(setLastName)}
                            type="date"
                        />
                        <div className='p-4 '>
                            Mashina holati
                            <FormControl fullWidth disabled={!farmId} className="">
                                <div className='flex justify-center '>
                                    <div className='px-8'>
                                        <Button
                                            variant={lavozimi ? "contained" : "outlined"}
                                            color="success"
                                            onClick={() => setLavozimi(true)}
                                        >
                                            Faol
                                        </Button>

                                    </div>
                                    <div className='px-8'>
                                        <Button
                                            variant={!lavozimi ? "contained" : "outlined"}
                                            color="error"
                                            onClick={() => setLavozimi(false)}
                                        >
                                            Faol emas
                                        </Button>
                                    </div>

                                </div>
                            </FormControl>
                        </div>
                        {lavozimi ? (
                            <div>

                            </div>
                        ) :
                            <>
                                <div className="p-4"></div>
                                Mashina ishlamaganlik sababi
                                <FormControl fullWidth disabled={!farmId}>
                                    <InputLabel id="machine-status-label">Mashina holati</InputLabel>
                                    <Select
                                        labelId="machine-status-label"
                                        id="machine-status-select"
                                        value={ptmHolati}
                                        onChange={(e) => setPtmHolati(e.target.value)}
                                    >
                                        {machineStatusOptions?.map((option, index) => (
                                            <MenuItem key={index} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <div className='p-4'></div>
                                PTM ni qancha vaqt ishlamaganligi (daqiqada)
                                <Inputs
                                    label="PTM ni ishsiz vaqti"
                                    value={password}
                                    onChange={handleInputChange(setPassword)}
                                    type="time"
                                />
                                <div className='p-4'></div>
                                PTM ni ishlamagan sanasi
                                <Inputs
                                    label=""
                                    value={ptmDate}
                                    onChange={handleInputChange(setPtmDate)}
                                    type="date"
                                />

                            </>
                        }
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
