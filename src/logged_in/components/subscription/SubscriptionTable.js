import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { Button, IconButton, Table, TableBody, TableCell, TablePagination, TableRow, Toolbar } from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import EnhancedTableHead from "../../../shared/components/EnhancedTableHead";
import ColorfulChip from "../../../shared/components/ColorfulChip";
import unixToDateString from "../../../shared/functions/unixToDateString";
import HighlightedInformation from "../../../shared/components/HighlightedInformation";
import currencyPrettyPrint from "../../../shared/functions/currencyPrettyPrint";
import Moment from 'react-moment';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import swal from 'sweetalert';

const styles = theme => ({
  tableWrapper: {
    overflowX: "auto",
    width: "100%"
  },
  blackBackground: {
    backgroundColor: theme.palette.primary.main
  },
  contentWrapper: {
    padding: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2)
    },
    width: "100%"
  },
  dBlock: {
    display: "block !important"
  },
  dNone: {
    display: "none !important"
  },
  firstData: {
    paddingLeft: theme.spacing(3)
  }
});

const rows = [
  {
    id: "fullname",
    numeric: false,
    label: "Citoyen(ne)"
  },
  {
    id: "Date",
    numeric: false,
    label: "Date"
  },
  {
    id: "sousservice",
    numeric: false,
    label: "Sous Service"
  },
  {
    id: "Service",
    numeric: false,
    label: "Service"
  },
  {
    id: "Action",
    numeric: false,
    label: "Action"
  }
];

const rowsPerPage = 25;

function SubscriptionTable(props) {
  const { transactions, theme, classes, openAddBalanceDialog } = props;
  const [page, setPage] = useState(0);

  const handleChangePage = useCallback(
    (_, page) => {
      setPage(page);
    },
    [setPage]
  );

  

  const openModifier = (id)=>{ 
    openAddBalanceDialog()
    sessionStorage.setItem('idRdv', id);
  };


  const removeRdv = (id)=>{ 
    swal({
      title: "Are you sure?",
      text: "êtes-vous sûr de supprimer cette demande",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        axios.delete(`http://localhost:5000/demandes/delete/${id}`)
        .then(res => {
          if (res.status === 200) {
            window.location.reload();
          }
        }).catch(err => {
        });
      }
    });
  };

  

  if (transactions.length > 0) {
    return (
      <div className={classes.tableWrapper}>
        <Table aria-labelledby="tableTitle">
          <EnhancedTableHead rowCount={transactions.length} rows={rows} />
          <TableBody>
            {transactions
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((transaction, index) => (
                <TableRow hover tabIndex={-1} key={index}>
                  <TableCell component="th" scope="row">
                    {/* {console.log(transaction.user)} */}
                  {transaction.user !== undefined && transaction.user[0].firstName + ' ' +transaction.user[0].lastName}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    className={classes.firstData}
                  >
                    <Moment format="YY/MM/DD hh:mm:ss" date={transaction.dateRdv} />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {transaction.refSubservice}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {transaction.refService}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <div style={{display: 'flex'}}>
                      <Button onClick={()=>openModifier(transaction._id)}><EditIcon /></Button>
                      <Button onClick={()=>removeRdv(transaction._id)}><DeleteIcon /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={transactions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page"
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page"
          }}
          onPageChange={handleChangePage}
          classes={{
            select: classes.dNone,
            selectIcon: classes.dNone,
            actions: transactions.length > 0 ? classes.dBlock : classes.dNone,
            caption: transactions.length > 0 ? classes.dBlock : classes.dNone
          }}
          labelRowsPerPage=""
        />
      </div>
    );
  }
  return (
    <div className={classes.contentWrapper}>
      <HighlightedInformation>
        No transactions received yet.
      </HighlightedInformation>
    </div>
  );
}

SubscriptionTable.propTypes = {
  theme: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  transactions: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withStyles(styles, { withTheme: true })(SubscriptionTable);
