import { Table, TableBody, TableContainer, Typography, CircularProgress, TableRow, TableCell, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Scrollbar } from 'src/components/scrollbar';

import { CONFIG } from 'src/config-global';
import { getMachine } from 'src/hooks/api/url';
import useGet from 'src/hooks/get';
import { TableNoData } from 'src/sections/user/table-no-data';
import { UserTableHead } from 'src/sections/user/user-table-head';
import { UserTableRow } from 'src/sections/user/user-table-row';
import { MdEdit } from "react-icons/md";

type Tables = {
  order: string;
  orderBy: string;
  selected: number[];
};

export default function Page() {
  const { data, get, error, isLoading } = useGet();
  const [page, setPage] = useState<number>(0);

  // State for managing sorting, selection, etc.
  const [table, setTable] = useState<Tables>({
    order: 'asc',
    orderBy: 'district', // Set initial sorting by 'district'
    selected: [],
  });

  useEffect(() => {
    get(getMachine);
  }, []);

  const handleSort = (order: any, orderBy: any) => {
    setTable((prevState) => ({
      ...prevState,
      order,
      orderBy,
    }));
  };

  const handleSelectAllRows = (checked: number, selectedIds: number) => {
    setTable((prevState: any) => ({
      ...prevState,
      selected: checked ? selectedIds : [],
    }));
  };

  const handleSelectRow = (id: number) => {
    setTable((prevState: any) => ({
      ...prevState,
      selected: prevState.selected.includes(id)
        ? prevState.selected.filter((selectedId: number) => selectedId !== id)
        : [...prevState.selected, id],
    }));
  };

  return (
    <div className="container ml-10">
      <Helmet>
        <title>{`Machine - ${CONFIG.appName}`}</title>
      </Helmet>

      <Typography variant="h4" sx={{ mb: 5 }}>
        Machine
      </Typography>

      {isLoading ? (
        <CircularProgress />
      ) : error ? (
        <Typography variant="h6" color="error">
          Error loading data
        </Typography>
      ) : (
        <Scrollbar>
          <TableContainer sx={{ overflow: 'hidden' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={data?.object?.length || 0}
                numSelected={table.selected.length}
                onSort={handleSort}
                onSelectAllRows={(checked: any) =>
                  handleSelectAllRows(checked, data?.object?.map((item: any) => item.id) || [])
                }
                headLabel={[
                  { id: 'district', label: 'Tuman' },
                  { id: 'farmName', label: 'Fermer xo\'jaligi nomi' },
                  { id: 'ownerFullName', label: 'Egasi' },
                  { id: 'ownerPhoneNumber', label: 'Egasi telefon raqami' },
                  { id: 'machineId', label: 'Mashina ID' },
                  { id: 'machineModel', label: 'Model' },
                  { id: 'year', label: 'Yil' },
                  { id: 'firstName', label: 'Ism' },
                  { id: 'lastName', label: 'Familiya' },
                  { id: 'lavozimi', label: 'Lavozimi' },
                  { id: 'phoneNumber', label: 'Telefon raqam' },
                  { id: 'qushimcha', label: 'Qushimcha' },
                ]}
              />

              <TableBody>
                {Array.isArray(data?.object) && data.object.length > 0 ? (
                  data.object.map((item: {
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
                  }) => (
                    <TableRow hover>
                      <TableCell>{item.district}</TableCell>
                      <TableCell>{item.district}</TableCell>
                      <TableCell>{item.farmName || '-'}</TableCell>
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
                  ))
                ) : (
                  <TableNoData searchQuery="" />
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      )}
    </div>
  );
}
