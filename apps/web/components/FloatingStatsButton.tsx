import InsightsIcon from "@mui/icons-material/Insights";
import { Fab } from "@mui/material";

type FloatingStatsButtonProps = {
  onClick: () => void;
  bottom?: number;
  right?: number;
};

export function FloatingStatsButton({
  onClick,
  bottom = 40,
  right = 24,
}: FloatingStatsButtonProps) {
  return (
    <Fab
      size="medium"
      onClick={onClick}
      sx={{
        position: "fixed",
        right,
        bottom,
        zIndex: 50,
        background: "linear-gradient(135deg, #3b82f6, #2563eb)",
        color: "white",
        boxShadow: "0 0 15px rgba(0,0,0,0.5)",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0 0 20px rgba(59,130,246,0.6)",
        },
        transition: "all 0.2s ease",
      }}
    >
      <InsightsIcon />
    </Fab>
  );
}
