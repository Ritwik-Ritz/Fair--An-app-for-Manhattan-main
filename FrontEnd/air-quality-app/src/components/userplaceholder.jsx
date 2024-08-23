import { styled } from "@mui/material/styles";
import { Drawer, Typography} from "@mui/material";
import navbarHeights from "./navbarheights";

export const drawerWidth = 220;

// This is a user dashboard placeholder that will be replaced
const StyledDrawer = styled(Drawer)(({ theme }) => ({
    '& .MuiDrawer-paper': {
        paddingTop: navbarHeights.xs,
        [theme.breakpoints.up('sm')]: {
            paddingTop: navbarHeights.sm,
        },
        [theme.breakpoints.up('md')]: {
            paddingTop: navbarHeights.md,
        },
        [theme.breakpoints.up('lg')]: {
            paddingTop: navbarHeights.lg,
        },
        width: drawerWidth,
        zIndex: 0,
    },
}));

function UserPlaceholder() {
    return (
        <StyledDrawer
            variant="permanent"
            anchor="left"
        >
                <Typography variant="h5">
                    First line placeholder
                </Typography>

        </StyledDrawer>
    );
}

export default UserPlaceholder;
