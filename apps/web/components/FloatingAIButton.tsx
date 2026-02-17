import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { Fab, Tooltip } from "@mui/material";
import type { ReactNode } from "react";

type FloatingAIButtonProps = {
  onClick: () => void;
  icon?: ReactNode;
  label?: string;
  bottom?: number;
  right?: number;
};

export function FloatingAIButton({
  onClick,
  icon = <AutoAwesomeIcon />,
  label = "Analyze with AI",
  bottom = 40,
  right = 24,
}: FloatingAIButtonProps) {
  return (
    <Tooltip title={label} placement="left">
      <Fab
        size="medium"
        onClick={onClick}
        sx={{
          position: "fixed",
          right,
          bottom,
          zIndex: 50,

          background: "linear-gradient(135deg, #4285F4, #9B72CB, #D96570)",
          backgroundSize: "200% 200%",
          animation: "gradientShift 3s ease infinite",
          color: "white",
          boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
          "&:hover": {
            transform: "scale(1.1) rotate(5deg)",
            boxShadow: "0 6px 20px rgba(155,114,203,0.5)",
          },
          transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",

          "@keyframes gradientShift": {
            "0%": { backgroundPosition: "0% 50%" },
            "50%": { backgroundPosition: "100% 50%" },
            "100%": { backgroundPosition: "0% 50%" },
          },
        }}
      >
        {icon}
      </Fab>
    </Tooltip>
  );
}
