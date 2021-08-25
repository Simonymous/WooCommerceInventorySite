import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });


interface Product {

}

const Inventory = (props:any) => {

    const { api, products } = props
    console.log(api)
    console.log(products)

    const classes = useStyles()

    return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Preis</TableCell>
            <TableCell align="right">Link</TableCell>
            <TableCell align="right">ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product:any) => (
            <TableRow key={product.name}>
              <TableCell component="th" scope="row">{product.name}</TableCell>

              <TableCell align="right">{product.price}</TableCell>
              <TableCell align="right"><a target="_blank" href={product.permalink}>LINK</a></TableCell>
              <TableCell align="right">{product.id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )
}

export default Inventory