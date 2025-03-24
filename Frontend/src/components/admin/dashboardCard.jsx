import { Box, Card, CardContent, Typography } from "@mui/material";
import PropType from "prop-types";

export default function DashboardCard(props) {
  const { title, value, icon } = props;
  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center">
          {icon}
          <Box ml={2}>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="h4">{value}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

DashboardCard.propTypes = {
  title: PropType.string,
  value: PropType.string,
  icon: PropType.node,
};
