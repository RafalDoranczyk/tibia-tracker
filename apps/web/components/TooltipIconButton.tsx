import AddCircle from "@mui/icons-material/AddCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Delete from "@mui/icons-material/Delete";
import Download from "@mui/icons-material/Download";
import Edit from "@mui/icons-material/Edit";
import EditOff from "@mui/icons-material/EditOff";
import ExitToApp from "@mui/icons-material/ExitToApp";
import Lock from "@mui/icons-material/Lock";
import MoreVert from "@mui/icons-material/MoreVert";
import Save from "@mui/icons-material/Save";
import Settings from "@mui/icons-material/Settings";
import { IconButton, type IconButtonProps, Tooltip } from "@mui/material";
import { cloneElement, type ReactElement } from "react";

type TooltipButtonType =
  | "create"
  | "delete"
  | "download"
  | "edit"
  | "edit-off"
  | "lock"
  | "logout"
  | "menu"
  | "save"
  | "settings"
  | "activate";

type TooltipIconButtonProps = IconButtonProps & {
  variant: TooltipButtonType;
};

const IconsMap: Record<
  TooltipButtonType,
  {
    color?: IconButtonProps["color"];
    icon: ReactElement;
    name: string;
  }
> = {
  create: { icon: <AddCircle />, name: "Create" },
  delete: { icon: <Delete />, name: "Delete" },
  download: { icon: <Download />, name: "Download" },
  edit: { icon: <Edit />, name: "Edit" },
  "edit-off": { icon: <EditOff />, name: "Edit off" },
  lock: { color: "warning", icon: <Lock />, name: "Lock" },
  logout: { icon: <ExitToApp />, name: "Logout" },
  menu: { icon: <MoreVert />, name: "Menu" },
  save: { icon: <Save />, name: "Save" },
  settings: { icon: <Settings />, name: "Settings" },
  activate: { icon: <CheckCircleIcon />, name: "Activate" },
};

export function TooltipIconButton({ disabled, size, variant, ...props }: TooltipIconButtonProps) {
  const { color = "default", icon, name } = IconsMap[variant];

  const Icon = cloneElement(icon, { fontSize: size } as { fontSize: IconButtonProps["size"] });

  const button = (
    <IconButton color={color} disabled={disabled} {...props}>
      {Icon}
    </IconButton>
  );

  return disabled ? button : <Tooltip title={props.name || name}>{button}</Tooltip>;
}
