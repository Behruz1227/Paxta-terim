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
} from "@mui/material";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Scrollbar } from "src/components/scrollbar";

import { CONFIG } from "src/config-global";
import { getMachine } from "src/hooks/api/url";
import useGet from "src/hooks/get";
import { TableNoData } from "src/sections/user/table-no-data";
import { UserTableHead } from "src/sections/user/user-table-head";
import { UserTableRow } from "src/sections/user/user-table-row";
import { MdEdit } from "react-icons/md";
import { DashboardContent } from "src/layouts/dashboard";
import { Iconify } from "src/components/iconify";
import { useTable } from "src/sections/user/view";

type Tables = {
  order: string;
  orderBy: string;
  selected: number[];
};

export default function Page() {
  const { data, get, error, isLoading } = useGet();
  const [page, setPage] = useState<number>(0);

  // State for managing sorting, selection, etc.
  const table = useTable();

  useEffect(() => {
    get(getMachine);
  }, []);

  // const handleSort = (order: any, orderBy: any) => {
  //   setTable((prevState) => ({
  //     ...prevState,
  //     order,
  //     orderBy,
  //   }));
  // };

  // const handleSelectAllRows = (checked: number, selectedIds: number) => {
  //   setTable((prevState: any) => ({
  //     ...prevState,
  //     selected: checked ? selectedIds : [],
  //   }));
  // };

  // const handleSelectRow = (id: number) => {
  //   setTable((prevState: any) => ({
  //     ...prevState,
  //     selected: prevState.selected.includes(id)
  //       ? prevState.selected.filter((selectedId: number) => selectedId !== id)
  //       : [...prevState.selected, id],
  //   }));
  // };

  return (
    <div>
      <Helmet>
        <title>{`Machine - ${CONFIG.appName}`}</title>
      </Helmet>

      <DashboardContent>
        <Box display="flex" alignItems="center" mb={5}>
          <Typography variant="h4" flexGrow={1}>
            Users
          </Typography>
          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="mingcute:add-line" />}
            // onClick={openModal}
          >
            New user
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
              <TableContainer sx={{ overflow: 'unset' }}>
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
                        (item: {
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
                        }, i: number) => (
                          <TableRow hover>
                            <TableCell>{i + 1}</TableCell>
                            {/* <TableCell>{i * 10 + 1}</TableCell> */}
                            <TableCell>{item.district}</TableCell>
                            <TableCell>{item.farmName || "-"}</TableCell>
                            <TableCell>{item.ownerFullName || "-"}</TableCell>
                            <TableCell>{item.ownerPhoneNumber}</TableCell>
                            <TableCell>{item.machineId}</TableCell>
                            <TableCell>{item.machineModel}</TableCell>
                            <TableCell>{item.year}</TableCell>
                            <TableCell>{item.firstName}</TableCell>
                            <TableCell>{item.lastName}</TableCell>
                            <TableCell>{item.lavozimi}</TableCell>
                            <TableCell>{item.phoneNumber}</TableCell>
                            <TableCell>
                              <Button>
                                <MdEdit />
                              </Button>
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
            </Scrollbar>
          </Card>
        )}
      </DashboardContent>
    </div>
  );
}
