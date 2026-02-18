"use client";

import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { Button, type ButtonProps, keyframes, styled } from "@mui/material";

const shimmer = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const pulseGlow = keyframes`
  0% { box-shadow: 0 0 5px rgba(124, 58, 237, 0.4), 0 0 0 0 rgba(124, 58, 237, 0.4); }
  70% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.6), 0 0 0 12px rgba(139, 92, 246, 0); }
  100% { box-shadow: 0 0 5px rgba(124, 58, 237, 0.4), 0 0 0 0 rgba(124, 58, 237, 0); }
`;

const StyledAIButton = styled(Button)(({ theme: { palette } }) => ({
  background: `linear-gradient(-45deg, ${palette.secondary.main}, ${palette.primary.light}, ${palette.secondary.dark}, ${palette.primary.main})`,
  backgroundSize: "300% 300%",
  animation: `${shimmer} 5s ease infinite, ${pulseGlow} 2s infinite`,
  color: "#fff",
  fontWeight: 700,
  letterSpacing: "0.5px",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  padding: "10px 24px",
  transition: "all 0.3s ease-in-out",

  "&:hover": {
    transform: "translateY(-2px) scale(1.02)",
    backgroundSize: "150% 150%",
    boxShadow: `0 8px 25px ${palette.secondary.main}`,
  },

  "&:active": {
    transform: "translateY(0) scale(0.98)",
  },

  "& .MuiButton-startIcon": {
    animation: "spin 3s linear infinite",
    "@keyframes spin": {
      "0%": { transform: "rotate(0deg) scale(1)" },
      "50%": { transform: "rotate(180deg) scale(1.2)" },
      "100%": { transform: "rotate(360deg) scale(1)" },
    },
  },
}));

interface AIActionButtonProps extends ButtonProps {
  loading?: boolean;
}

export function AIActionButton({ children, ...props }: AIActionButtonProps) {
  return (
    <StyledAIButton variant="contained" startIcon={<AutoAwesomeIcon />} {...props}>
      {children || "Scan with AI"}
    </StyledAIButton>
  );
}
