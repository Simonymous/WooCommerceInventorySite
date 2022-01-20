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
import { ProductVariation } from './interfaces/ProductVariationInterface';
import { Button } from '@material-ui/core';

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

    const [variations,setVariations] = useState<ProductVariation[]>([]);

    const { api, product } = props
    // console.log(api)
    console.log("RENDER",product.id)
    //console.log(product)

    useEffect(() => {
      const getString = "/products/"+product.id+"/variations"
      api.get(getString).then((res:any)=> {
        console.log(product.id,res.data)
        let variationsTemp:ProductVariation[] = []
        res.data.forEach((variation:any)=> {
          const newProduct:ProductVariation = {
            id: variation.id,
            price: variation.price,
            name: variation.attributes[0].option,
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
                      <TableCell width={"20px"}></TableCell>
                      <TableCell>Variation</TableCell>
                      <TableCell>Anzahl</TableCell>
                      <TableCell align="right">Preis</TableCell>
                      <TableCell align="right">Link</TableCell>
                      <TableCell align="right">ID</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                   {variations.map((variation:Product) => (
                      <TableRow key={product.name+variation.name}>
                        <TableCell><Button onClick={()=>{
                              const putString = "/products/"+product.id+"/variations/"+variation.id
                              const newStockQuantityObj = {
                                stock_quantity: variation.stock-1
                              }
                              api.put(putString, newStockQuantityObj).then((res:any)=>{
                                if(res.status === 200) {
                                  alert("Gespeichert")
                                  console.log(res)
                                  const index = variations.findIndex((v1)=>{return (v1.id === variation.id)})

                                  if(index !== -1) {
                                    const newVariations = [...variations]
                                    const newProduct:ProductVariation = {
                                      id: res.data.id,
                                      price: res.data.price,
                                      name: res.data.attributes[0].option,
                                      stock: res.data.stock_quantity,
                                      permalink: res.data.permalink,
                                      category: "Shirt" //TODO Anpassen
                                    }
                                    newVariations[index] = newProduct
                                    setVariations(newVariations)
                                  }

                               } else {
                                 alert("FEHLER")
                               }

                              })
                          }}>SELL</Button></TableCell>
                        <TableCell component="th" scope="row">{variation.name}</TableCell>
                        <TableCell component="th" scope="row">{variation.stock}</TableCell>
                        <TableCell align="right">{variation.price}</TableCell>
                        <TableCell align="right"><a target="_blank" href={variation.permalink}>LINK</a></TableCell>
                        <TableCell align="right">{variation.id}</TableCell>
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