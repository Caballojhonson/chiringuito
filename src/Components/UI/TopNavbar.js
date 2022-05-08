import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuSidebar from './MenuSidebar';
import MenuIcon from '@mui/icons-material/Menu';

export default function TopNavbar(props) {
	const { title, icon, iconText, onClick } = props;

	const [isOpen, setIsOpen] = useState(false);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						onClick={() => setIsOpen(true)}
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
					>
						<MenuIcon />
						{isOpen && <MenuSidebar isOpen={isOpen} setIsOpen={setIsOpen} />}
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						{title}
					</Typography>
					<IconButton
          sx={{ display: 'flex', flexDirection: 'column', mr: 2 }}
            onClick={onClick}
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
					>
						{icon}
            <Typography variant="caption" fontSize={'0.5rem'}>
							{iconText}
						</Typography>
					</IconButton>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
