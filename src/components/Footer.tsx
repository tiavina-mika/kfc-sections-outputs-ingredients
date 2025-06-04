import { Container, Typography, Link, Box } from '@mui/material';

const linkOptions = [
  {
    label: 'Site Web',
    url: 'https://tiavina-michael-ralainirina.onrender.com/',
  },
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/tiavina-michael-ralainirina',
  },
  {
    label: 'Youtube',
    url: 'https://www.youtube.com/@tiavina-mika',
  },
  {
    label: 'Email',
    url: 'mailto:tiavinamika@gmail.com',
  }
];

const Footer = () => {
  return (
    <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: '#000', color: 'white' }}>
      <Container maxWidth="lg">
        <Typography variant="body1">
          {linkOptions.map((link, index) => (
            <span key={index}>
              <Link href={link.url} color="inherit" sx={{ mr: 2 }}>
                {link.label}
              </Link>
            </span>
          ))}
        </Typography>
        <Typography variant="body2" color="inherit" align="center" sx={{ mt: 1 }}>
          {'© '}
          {new Date().getFullYear()}
          {' Mika. All rights reserved.'}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;