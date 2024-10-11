import type { IconButtonProps } from "@mui/material/IconButton";

import { useState, useCallback, useEffect } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import Divider from "@mui/material/Divider";
import MenuList from "@mui/material/MenuList";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuItem, { menuItemClasses } from "@mui/material/MenuItem";

import { useRouter, usePathname } from "src/routes/hooks";

import { _myAccount } from "src/_mock";
import useGet from "src/hooks/get";
import { timeGetUrl, timePutUrl, updateMe, userGetMe } from "src/hooks/api/url";
import { Iconify } from "src/components/iconify";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Inputs } from "src/components/input/input";
import usePut from "src/hooks/put";
import toast from "react-hot-toast";

// ----------------------------------------------------------------------

export type AccountPopoverProps = IconButtonProps & {
  data?: {
    label: string;
    href: string;
    icon?: React.ReactNode;
    info?: React.ReactNode;
  }[];
};

export function AccountPopover({
  data = [],
  sx,
  ...other
}: AccountPopoverProps) {
  const { data: datas, get: getUserMe, error, isLoading } = useGet();
  const { data: timeData, get: timeGet } = useGet();
  const {
    data: updateData,
    error: updateError,
    isLoading: updateLoading,
    put: update,
  } = usePut();
  const {
    data: timePutData,
    error: timeError,
    isLoading: timeLoading,
    put: time,
  } = usePut();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalTime, setIsModalTime] = useState(false);
  const [timeInterval, setTimeInterval] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: "",
    lavozimi: "",
  });
  const [errors, setErrors] = useState<any>({});

  const router = useRouter();
  const role = sessionStorage.getItem("ROLE");

  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(
    null
  );

  const handleOpenPopover = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setOpenPopover(event.currentTarget);
    },
    []
  );

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  useEffect(() => {
    getUserMe(userGetMe);
    timeGet(timeGetUrl);
  }, []);

  useEffect(() => {
    if (updateData) {
      console.log(updateData);
      updateData?.body && sessionStorage.setItem("token", updateData?.body);
      closeModal();
      toast.success("Profil tahrirlandi!");
      getUserMe(userGetMe);
    } else if (updateError) {
      closeModal();
      toast.error("Profil tahrirlanmadi");
    }
  }, [updateData, updateError]);

  useEffect(() => {
    if (timePutData) {
      closeTimeModal();
      toast.success("Vaqt interval tahrirlandi!");
      timeGet(timeGetUrl);
    } else if (timeError) {
      closeTimeModal();
      toast.error("Vaqt interval tahrirlanmadi");
    }
  }, [timePutData, timeError]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    resetValue();
    setIsModalOpen(false);
  };

  const openTimeModal = () => setIsModalTime(true);
  const closeTimeModal = () => {
    resetValue();
    setIsModalTime(false);
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const resetValue = () => {
    setFormData({
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
    if (!formData.firstName) newErrors.firstName = "Ismni kiriting";
    if (!formData.lastName) newErrors.lastName = "Familiyani kiriting";
    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Telefon raqamni kiriting";
    if (!formData.password) newErrors.password = "Parolni kiriting";
    if (!formData.lavozimi) newErrors.lavozimi = "Lavozimni kiriting";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = () => {
    if (validate()) {
      update(updateMe, datas?.id ? datas?.id : 0, {
        firstName: formData?.firstName,
        lastName: formData?.lastName,
        phoneNumber: formData?.phoneNumber,
        password: formData?.password,
        lavozimi: formData?.lavozimi,
      });
    }
  };

  return (
    <>
      <IconButton
        onClick={handleOpenPopover}
        sx={{
          p: "2px",
          width: 40,
          height: 40,
          background: (theme) =>
            `conic-gradient(${theme.vars.palette.primary.light}, ${theme.vars.palette.warning.light}, ${theme.vars.palette.primary.light})`,
          ...sx,
        }}
        {...other}
      >
        <Avatar
          src={_myAccount.photoURL}
          alt={_myAccount.displayName}
          sx={{ width: 1, height: 1 }}
        >
          {_myAccount.displayName.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            sx: { width: 300 },
          },
        }}
      >
        <Box
          sx={{
            p: 2,
            pb: 1.5,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="subtitle2" noWrap>
            {datas?.firstName ? datas?.firstName : "-"}
          </Typography>
          <IconButton
            onClick={() => {
              setFormData({
                firstName: datas?.firstName || "",
                lastName: datas?.lastName || "",
                phoneNumber: datas?.phoneNumber || "",
                password: "",
                lavozimi: datas?.lavozimi || "",
              });
              openModal();
            }}
          >
            <Iconify icon="solar:pen-bold" />
          </IconButton>
          {/* <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {_myAccount?.email}
          </Typography> */}
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuList
          disablePadding
          sx={{
            p: 1,
            gap: 0.5,
            width: "full",
            display: "flex",
            flexDirection: "column",
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              display: "flex",
              justifyContent: "space-between",
              borderRadius: 0.75,
              color: "text.secondary",
              "&:hover": { color: "text.primary" },
              [`&.${menuItemClasses.selected}`]: {
                color: "text.primary",
                bgcolor: "action.selected",
                fontWeight: "fontWeightSemiBold",
              },
            },
          }}
        >
          <MenuItem className="flex w-full justify-between">
            <p>Ism : </p>
            <p>{datas?.firstName ? datas?.firstName : "-"}</p>
          </MenuItem>
          <MenuItem className="flex w-full justify-between">
            <p>Familiya : </p>
            <p>{datas?.lastName ? datas?.lastName : "-"}</p>
          </MenuItem>
          <MenuItem className="flex w-full justify-between">
            <p>Telefon raqam : </p>
            <p>{datas?.phoneNumber ? datas?.phoneNumber : "-"}</p>
          </MenuItem>
          <MenuItem className="flex w-full justify-between">
            <p>Lavozim : </p>
            <p>{datas?.lavozimi ? datas?.lavozimi : "-"}</p>
          </MenuItem>
          {role === "ROLE_ADMIN" && (
            <MenuItem className="flex w-full justify-between">
              <p className="text-gray-700 font-semibold">Vaqt intervali : </p>
              <div className="flex w-full justify-end gap-5 items-center">
                <p>{timeData ? timeData : 0} soat</p>
                <IconButton
                  onClick={() => {
                    setTimeInterval(timeData ? timeData : "");
                    openTimeModal();
                  }}
                >
                  <Iconify className="w-3 h-3" icon="solar:pen-bold" />
                </IconButton>
              </div>
            </MenuItem>
          )}
        </MenuList>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Box sx={{ p: 1 }}>
          <Button
            fullWidth
            color="error"
            onClick={() => {
              sessionStorage.clear();
              router.push("sign-in");
            }}
            size="medium"
            variant="text"
          >
            Logout
          </Button>
        </Box>
      </Popover>

      <Dialog
        title="Foydalanuvchi qo'shish"
        open={isModalOpen}
        onClose={closeModal}
        maxWidth="xl"
      >
        <DialogTitle>Profilni tahrirlas</DialogTitle>
        <DialogContent className="md:min-w-[700px]">
          <Box className="grid md:grid-cols-2 gap-x-10">
            <Inputs
              onChange={(e) => handleChange("firstName", e.target.value)}
              value={formData.firstName}
              label="Ismni kiriting"
              error={!!errors.firstName}
              // helperText={errors.firstName}
            />
            <Inputs
              onChange={(e) => handleChange("lastName", e.target.value)}
              value={formData.lastName}
              label="Familiyani kiriting"
              error={!!errors.lastName}
              // helperText={errors.lastName}
            />
            <Inputs
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
              value={formData.phoneNumber}
              label="Telefon raqamni kiriting"
              error={!!errors.phoneNumber}
              // helperText={errors.phoneNumber}
            />
            <Inputs
              onChange={(e) => handleChange("password", e.target.value)}
              value={formData.password}
              label="Parolni kiriting"
              error={!!errors.password}
              // helperText={errors.password}
            />
            <Inputs
              onChange={(e) => handleChange("lavozimi", e.target.value)}
              value={formData.lavozimi}
              label="Lavozimni kiriting"
              error={!!errors.lavozimi}
              // helperText={errors.lavozimi}
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
              {updateLoading ? "Yuklanmoqda..." : "Tahrirlash"}
            </Button>
          </Box>
        </DialogActions>
      </Dialog>

      <Dialog
        title="Foydalanuvchi qo'shish"
        open={isModalTime}
        onClose={closeTimeModal}
        maxWidth="xl"
      >
        <DialogTitle>Vaqt intervalni tahrirlash</DialogTitle>
        <DialogContent className="min-w-[400px]">
          <Box className="">
            <Inputs
              type="number"
              onChange={(e) => setTimeInterval(e.target.value)}
              value={timeInterval}
              label="Vaqtni kiriting"
              error={+timeInterval < 0 || +timeInterval > 24}
              helperText={
                +timeInterval < 0 || +timeInterval > 24
                  ? "Vaqt 0 dan katta 24 dan kichik bo'lishi kerak"
                  : ""
              }
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Box
            mt={2}
            className="flex flex-col md:flex-row items-end gap-5 justify-center "
          >
            <Button variant="contained" color="error" onClick={closeTimeModal}>
              Bekor qilish
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                +timeInterval > 0 && +timeInterval < 24
                  ? time(timePutUrl, `?time=${timeInterval}`, {})
                  : () => {};
              }}
              sx={{ ml: 2 }}
            >
              {timeLoading ? "Yuklanmoqda..." : "Tahrirlash"}
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
}
