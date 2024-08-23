import { useContext, useState } from 'react';
import { Switch, Slider, Typography, Button, Menu, MenuItem } from '@mui/material';
import { SettingsContext } from '../context/SettingsContext';
import { styled } from '@mui/system';
import constant from '../constant';
import PropTypes from 'prop-types';

const WideMenuItem = styled(MenuItem)({
  margin: '1rem',
  width: '30rem',
  // backgroundColor: "black"
});

const Settings = ( {sx} ) => {
  const { darkMode, toggleDarkMode, fontSize, changeFontSize } = useContext(SettingsContext);

  const handleFontSizeChange = (_event, newValue) => {
    changeFontSize(newValue);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClickSettings = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClickSettings}
        sx={sx}
      >
        Settings
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <WideMenuItem>
          <Typography variant="body1" sx={{ paddingRight: '1rem' }}>
            {constant.settings.text_size}
          </Typography>
          <Slider value={fontSize} onChange={handleFontSizeChange} aria-labelledby="text-size-slider" min={10} max={25} />
        </WideMenuItem>
        <WideMenuItem>
          <Typography variant="body1" className="mr-2">
            {constant.settings.dark_mode}
          </Typography>
          <Switch checked={darkMode} onChange={toggleDarkMode} name="darkMode" color="primary" />
        </WideMenuItem>
      </Menu>
    </>
  );
};

export default Settings;

Settings.propTypes = {
  sx: PropTypes.object}