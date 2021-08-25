import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useState } from 'react';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { Product } from './ProductInterface';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

interface InventoryProps {
    api:WooCommerceRestApi,
    products:Product[]
}

interface ProductVariation extends Product {
    stock_quantity: number
}

const Inventory = (props:InventoryProps) => {
    const [variations,setVariations] = useState<ProductVariation[]>([]);

    const { api, products } = props
    // console.log(api)
    console.log(products)

    const classes = useStyles()


    const getVariations = (product_id:number,variation_id:number) => {
      const getString = "products/"+product_id+"/variations/"+variation_id
      api.get(getString).then((res:any)=> {
        const { data } = res
        console.log(data)
      })
    }

    products.forEach((product) => {
      product.variations.forEach((variation_id:number) => {
        getVariations(product.id,variation_id)
      })

    })


    return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Anzahl</TableCell>
            <TableCell align="right">Preis</TableCell>
            <TableCell align="right">Link</TableCell>
            <TableCell align="right">ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product:Product) => (
            <TableRow key={product.name}>
              <TableCell component="th" scope="row">{product.name}</TableCell>
              <TableCell component="th" scope="row">?</TableCell>
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