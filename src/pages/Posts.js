import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Outlet, useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Container,
  Typography,
  Box
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import KeyboardBackspaceTwoToneIcon from '@mui/icons-material/KeyboardBackspaceTwoTone';
import { getPosts } from '../store/posts/postsSlice';

const Posts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const{ posts, isLoading } = useSelector(state => state.posts);

  useEffect(() => {
    dispatch(getPosts(id))
    
  }, [dispatch, id]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my:5 }}>
        <CircularProgress />
      </Box>
    )
  };

  return (posts &&
    <>
      <Container maxWidth="xl">
        <Button 
        sx={{ mt:2, fontSize: 18 }}
        size="large"
        variant="text" 
        startIcon={<KeyboardBackspaceTwoToneIcon />} 
        onClick={() => navigate(-1)} 
        >
          Back
        </Button>
        <Typography variant="h3" component="h2" align='center'>
          Posts
        </Typography>
        <TableContainer sx={{ mt:2 }} component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: 18, fontWeight: 600, textAlign: 'center' }}>#</TableCell>
                <TableCell sx={{ fontSize: 18, fontWeight: 600, textAlign: 'center' }}>Title posts</TableCell>
                <TableCell sx={{ fontSize: 18, fontWeight: 600, textAlign: 'center' }} align="right">Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts && posts.map(({ id, title, body }, index) => (
                <TableRow
                  key={id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell>{title}</TableCell>
                  <TableCell>{body}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Outlet />
    </> 
  )
};

export default Posts;