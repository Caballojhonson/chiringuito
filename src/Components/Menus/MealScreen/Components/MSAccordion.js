import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function MSAccordion(props) {
	const { title, content } = props;
	return (
		<div>
			<Accordion defaultExpanded={true}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					<Typography>{title}</Typography>
				</AccordionSummary>
				<AccordionDetails>{content}</AccordionDetails>
			</Accordion>
		</div>
	);
}
