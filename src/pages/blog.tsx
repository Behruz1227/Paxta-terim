import {
  Table,
  TableBody,
  TableContainer,
  Typography,
  CircularProgress,
  TableRow,
  TableCell,
  Button,
  Box,
  Card,
  IconButton,
  Select,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Scrollbar } from "src/components/scrollbar";
import { CONFIG } from "src/config-global";
import { delMachine, getDistirct, getMachine, postMachine, putMachine } from "src/hooks/api/url";
import useGet from "src/hooks/get";
import { TableNoData } from "src/sections/user/table-no-data";
import { UserTableHead } from "src/sections/user/user-table-head";
import { DashboardContent } from "src/layouts/dashboard";
import { Iconify } from "src/components/iconify";
import { useTable } from "src/sections/user/view";
import { Modals } from "src/components/modal/modal";
import { Inputs } from "src/components/input/input";
import { MenuItem } from "@mui/material";
import { DialogContent } from "@mui/material";
import usePost from "src/hooks/post";
import toast from "react-hot-toast";
import useDelete from "src/hooks/delete";
import { Pagination } from "antd";
import usePut from "src/hooks/put";


export default function Machine() {
  const { data, get, error, isLoading } = useGet();
  const { data: desData, get: desGet } = useGet();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const { remove, data: remData, error: remError, isLoading: remLoad } = useDelete()
  const [formData, setFormData] = useState({
    districtId: 0,
    farmName: "",
    ownerFullName: "",
    ownerPhoneNumber: "",
    machineId: "",
    machineModel: "",
    year: 0,
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: "",
    lavozimi: "",
  });
  const [errors, setErrors] = useState<any>({});
  const { data: response, post, error: postError } = usePost();
  const { data: dataEdit, error: errorEdit, put, isLoading: loadEdit } = usePut()
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectId, setSelectedId] = useState<number | null>(0)
  const table = useTable();

  const openModal = () => {
    setIsModalOpen(true);
    desGet(getDistirct);
  };
  const closeModal = () => {
    resetValue();
    setIsModalOpen(false);
  };
  const openModalEdit = () => {
    setIsModalOpenEdit(true);
    desGet(getDistirct);
  };
  const closeModalEdit = () => {
    resetValue();
    setIsModalOpenEdit(false);
  };
  // console.log(data);

  const openDeleteModal = (id?: number) => {
    id && setSelectedItemId(id);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setSelectedItemId(null);
    setIsDeleteModalOpen(false);
  };

  useEffect(() => {
    get(`${getMachine}?page=${currentPage - 1}&size=${pageSize}`);
    desGet(getDistirct)
  }, [currentPage, pageSize]);

  useEffect(() => {
    if (response) {
      closeModal();
      toast.success("Mashina qo'shildi");
      get(`${getMachine}?page=${currentPage - 1}&size=${pageSize}`);
      resetValue();
    } else if (postError) {
      closeModal();
      toast.error("Xato!");
    }
  }, [response, postError]);

  const handleChange = (field: string, value: any) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };
  const resetValue = () => {
    setFormData({
      districtId: 0,
      farmName: "",
      ownerFullName: "",
      ownerPhoneNumber: "",
      machineId: "",
      machineModel: "",
      year: 0,
      firstName: "",
      lastName: "",
      phoneNumber: "",
      password: "",
      lavozimi: "",
    });
    setErrors({});
  };

  const validate = () => {
    const newErrors: any = {};
    if (!formData.districtId) newErrors.districtId = "Tumanni tanlang";
    if (!formData.farmName) newErrors.farmName = "Ferma nomini kiriting";
    if (!formData.ownerFullName)
      newErrors.ownerFullName = "Egasini ism familiyasini kiriting";
    if (!formData.ownerPhoneNumber)
      newErrors.ownerPhoneNumber = "Egasini telefon raqamini kiriting";
    if (!formData.machineId) newErrors.machineId = "Mashina id kiriting";
    if (!formData.machineModel)
      newErrors.machineModel = "Mashina modelini kiriting";
    if (!formData.year) newErrors.year = "Yilni kiriting";
    if (!formData.firstName) newErrors.firstName = "Ismni kiriting";
    if (!formData.lastName) newErrors.lastName = "Familiyani kiriting";
    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Telefon raqamni kiriting";
    if (!formData.password) newErrors.password = "Parolni kiriting";
    if (!formData.lavozimi) newErrors.lavozimi = "Lavozimni kiriting";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async () => {
    if (!validate()) return;
    try {
      await post(postMachine, formData);
    } catch {
      alert("Xato! Iltimos, qayta urinib ko‘ring.");
    }
  };

  const handlePaginationChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };
  const onEdit = (id: number) => {
    setSelectedId(id);
  };
  const handleEdit = async () => {
    if (!validate()) return;
    try {
      await put(putMachine, selectId, formData);
      if (dataEdit) {
        closeModalEdit();
        get(`${getMachine}?page=${currentPage - 1}&size=${pageSize}`);
        toast.success("Mashina tahrirlandi");
      }
    } catch {
      toast.error("Xato! Iltimos, qayta urinib ko‘ring.(malumotlarni kiritishda etibor qarating)");
    }
  };
  const handleDelete = async () => {
    try {
      console.log("Deleted item with ID:", selectId);
      await remove(delMachine, selectId);
      await get(`${getMachine}?page=${currentPage - 1}&size=${pageSize}`);
      closeDeleteModal();
    } catch {
      console.error("Delete process failed: ");
    }
  };



  return (
    <div>
      <Helmet>
        <title>{`Machine - ${CONFIG.appName}`}</title>
      </Helmet>
      <DashboardContent>
        <Box display="flex" alignItems="center" mb={5}>
          <Typography variant="h4" flexGrow={1}>
            Mashinalar
          </Typography>
          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="mingcute:add-line" />}
            onClick={openModal}
          >
            Yangi qo&apos;shish
          </Button>
        </Box>
        {isLoading ? (
          <CircularProgress />
        ) : error ? (
          <Typography variant="h6" color="error">
            Error loading data
          </Typography>
        ) : (
          <Card>
            <Scrollbar>
              <TableContainer sx={{ overflow: "auto" }}>
                <Table sx={{ minWidth: 800 }}>
                  <UserTableHead
                    order={table.order}
                    orderBy={table.orderBy}
                    rowCount={data?.object?.length || 0}
                    numSelected={table.selected.length}
                    onSort={table.onSort}
                    onSelectAllRows={(checked: any) =>
                      table.onSelectAllRows(
                        checked,
                        data.map((user: any) => user.id)
                      )
                    }
                    headLabel={[
                      { id: "index", label: "T/R" },
                      { id: "district", label: "Tuman" },
                      { id: "farmName", label: "Fermer xo'jaligi nomi" },
                      { id: "ownerFullName", label: "Egasi" },
                      { id: "ownerPhoneNumber", label: "Egasi telefon raqami" },
                      { id: "machineId", label: "Mashina ID" },
                      { id: "machineModel", label: "Model" },
                      { id: "year", label: "Yil" },
                      { id: "firstName", label: "Ism" },
                      { id: "lastName", label: "Familiya" },
                      { id: "lavozimi", label: "Lavozimi" },
                      { id: "phoneNumber", label: "Telefon raqam" },
                      { id: "qushimcha", label: "Qushimcha" },
                    ]}
                  />

                  <TableBody>
                    {Array.isArray(data?.object) && data.object.length > 0 ? (
                      data.object.map(
                        (
                          item: {
                            id: number;
                            district: string;
                            farmName: string;
                            ownerFullName: string;
                            ownerPhoneNumber: string;
                            machineId: string;
                            machineModel: string;
                            year: number;
                            firstName: string;
                            lastName: string;
                            lavozimi: string;
                            phoneNumber: string;
                          },
                          i: number
                        ) => (
                          <TableRow hover>
                            <TableCell>{((currentPage - 1) * 10) + i + 1}</TableCell>
                            <TableCell>{item.district || "-"}</TableCell>
                            <TableCell>{item.farmName || "-"}</TableCell>
                            <TableCell>{item.ownerFullName || "-"}</TableCell>
                            <TableCell>
                              {item.ownerPhoneNumber || "-"}
                            </TableCell>
                            <TableCell>{item.machineId || "-"}</TableCell>
                            <TableCell>{item.machineModel || "-"}</TableCell>
                            <TableCell>{item.year || "-"}</TableCell>
                            <TableCell>{item.firstName || "-"}</TableCell>
                            <TableCell>{item.lastName || "-"}</TableCell>
                            <TableCell>{item.lavozimi || "-"}</TableCell>
                            <TableCell>{item.phoneNumber || "-"}</TableCell>
                            <TableCell align="right">
                              <IconButton
                                onClick={() => {
                                  setFormData({
                                    password: "",
                                    districtId: 0,
                                    farmName: item.farmName || "",
                                    ownerFullName: item.ownerFullName || "",
                                    ownerPhoneNumber: item.ownerPhoneNumber || '',
                                    machineId: item.machineId || '',
                                    machineModel: '',
                                    year: item.year || 0,
                                    firstName: item.firstName || '',
                                    lastName: item.lastName || '',
                                    lavozimi: item.lavozimi || '',
                                    phoneNumber: item.phoneNumber || '',
                                  })
                                  setIsModalOpenEdit(true);
                                  onEdit(item.id);
                                }}
                              >
                                <Iconify icon="solar:pen-bold" />
                              </IconButton>

                              <IconButton
                                onClick={() => {
                                  openDeleteModal();
                                  onEdit(item.id);
                                }}
                                sx={{ color: "error.main" }}
                              >
                                <Iconify icon="solar:trash-bin-trash-bold" />
                              </IconButton>

                            </TableCell>
                          </TableRow>
                        )
                      )
                    ) : (
                      <TableNoData searchQuery="" />
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              {Array.isArray(data?.object) && data.object.length > 0 && (
                <div className="mb-4 mt-2">
                  <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={data?.totalElements}
                    onChange={handlePaginationChange}
                    showSizeChanger={false}
                  />
                </div>
              )}
            </Scrollbar>
          </Card>
        )}
        <Dialog open={isDeleteModalOpen} onClose={closeDeleteModal}>
          <DialogTitle>Ma&apos;lumotni o&apos;chirish</DialogTitle>
          <DialogContent>
            <Typography>
              Haqiqatan ham ushbu malumotni o&apos;chirmoqchimisiz?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDeleteModal} color="inherit">
              Bekor qilish
            </Button>
            <Button onClick={handleDelete} color="error" variant="contained">
              O&apos;chirish
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          title="Foydalanuvchi qo'shish"
          open={isModalOpen}
          onClose={closeModal}
          maxWidth="xl"
        >
          <DialogTitle>Mashina qo&apos;shish</DialogTitle>
          <DialogContent className="md:min-w-[700px]">
            <Box className="grid md:grid-cols-2 gap-x-10 pt-3">
              <div>
                <FormControl fullWidth error={!!errors.districtId}>
                  <InputLabel>Tumanni tanlang</InputLabel>
                  <Select
                    value={formData.districtId}
                    onChange={(e) => handleChange("districtId", e.target.value)}
                    label="Tumanni tanlang"
                  >
                    {desData &&
                      desData.map((item: { id: number; name: string }) => (
                        <MenuItem value={item.id}>{item.name}</MenuItem>
                      ))}
                  </Select>
                </FormControl>
                {errors.districtId && (
                  <Typography color="error">{errors.districtId}</Typography>
                )}
              </div>
              <Inputs
                onChange={(e) => handleChange("farmName", e.target.value)}
                value={formData.farmName}
                label="Ferma nomini kiriting"
                error={!!errors.farmName}
                helperText={errors.farmName}
              />
              <Inputs
                onChange={(e) => handleChange("ownerFullName", e.target.value)}
                value={formData.ownerFullName}
                label="Egasini ism familiyasini kiriting"
                error={!!errors.ownerFullName}
                helperText={errors.ownerFullName}
              />
              <Inputs
                onChange={(e) =>
                  handleChange("ownerPhoneNumber", e.target.value)
                }
                value={formData.ownerPhoneNumber}
                label="Egasini telefon raqamini kiriting"
                error={!!errors.ownerPhoneNumber}
                helperText={errors.ownerPhoneNumber}
              />
              <Inputs
                onChange={(e) => handleChange("machineId", e.target.value)}
                value={formData.machineId}
                label="Mashina id kiriting"
                error={!!errors.machineId}
                helperText={errors.machineId}
              />
              {/* <Inputs
                onChange={(e) => handleChange("machineModel", e.target.value)}
                value={formData.machineModel}
                label="Mashina modelini kiriting"
                error={!!errors.machineModel}
                helperText={errors.machineModel}
              /> */}
              <FormControl fullWidth error={!!errors.machineModel}>
                <InputLabel>machine madelini tanlang</InputLabel>
                <Select
                  value={formData.machineModel}
                  onChange={(e) => handleChange("machineModel", e.target.value)}
                  label="machineModel tanlang"
                >
                  <MenuItem value="CE_220">CE_220</MenuItem>
                  <MenuItem value="JOHN_DEERE">JOHN_DEERE</MenuItem>
                  <MenuItem value="BOSHIRAN">BOSHIRAN</MenuItem>
                  <MenuItem value="FM_WORLD">FM_WORLD</MenuItem>
                  <MenuItem value="DONG_FENG">DONG_FENG</MenuItem>
                </Select>
              </FormControl>
              <Inputs
                onChange={(e) => handleChange("year", e.target.value)}
                value={formData.year}
                label="Yilni kiriting"
                error={!!errors.year}
                helperText={errors.year}
              />
              <Inputs
                onChange={(e) => handleChange("firstName", e.target.value)}
                value={formData.firstName}
                label="Ismni kiriting"
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
              <Inputs
                onChange={(e) => handleChange("lastName", e.target.value)}
                value={formData.lastName}
                label="Familiyani kiriting"
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
              <Inputs
                onChange={(e) => handleChange("phoneNumber", e.target.value)}
                value={formData.phoneNumber}
                label="Telefon raqamni kiriting"
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
              />
              <Inputs
                onChange={(e) => handleChange("password", e.target.value)}
                value={formData.password}
                label="Parolni kiriting"
                error={!!errors.password}
                helperText={errors.password}
              />
              <Inputs
                onChange={(e) => handleChange("lavozimi", e.target.value)}
                value={formData.lavozimi}
                label="Lavozimni kiriting"
                error={!!errors.lavozimi}
                helperText={errors.lavozimi}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Box
              mt={2}
              className="flex flex-col md:flex-row items-end gap-5 justify-center "
            >
              <Button variant="contained" color="error" onClick={closeModal}>
                Bekor qilish
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={handleFormSubmit}
                sx={{ ml: 2 }}
              >
                Foydalanuvchi qo&apos;shish
              </Button>
            </Box>
          </DialogActions>
        </Dialog>
        <Dialog
          title="Foydalanuvchi qo'shish"
          open={isModalOpenEdit}
          onClose={closeModalEdit}
          maxWidth="xl"
        >
          <DialogTitle>Mashinani tahrirlash</DialogTitle>
          <DialogContent className="md:min-w-[700px]">
            <Box className="grid md:grid-cols-2 gap-x-10 pt-3">
              <div>
                <FormControl fullWidth error={!!errors.districtId}>
                  <InputLabel>Tumanni tanlang</InputLabel>
                  <Select
                    value={formData.districtId}
                    onChange={(e) => handleChange("districtId", e.target.value)}
                    label="Tumanni tanlang"
                  >
                    {desData &&
                      desData.map((item: { id: number; name: string }) => (
                        <MenuItem value={item.id}>{item.name}</MenuItem>
                      ))}
                  </Select>
                </FormControl>
                {errors.districtId && (
                  <Typography color="error">{errors.districtId}</Typography>
                )}
              </div>
              <Inputs
                onChange={(e) => handleChange("farmName", e.target.value)}
                value={formData.farmName}
                label="Ferma nomini kiriting"
                error={!!errors.farmName}
                helperText={errors.farmName}
              />
              <Inputs
                onChange={(e) => handleChange("ownerFullName", e.target.value)}
                value={formData.ownerFullName}
                label="Egasini ism familiyasini kiriting"
                error={!!errors.ownerFullName}
                helperText={errors.ownerFullName}
              />
              <Inputs
                onChange={(e) =>
                  handleChange("ownerPhoneNumber", e.target.value)
                }
                value={formData.ownerPhoneNumber}
                label="Egasini telefon raqamini kiriting"
                error={!!errors.ownerPhoneNumber}
                helperText={errors.ownerPhoneNumber}
              />
              <Inputs
                onChange={(e) => handleChange("machineId", e.target.value)}
                value={formData.machineId}
                label="Mashina id kiriting"
                error={!!errors.machineId}
                helperText={errors.machineId}
              />
              {/* <Inputs
                onChange={(e) => handleChange("machineModel", e.target.value)}
                value={formData.machineModel}
                label="Mashina modelini kiriting"
                error={!!errors.machineModel}
                helperText={errors.machineModel}
              /> */}
              <FormControl fullWidth error={!!errors.machineModel}>
                <InputLabel>machine madelini tanlang</InputLabel>
                <Select
                  value={formData.machineModel}
                  onChange={(e) => handleChange("machineModel", e.target.value)}
                  label="machineModel tanlang"
                >
                  <MenuItem value="CE_220">CE_220</MenuItem>
                  <MenuItem value="JOHN_DEERE">JOHN_DEERE</MenuItem>
                  <MenuItem value="BOSHIRAN">BOSHIRAN</MenuItem>
                  <MenuItem value="FM_WORLD">FM_WORLD</MenuItem>
                  <MenuItem value="DONG_FENG">DONG_FENG</MenuItem>
                </Select>
              </FormControl>
              <Inputs
                onChange={(e) => handleChange("year", e.target.value)}
                value={formData.year}
                label="Yilni kiriting"
                error={!!errors.year}
                helperText={errors.year}
              />
              <Inputs
                onChange={(e) => handleChange("firstName", e.target.value)}
                value={formData.firstName}
                label="Ismni kiriting"
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
              <Inputs
                onChange={(e) => handleChange("lastName", e.target.value)}
                value={formData.lastName}
                label="Familiyani kiriting"
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
              <Inputs
                onChange={(e) => handleChange("phoneNumber", e.target.value)}
                value={formData.phoneNumber}
                label="Telefon raqamni kiriting"
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
              />
              <Inputs
                onChange={(e) => handleChange("password", e.target.value)}
                value={formData.password}
                label="Parolni kiriting"
                error={!!errors.password}
                helperText={errors.password}
              />
              <Inputs
                onChange={(e) => handleChange("lavozimi", e.target.value)}
                value={formData.lavozimi}
                label="Lavozimni kiriting"
                error={!!errors.lavozimi}
                helperText={errors.lavozimi}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Box
              mt={2}
              className="flex flex-col md:flex-row items-end gap-5 justify-center "
            >
              <Button variant="contained" color="error" onClick={closeModalEdit}>
                Bekor qilish
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={handleEdit}
                sx={{ ml: 2 }}
              >
                Foydalanuvchi qo&apos;shish
              </Button>
            </Box>
          </DialogActions>
        </Dialog>
      </DashboardContent>
    </div>
  );
}
