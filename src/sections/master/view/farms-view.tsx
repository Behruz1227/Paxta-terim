import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Pagination } from "antd";
import { log } from "console";
import React, { useEffect, useState } from "react";
import { Iconify } from "src/components/iconify";
import { Inputs } from "src/components/input/input";
import { Modals } from "src/components/modal/modal";
import { farms_get, farms_global, report_get, report_time, ReportEdit } from "src/hooks/api/url";
import useDelete from "src/hooks/delete";
import useGet from "src/hooks/get";
import usePut from "src/hooks/put";

const HisobotView: React.FC = () => {
  const { get: getFarms, data: farmsData, isLoading: farmsLoading } = useGet();
  const { get: reports, data: reportsTime, isLoading: reportsLoading } = useGet();
  const {
    remove: deleteFarms,
    data: delFarmsData,
    isLoading: delFarmsLoading,
  } = useDelete();
  const {
    data: editFarmsData,
    isLoading: editFarmsLoading,
    put: editFarm,
  } = usePut();

  useEffect(() => {
    reports(`${report_time}`);
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isOpenDelModal, setIsOpenDelModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [farmId, setFarmId] = useState("");
  const [farmName, setFarmName] = useState("");
  const [farmInn, setFarmInn] = useState("");
  const [cottonPickedId, setCottonPickedId] = useState("");
  const [ptmMaydoni, setPtmMaydoni] = useState("");
  const [getId, setGetId] = useState(0);
  //   const [ptmDate, setPtmDate] = useState("");
  //   const [phoneNumber, setPhoneNumber] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [lavozimi, setLavozimi] = useState(true);
  //   const [ptmHolati, setPtmHolati] = useState(null);
  //   const [hour, setHour] = useState("");
  //   const [paxtaHajmi, setPaxtaHajmi] = useState("");
  const [formData, setFormdata] = useState<{
    farmId: string | number;
    dialField: string | number;
    cottonSize: string | number;
    machineActive: string | number;
    downTime: string | number;
    machineStatus: string | number;
    date: Date | string | number;
    hour: string | number;
    minute: string | number;
    downMinute: number;
    downDate: Date | string | number;
    downHour: number;
  }>({
    farmId: 0,
    dialField: 0,
    cottonSize: 0,
    machineActive: "",
    downTime: 0,
    machineStatus: "",
    date: 2024 - 10 - 12,
    hour: 0,
    minute: 0,
    downMinute: 0,
    downDate: 0,
    downHour: 0,
  });
  //   const {data:d} = useDelete()
  const { data: dataPut, error: errorPut, isLoading: LoadPut, put } = usePut()
  useEffect(() => {
    getFarms(`${report_get}?page=${currentPage - 1}&size=${pageSize}`);
  }, [currentPage, pageSize]);

  const farms = farmsData?.object || [];

  const handlePaginationChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const machineStatusOptions = [
    { value: 'ROSTLASH_ISHLARI_OLIB_BORILMOQDA', label: 'Rostlash ishlari olib borilmoqda' },
    { value: 'OPERATORI_YUQ', label: 'Operator yo‘q' },
    { value: 'TAMIRDA', label: 'Ta’mirda' },
    { value: 'TASHKILIY_SABAB', label: 'Tashkiliy sabab' },
    { value: 'YOQILGI_YETKAZIB_BERILMAGAN', label: 'Yoqilg‘i yetkazib berilmagan' }
  ];


  const handleChange = (field: string, value: any) => {
    setFormdata((prevData: any) => ({ ...prevData, [field]: value }));
  };
  const toggleDelModal = () => setIsOpenDelModal(!isOpenDelModal);
  const toggleEditModal = () => setIsOpenEditModal(!isOpenEditModal);

  useEffect(() => {
    if (delFarmsData || editFarmsData) {
      getFarms(`${farms_get}?page=${currentPage - 1}&size=${pageSize}`);
      delFarmsData ? toggleDelModal() : toggleEditModal();
      setFarmId("");
      setCottonPickedId("");
      setCurrentPage(1);
      setPageSize(10);
    }
  }, [delFarmsData, editFarmsData]);

  useEffect(() => {
    if (!isOpenEditModal || !isOpenEditModal) {
      setFarmInn("");
      setCottonPickedId("");
      setFarmName("");
    }
  }, [isOpenEditModal, isOpenEditModal]);
  const handleFarmEdit = async () => {
    try {
      await put(ReportEdit, getId, formData);
      console.log(getId);

    } catch (error) {

      console.error('Error updating farm:', error);
    }
  };

  console.log(123456, formData.downTime);


  return (
    <div className="p-5">
      <Box sx={{ maxHeight: "800px", overflowY: "auto" }}>
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
              <TableCell align="center">Ишламаган вақти</TableCell>
              <TableCell align="center">Ишламаслик сабаби</TableCell>
              <TableCell align="center">Ф.И.О</TableCell>
              <TableCell align="center">Сана</TableCell>
              <TableCell align="center">Вақт</TableCell>
              <TableCell align="center">Таҳрирҳлаш</TableCell>
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
                <TableRow key={index} style={{ cursor: "pointer" }}>
                  <TableCell align="center">
                    {(currentPage - 1) * pageSize + index + 1}
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontWeight="bold">{item.model}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontWeight="bold">
                      {item.districtName}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontWeight="bold">
                      {item.sectorNumber}
                    </Typography>
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
                      style={{
                        background: item.machineActive ? "" : "",
                        color: item.machineActive ? "black" : "black",
                        padding: 5,
                        borderRadius: 10,
                      }}
                    >
                      {item.machineActive ? "Faol  " : "Faol emas"}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontWeight="bold">{item.downTime}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontWeight="bold">
                      {item.machineStatus}
                    </Typography>
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
                  <TableCell align="center">
                    <IconButton
                      onClick={() => {
                        toggleEditModal();
                        setGetId(item.id)
                        setFormdata({
                          farmId: item.id,
                          dialField: item.dialField,
                          cottonSize: item.cottonSize,
                          machineActive: item.machineActive,
                          downTime: item.downTime,
                          machineStatus: item.machineStatus,
                          date: new Date(item.date),
                          downDate: new Date(item.downDate || ''),
                          hour: item.time,
                          downHour: item.downHour || '',
                          minute: item.time,
                          downMinute: item.downMinute || '',
                        })
                      }}
                    >
                      <Iconify icon="solar:pen-bold" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No farms found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
      {farmsData && (
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={farmsData.totalElements}
          onChange={handlePaginationChange}
          showSizeChanger={false}
        />
      )}
      <Dialog
        title="Hisobotni tahrirlash"
        open={isOpenEditModal}
        onClose={toggleEditModal}
      >
        <DialogTitle>Hisobot tahrirlash</DialogTitle>

        <Box className="grid grid-cols-1 md:grid-cols-2 gap-5 p-10">
          <Inputs
            label="dialField ID"
            value={formData.dialField}
            onChange={(e) => handleChange("dialField", e.target.value)}
          />
          <Inputs
            label="cottonSize"
            value={formData.cottonSize}
            onChange={(e) => handleChange("cottonSize", e.target.value)}
          />
          <Inputs
            label="machineActive"
            value={formData.machineActive}
            onChange={(e) => handleChange("machineActive", e.target.value)}
          />
          <Inputs
            label="downTime"
            value={
              formData.downTime
                ? `${formData.downTime.split(":")[0]}:${formData.downTime.split(":")[1] !== "00" ? formData.downTime.split(":")[1] : ""}`
                : ""
            }
            onChange={(e) => {
              const time = e.target.value;
              const [hours, minutes] = time.split(":");
              handleChange("downTime", `${hours}:${minutes}`);
            }}
          />

          {formData?.machineActive ?
            <>

            </>
            :
            <>
              <InputLabel id="machine-status-label">Mashina holati</InputLabel>
              <Select
                labelId="machine-status-label"
                id="machine-status-select"
                value={formData.machineStatus}
                onChange={(e) => handleChange("machineStatus", e.target.value)}
              >
                {machineStatusOptions?.map((option, index) => (
                  <MenuItem key={index} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              <Inputs
                label="downDate"
                value={formData.downDate}
                onChange={(e) => {
                  const ptmDate = new Date(e.target.value).toISOString().split('T')[0]; // Sana formati
                  handleChange("downDate", ptmDate);
                }}
                type="date"
              />


              <Inputs
                label="downHour"
                value={formData.downHour}
                onChange={(e) => handleChange("downHour", e.target.value)}
              />
              <Inputs
                label="downMinute"
                value={formData.downMinute}
                onChange={(e) => handleChange("downMinute", e.target.value)}
              />

            </>}

          <Inputs
            label="date"
            value={formData.date}
            onChange={(e) => handleChange("date", e.target.value)}
          />
          <Inputs
            label="hour"
            value={formData.hour}
            onChange={(e) => handleChange("hour", e.target.value)}
          />
          <Inputs
            label="minute"
            value={formData.minute}
            onChange={(e) => handleChange("minute", e.target.value)}
          />

        </Box>
        <Box className="flex justify-end p-4">
          <Button variant="contained" onClick={toggleEditModal}>
            Bekor qilish
          </Button>
          <Button
            variant="contained"
            disabled={editFarmsLoading}
            onClick={handleFarmEdit}
            sx={{ ml: 2 }}
          >
            {editFarmsLoading ? "Yuklanmoqda..." : "Tahrirlash"}
          </Button>
        </Box>
      </Dialog>
    </div>
  );
};

export default HisobotView;
