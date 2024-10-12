import {
  Box,
  Button,
  Dialog,
  IconButton,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { Iconify } from "src/components/iconify";
import { Inputs } from "src/components/input/input";
import { Modals } from "src/components/modal/modal";
import { farms_get, farms_global, report_get, ReportEdit } from "src/hooks/api/url";
import useDelete from "src/hooks/delete";
import useGet from "src/hooks/get";
import usePut from "src/hooks/put";

const HisobotView: React.FC = () => {
  const { get: getFarms, data: farmsData, isLoading: farmsLoading } = useGet();
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
  const [formData, setFormdata] = useState({
    farmId: 0,
    dialField: 0,
    cottonSize: 0,
    machineActive: "",
    downTime: 0,
    machineStatus: "",
    date: 2024 - 10 - 12,
    hour: 0,
    minute: 0,
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

  const handleFarmDelete = () => {
    deleteFarms(farms_global, farmId);
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
  const handleFarmEdit = () => {
    put(ReportEdit)
  }
  return (
    <div className="p-5">
      <Box sx={{ maxHeight: "400px", overflowY: "auto" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="center">T/r</TableCell>
              <TableCell align="center">PTM model</TableCell>
              <TableCell align="center">Tuman</TableCell>
              <TableCell align="center">Sektor</TableCell>
              <TableCell align="center">Hudud</TableCell>
              <TableCell align="center">Fermer xo'jalik</TableCell>
              <TableCell align="center">Maydoni</TableCell>
              <TableCell align="center">Paxta hajmi</TableCell>
              <TableCell align="center">PTM holati</TableCell>
              <TableCell align="center">Ishlamagan vaqti</TableCell>
              <TableCell align="center">Ishlamaslik sababi</TableCell>
              <TableCell align="center">F.I.O</TableCell>
              <TableCell align="center">Sana</TableCell>
              <TableCell align="center">Vaqt</TableCell>
              <TableCell align="center">Tahrirhlash</TableCell>
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
                        setFarmId(item.farmId);
                        setFarmName(item.farmName);
                        setFarmInn(item.inn);
                        setCottonPickedId(item.cottonPickedId);
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
        <Box className="grid md:grid-cols-2 gap-x-10 pt-3" mt={2}>
          <Inputs
            label="Farm ID"
            value={formData.farmId}
            onChange={(e) => handleChange("ownerFullName", e.target.value)}

          />
          <Inputs
            label="Dial Field (Gektar)"
            value={formData.dialField}
            onChange={(e) => handleChange("ownerFullName", e.target.value)}

          />
          <Inputs
            label="Cotton Size"
            value={formData.cottonSize}
            onChange={(e) => handleChange("ownerFullName", e.target.value)}

          />
          <Inputs
            label="Machine Active"
            type="checkbox"
            checked={formData.machineActive}
            onChange={(e) => handleChange("ownerFullName", e.target.value)}

          />
          <Inputs
            label="Downtime Date"
            type="date"
            value={formData.downDate}
            onChange={(e) => handleChange("ownerFullName", e.target.value)}

          />
          <Inputs
            label="Downtime Hour"
            value={formData.downHour}
            onChange={(e) => handleChange("ownerFullName", e.target.value)}

          />
          <Inputs
            label="Downtime Minute"
            value={formData.downMinute}
            onChange={(e) => handleChange("ownerFullName", e.target.value)}

          />
          <Inputs
            label="Machine Status"
            value={formData.machineStatus}
            onChange={(e) => handleChange("ownerFullName", e.target.value)}

          />
          <Inputs
            label="Date"
            type="date"
            value={formData.date}
            onChange={(e) => handleChange("ownerFullName", e.target.value)}

          />
          <Inputs
            label="Hour"
            value={formData.hour}
            onChange={(e) => handleChange("ownerFullName", e.target.value)}

          />
          <Inputs
            label="Minute"
            value={formData.minute}
            onChange={(e) => handleChange("ownerFullName", e.target.value)}

          />

          <Box>
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
        </Box>
      </Dialog>



    </div>
  );
};

export default HisobotView;
