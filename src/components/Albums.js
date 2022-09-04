import PropTypes from 'prop-types';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Box
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { getAlbums } from "../store/albums/albumsSlice";

const Albums = ( selectedId ) => {
  const dispatch = useDispatch();
  const { id } = selectedId;
  const{ albums, isLoading } = useSelector(state => state.albums);

  useEffect(() => {
    dispatch(getAlbums(id))
  }, [dispatch,id]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my:5 }}>
        <CircularProgress />
      </Box>
    )
  };

  return (albums &&
    <>
      <Container maxWidth="xl">
        <TableContainer sx={{ my:3 }} component={Paper}>
        <Table sx={{ minWidth: 320 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: 18, fontWeight: 600 }}>#</TableCell>
              <TableCell sx={{ fontSize: 18, fontWeight: 600 }}>Title albums</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {albums && albums.map(({ id, title }, index) => (
              <TableRow
                key={id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell>{title}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Container>
    </>
  )
};

Albums.propTypes = {
  selectedId: PropTypes.object.isRequired,
}

export default Albums;