import {
	Divider,
	ListItem,
	ListItemText,
	Typography,
	Avatar,
	ListItemAvatar,
} from '@mui/material';

import React from 'react';


export default function CostItem(props) {
    const { input, icon, primary, secondary, quantity } = props

    return (
        <div>
            <ListItem
                button
                secondaryAction={
                    input || (
                        <Typography sx={{ fontSize: '1.2rem' }} variant="button">
                            {quantity}
                        </Typography>
                    )
                }
            >
                <ListItemAvatar>
                    <Avatar>{icon}</Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <Typography
                            sx={{ lineHeight: 0.5, fontSize: '0.7rem', color: '#727272' }}
                            variant="overline"
                        >
                            {primary}
                        </Typography>
                    }
                    secondary={
                        <Typography variant="body1">{secondary}</Typography>
                    }
                />
            </ListItem>
            <Divider />
        </div>
    );
}
