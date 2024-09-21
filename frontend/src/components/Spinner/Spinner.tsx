import { Box, CircularProgress } from '@mui/material';

const Spinner = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="80vh"
    >
      <CircularProgress />
    </Box>
  );
};

export default Spinner;
