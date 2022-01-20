import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { ChangeEvent, useState } from 'react';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { Product } from './interfaces/ProductInterface';
import { useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

interface InventoryProps {
    api:WooCommerceRestApi,
    product:Product
}

const ProductInventory = (props:InventoryProps) => {

    const [variations,setVariations] = useState<Product[]>([]);

    const { api, product } = props
    // console.log(api)
    console.log("RENDER",product.id)
    //console.log(product)

    useEffect(() => {
      const getString = "/products/"+product.id+"/variations"
      api.get(getString).then((res:any)=> {
        console.log(product.id,res.data)
        let variationsTemp:Product[] = []
        res.data.forEach((variation:any)=> {
          const newProduct:Product = {
            id: variation.id,
            price: variation.price,
            name: product.name +" "+ variation.attributes[0].option,
            stock: variation.stock_quantity,
            permalink: variation.permalink,
            category: "Shirt" //TODO Anpassen
          }
          variationsTemp.push(newProduct)
        })
        setVariations(variationsTemp)
      })
      return () => {
        console.log("CLEANUP")
      }
    },[])


    const classes = useStyles()

    if(variations.length >= 0) {
      return (
        <div>
          <h3>{product.name}</h3>
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
                   {variations.map((product:Product) => (
                      <TableRow key={product.name}>
                        <TableCell component="th" scope="row">{product.name}</TableCell>
                        <TableCell component="th" scope="row">
                          <TextField type="number" value={product.stock} onChange={(event:ChangeEvent)=>{
                            console.log(event)
                          }}/>
                        </TableCell>
                        <TableCell align="right">{product.price}</TableCell>
                        <TableCell align="right"><a target="_blank" href={product.permalink}>LINK</a></TableCell>
                        <TableCell align="right">{product.id}</TableCell>
                      </TableRow>
                   ))}
                  </TableBody>
                </Table>
              </TableContainer>
        </div>
      )
    } else {
      return (
        <CircularProgress />
      )
    }

}

export default ProductInventory