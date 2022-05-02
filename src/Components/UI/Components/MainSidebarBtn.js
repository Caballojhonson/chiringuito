import { Box, IconButton, Typography } from '@mui/material';
import React from 'react';

export default function MainSidebarBtn(props) {
	const { mainIcon, title, path, subMenu, closeFn } = props;

    function handleClick() {
        path && navigate()
        subMenu && subMenu()
		closeFn && closeFn()
    }

    function navigate() {
        window.location.href = path
    }

	const containerStyle = {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		height: '2rem',
		width: '2rem',
        fontSize: '3rem',
        padding: '2rem',
        color: '#212331'
	};

	const fontStyle = {
		fontSize: '10px',
		fontWeight: '500',
	};

	return (
		<IconButton onClick={handleClick}>
			<Box sx={containerStyle}>
				{mainIcon}
				<Typography sx={fontStyle}>{title}</Typography>
			</Box>
		</IconButton>
	);
}
