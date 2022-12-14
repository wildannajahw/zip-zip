import { Alert, Container, Grid } from '@mui/material';
import Page from '../components/Page';
import Navbar from '../sections/product-list/Navbar';
import ProductCard from '../sections/product-list/ProductCard';
import ProductCardLoader from '../sections/product-list/ProductCardLoader';
import Pagination from '../components/datatable/Pagination';
import Footer from '../sections/product-list/Footer';
import useTable from '../hooks/useTable';
import Filter from '../sections/product-list/Filter';
import { useSelector } from '../redux/store';
import uuidv4 from '../utils/uuidv4';

export default function Product() {
  const { products, isLoading, error } = useSelector((state) => state.product);
  const { page, rowsPerPage, onChangePage } = useTable();
  return (
    <Page title="Products">
      <Navbar />
      <Container>
        {/* <Stack py="2rem" direction="row"> */}
        <Grid container spacing={2} p="2rem">
          <Grid item xs={12} md={3}>
            <Filter />
          </Grid>
          <Grid item xs={12} md={9}>
            {!!error && (
              <Alert severity="error" sx={{ marginBottom: '1rem' }}>
                {error.toString()}
              </Alert>
            )}
            <Grid container spacing={2}>
              {!isLoading
                ? products
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((product) => {
                      const [image, price, name, link, source] = product;
                      return (
                        <ProductCard
                          key={link}
                          image={image}
                          price={price}
                          name={name}
                          link={link}
                          source={source}
                        />
                      );
                    })
                : [...Array(9)].map(() => <ProductCardLoader key={uuidv4()} />)}
            </Grid>
          </Grid>
        </Grid>
        {products.length > 0 && (
          <Pagination
            onChangePage={onChangePage}
            count={products.length / 10}
          />
        )}

        <br />
      </Container>
      <Footer />
    </Page>
  );
}
