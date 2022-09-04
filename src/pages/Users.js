import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  Container,
  Typography,
  Box
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { getUsers } from '../store/users/usersSlice';
import Albums from '../components/Albums';

const Users = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users, isLoading } = useSelector((state) => state.users);

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState( null );
  
  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch]);
  
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my:5 }}>
        <CircularProgress />
      </Box>
    )
  };

  const handleDetail = (id) => () => {
    navigate(`/users/${id}/posts`)
  };

  const handleAlbums = (id) => () => {
    setDialogOpen(true);
    setSelectedId(id)
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedId(null);
  };

  return (
    <>
      <Container maxWidth="xl">
        <Typography sx={{ mt:2 }} variant="h3" component="h1" align='center'>
          Users
        </Typography>
        <TableContainer sx={{ mt:3 }} component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead >
              <TableRow>
                <TableCell sx={{ fontSize: 18, fontWeight: 600 }}>#</TableCell>
                <TableCell sx={{ fontSize: 18, fontWeight: 600 }}>Name users</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users && users.map(({ id, name }, index) => (
                <TableRow
                  key={id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell>{name}</TableCell>
                  <TableCell align="right">
                      <Button variant="outlined" size="large" onClick={handleDetail(id)} >
                        Posts
                      </Button>
                      <Button sx={{ ml:5 }} variant="outlined" size="large" onClick={handleAlbums(id)} >
                        Albums
                      </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={isDialogOpen} onClose={handleDialogClose}>
          <DialogTitle sx={{ fontWeight:700, textAlign:"center" }}>Albums</DialogTitle>
            <Albums id={selectedId} />
        </Dialog>
      </Container>
      <Outlet />
    </>
  );
};

export default Users;


