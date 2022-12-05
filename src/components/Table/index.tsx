import React, { PropsWithChildren, FC} from "react";
import { useTable } from "react-table";
import { Tbody, Thead } from "./styles";
import { MenuScroll } from "src/layouts/Workspace/style";



interface Props {
	columns: any;
	data: any;
  }
const Table: FC<PropsWithChildren<Props>> = ({ columns, data }) =>  {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <MenuScroll>
    <table {...getTableProps()}>
      <Thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              ))}
            </tr>
          );
        })}
      </Tbody>
    </table>
    </MenuScroll>
  );
}

export default Table;