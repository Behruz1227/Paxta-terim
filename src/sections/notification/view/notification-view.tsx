import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Button,
  IconButton,
  Select,
} from "@mui/material";
import { DashboardContent } from "src/layouts/dashboard";
import { Iconify } from "src/components/iconify";
import { Modals } from "src/components/modal/modal";
import useGet from "src/hooks/get";
import {
  notificationConfirmed,
  notificationDelete,
  notificationGetAdmin,
  notificationGetUser,
  notificationRead,
} from "src/hooks/api/url";
import usePost from "src/hooks/post";
import toast from "react-hot-toast";
import { MenuItem } from "@mui/material";

export function NotificationView() {
  const role = sessionStorage.getItem("ROLE");
  const [isModalDelete, setIsModalDelete] = useState(false);

  const { data, get: getNotification } = useGet();
  const { post: deleteNotifi, data: deleteData, error: deleteError } = usePost();
  const { post: readNotifi, data: readData, error: readError  } = usePost();
  const { post: editStatus, data: editData, error: editError } = usePost();

  const closeModal = () => {
    setIsModalDelete(false);
  };

  useEffect(() => {
    getNotification(
      `${role === "ROLE_ADMIN" ? notificationGetAdmin : notificationGetUser}`
    );
  }, []);

  useEffect(() => {
    if (editData) {
      toast.success("Ruxsat berildi");
      getNotification(
        `${role === "ROLE_ADMIN" ? notificationGetAdmin : notificationGetUser}`
      );
    } else if (editError) {
      toast.error("Ruxsat berilmadi");
    }
  }, [editError, editData]);

  useEffect(() => {
    if (readData) {
      toast.success("O'qildi deb belgilandi!");
      getNotification(
        `${role === "ROLE_ADMIN" ? notificationGetAdmin : notificationGetUser}`
      );
    } else if (readError) {
      toast.error("O'qildi deb belgilanmadi");
    }
  }, [readError, readData]);

  useEffect(() => {
    if (deleteData) {
      toast.success("Xabar o'chirildi!");
      getNotification(
        `${role === "ROLE_ADMIN" ? notificationGetAdmin : notificationGetUser}`
      );
    } else if (deleteError) {
      toast.error("Xabar o'chirilmadi");
    }
  }, [deleteError, deleteData]);

  // Function to handle gathering IDs where read === true
  const handleReadNotification = () => {
    const readItems = data?.object
      ?.filter((item: any) => item.read === true)
      .map((item: any) => item.id);

    if (readItems?.length > 0) {
      readNotifi(notificationRead, { list: readItems });
    } else {
      toast.error("No read notifications found.");
    }
  };

  // Function to handle gathering all IDs for delete
  const handleDeleteAll = () => {
    const allIds = data?.object?.map((item: any) => item.id);
    if (allIds?.length > 0) {
      deleteNotifi(notificationDelete, { list: allIds });
    } else {
      toast.error("No notifications to delete.");
    }
  };

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Xabarlar
        </Typography>
        <div>
          <IconButton onClick={handleReadNotification}>
            <Iconify
              width={27}
              height={27}
              color={"green"}
              icon="line-md:check-all"
            />
          </IconButton>
          <IconButton sx={{ color: "error.main" }} onClick={handleDeleteAll}>
            <Iconify width={27} height={27} icon="ic:baseline-delete-sweep" />
          </IconButton>
        </div>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">T/r</TableCell>
              <TableCell align="center">Xabar</TableCell>
              <TableCell align="center">Yuborgan foydalanuvchi</TableCell>
              <TableCell align="center">Sana</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.object && data?.object?.length > 0 ? (
              data?.object?.map((item: any, index: number) => (
                <TableRow key={index} style={{ cursor: "pointer" }}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center" component="th" scope="row">
                    <Typography variant="h6" fontWeight="bold">
                      {item?.title ? item?.title : "-"}
                    </Typography>
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    <Typography variant="h6" fontWeight="bold">
                      {item?.userFullName ? item?.userFullName : "-"}
                    </Typography>
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    <Typography variant="h6" fontWeight="bold">
                      {item?.createdAt
                        ? item?.createdAt?.substring(0, 10)
                        : "-"}
                    </Typography>
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">

                    <Select
                    value={item?.status}
                    onChange={(e) => {
                      editStatus(
                        `${notificationConfirmed}?id=${item.id}&status=${e.target.value}`,
                        {}
                      );
                    }}
                    >
                      <MenuItem value={"RUXSAT_SURALMOQDA"}>Ruxsat so'ralmoqda</MenuItem>
                      <MenuItem value={"RUXSAT_BERILDI"}>Ruxsat berildi</MenuItem>
                    </Select>
                    {/* <Button
                      onClick={() => {
                        
                      }}
                      disabled={
                        item?.status && item?.status !== "RUXSAT_SURALMOQDA"
                      }
                    >
                      <Typography
                        color={
                          item?.status && item?.status === "RUXSAT_SURALMOQDA"
                            ? "green"
                            : ""
                        }
                        variant="h6"
                        fontWeight="bold"
                      >
                        {item?.status && item?.status === "RUXSAT_SURALMOQDA"
                          ? "Ruxsat berish"
                          : "Ruxsat berilgan"}
                      </Typography>
                    </Button> */}
                  </TableCell>
                  <TableCell align="center">
                    {!item.read && (
                      <IconButton
                        onClick={() => {
                          readNotifi(notificationRead, { list: [item.id] });
                        }}
                      >
                        <Iconify
                          color={"green"}
                          icon="mingcute:check-2-fill"
                        />
                      </IconButton>
                    )}
                    <IconButton
                      onClick={() => {
                        deleteNotifi(notificationDelete, { list: [item.id] });
                      }}
                      sx={{ color: "error.main" }}
                    >
                      <Iconify icon="solar:trash-bin-trash-bold" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Xabarlar topilmadi.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Modal for Delete Confirmation */}
        <Modals
          title="O'chirish tasdiqlash"
          open={isModalDelete}
          onClose={closeModal}
        >
          <Typography>O'chirishni tasdiqlaysizmi?</Typography>
          <Box mt={2}>
            <Button variant="contained" color="error" onClick={closeModal}>
              Bekor qilish
            </Button>
            <Button
              variant="contained"
              color="primary"
              // onClick={del}
              sx={{ ml: 2 }}
            >
              O'chirish
            </Button>
          </Box>
        </Modals>
      </TableContainer>
    </DashboardContent>
  );
}
