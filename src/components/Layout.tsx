import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <List>
      <ListItem button component={RouterLink} to="/" onClick={handleDrawerToggle}>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button component={RouterLink} to="/practice-exams" onClick={handleDrawerToggle}>
        <ListItemText primary="Practice Exams" />
      </ListItem>
      <ListItem button component={RouterLink} to="/flashcards" onClick={handleDrawerToggle}>
        <ListItemText primary="Flashcards" />
      </ListItem>
      <ListItem button component={RouterLink} to="/study-topics" onClick={handleDrawerToggle}>
        <ListItemText primary="Study Topics" />
      </ListItem>
    </List>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Certification Study Platform
          </Typography>
          {!isMobile && (
            <>
              <Button color="inherit" component={RouterLink} to="/">
                Home
              </Button>
              <Button color="inherit" component={RouterLink} to="/practice-exams">
                Practice Exams
              </Button>
              <Button color="inherit" component={RouterLink} to="/flashcards">
                Flashcards
              </Button>
              <Button color="inherit" component={RouterLink} to="/study-topics">
                Study Topics
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        {drawer}
      </Drawer>
      <Container component="main" sx={{ flex: 1, py: 4 }}>
        {children}
      </Container>
      <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: 'background.paper' }}>
        <Container maxWidth="sm">
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} Certification Study Platform
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout; 