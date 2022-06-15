
import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { Button, IconButton, Table, TableBody, TableCell, TablePagination, TableRow, Toolbar } from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import EnhancedTableHead from "../../shared/components/EnhancedTableHead";
// import ColorfulChip from "../../shared/components/ColorfulChip";
// import unixToDateString from "../../shared/functions/unixToDateString";
import HighlightedInformation from "../../shared/components/HighlightedInformation";
import currencyPrettyPrint from "../../shared/functions/currencyPrettyPrint";
import Moment from 'react-moment';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";

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
        id: "firstName",
        numeric: false,
        label: "Nom "
      },
      {
        id: "lastName",
        numeric: false,
        label: " Prenom"
      },
      {
        id: "cin",
        numeric: false,
        label: "Cin"
      },
      {
        id: "phone",
        numeric: false,
        label: "Telephone"
      },
      {
        id: "email",
        numeric: false,
        label: "email"
      },
      {
        id: "Action",
        numeric: false,
        label: "Action"
      }
  
];

const rowsPerPage = 25;

function SuperAdminTable(props) {
  const { transactions, theme, classes, openRegisterDialog } = props;
  const history = useHistory();
  const [page, setPage] = useState(0);

  const handleChangePage = useCallback(
    (_, page) => {
      setPage(page);
    },
    [setPage]
  );

  

  const openModifier = (id)=>{ 
    
        history.push({
          pathname: '/c/edit/'+id,
      }) 
     
   };
 

  const removeAgent = (id)=>{ 
    swal({
      title: "Are you sure?",
      text: "êtes-vous sûr de supprimer cet agent",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        axios.delete(`http://localhost:5000/users/delete/${id}`)
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
                  {transaction.firstName}
                  </TableCell>
                  <TableCell component="th" scope="row">
                  {transaction.lastName}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {transaction.cin}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {transaction.phone}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {transaction.email}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <div style={{display: 'flex'}}>
                      <Button onClick={()=>openModifier(transaction._id)}><EditIcon /></Button>
                      <Button onClick={()=>removeAgent(transaction._id)}><DeleteIcon /></Button>
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

SuperAdminTable.propTypes = {
  theme: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
  openRegisterDialog: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(SuperAdminTable);