import { Table, TableBody, TableContainer, Typography } from '@mui/material';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Scrollbar } from 'src/components/scrollbar';

import { CONFIG } from 'src/config-global';
import useGet from 'src/hooks/get';
import { TableNoData } from 'src/sections/user/table-no-data';
import { UserTableHead } from 'src/sections/user/user-table-head';
import { UserTableRow } from 'src/sections/user/user-table-row';

export default function Page() {
  const {data, get, error, isLoading } = useGet()
  useEffect(() => {
    get('/api/machine');
  },[])
  return (
    <div className='container ml-10'>
      <Helmet>
        <title> {`Blog - ${CONFIG.appName}`}</title>
      </Helmet>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Machine
      </Typography>
      <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={userData.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    userData.map((user) => user.id)
                  )
                }
                headLabel={[
                  { id: 'name', label: 'Ism' },
                  { id: 'company', label: 'Familiya' },
                  { id: 'role', label: 'Telefon raqam' },
                  { id: 'isVerified', label: 'Lavozimi', align: 'center' },
                  { id: 'status', label: 'Active' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {data && data.length === 0 ? (
                  <TableNoData searchQuery={filterName} />
                ) : (
                  Array.isArray(data?.object) &&
                  data?.object?.map((item: any) => (
                      <UserTableRow
                        key={item.id}
                        row={item}
                        selected={table.selected.includes(item.id)}
                        onSelectRow={() => table.onSelectRow(item.id)}
                        // onDelete={() => deleteModal()}
                        // onEdit={() => editModal()}
                      />
                    ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
    </div>
  );
}
