import {
  Box,
  Typography,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import Translate from '../../common/translate/Translate';
import StaticPagesHeader from '../../modules/StaticPages/StaticPagesHeader';
import StaticPagesNav from '../../modules/StaticPages/StaticPagesNav';

const Contact = () => {
  return (
    <Box>
      <StaticPagesHeader />
      <StaticPagesNav title="Contact" />
      <Grid container direction={'column'} spacing={10} padding={'50px'}>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{ fontWeight: 500, fontSize: '16px', color: '#000' }}
        >
          <TextField
            placeholder="First Name"
            fullWidth
            sx={{
              background: 'white',
              borderRadius: 5,
              border: '2px solid black',
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} textAlign={'center'}>
          <TextField
            placeholder="Last name"
            fullWidth
            sx={{
              background: 'white',
              borderRadius: 5,
              border: '2px solid black',
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} textAlign={'center'}>
          <TextField
            placeholder="Email"
            fullWidth
            sx={{
              background: 'white',
              borderRadius: 5,
              border: '2px solid black',
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} textAlign={'center'}>
          <TextField
            fullWidth
            multiline
            maxRows={4}
            sx={{
              background: 'white',
              borderRadius: 5,
              border: '2px solid black',
            }}
            InputProps={{
              style: {
                height: 200,
              },
            }}
            placeholder="Message"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box
            width={350}
            height={100}
            sx={{ background: 'white', borderRadius: 5 }}
            justifyContent={'center'}
            alignItems={'center'}
            display={'flex'}
          >
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="I'm not a robot"
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box
            width={500}
            height={100}
            sx={{ background: 'white', borderRadius: 5 }}
            justifyContent={'center'}
            alignItems={'center'}
            display={'flex'}
          >
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Agree with privacy policy to receive communiactions "
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Contact;
