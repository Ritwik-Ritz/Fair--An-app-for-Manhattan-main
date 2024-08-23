import  {drawerWidth} from "./userplaceholder";
import { styled } from "@mui/system";

// pushes content from the imagined user dashboard on the left
const UserContent = styled('div') (() => ({
    paddingLeft: `calc(${drawerWidth}px)`,
}))

export default UserContent;
