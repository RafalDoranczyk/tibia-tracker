"use client";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { alpha, Button, type ButtonProps, keyframes, styled } from "@mui/material";

const glassShimmer = keyframes`
  0% { transform: translateX(-150%) skewX(-25deg); }
  20%, 100% { transform: translateX(250%) skewX(-25deg); }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 ${alpha("#4caf50", 0.4)}; }
  70% { box-shadow: 0 0 0 8px ${alpha("#4caf50", 0)}; }
  100% { box-shadow: 0 0 0 0 ${alpha("#4caf50", 0)}; }
`;

interface StyledButtonProps extends ButtonProps {
  isSuccess?: boolean;
}

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "isSuccess",
})<StyledButtonProps>(({ theme: { palette }, isSuccess }) => {
  const mainColor = isSuccess ? palette.success.main : palette.secondary.main;
  const lightColor = isSuccess ? palette.success.light : palette.secondary.light;

  return {
    backgroundColor: alpha(mainColor, 0.08),
    color: isSuccess ? lightColor : mainColor,
    border: `1.5px solid ${alpha(mainColor, 0.5)}`,
    borderRadius: "8px",
    padding: "6px 16px",
    position: "relative",
    overflow: "hidden",
    transition: "all 0.3s ease",
    fontWeight: 700,
    textTransform: "none",

    "&::before": !isSuccess
      ? {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "40%",
          height: "100%",
          background: `linear-gradient(to right, transparent, ${alpha("#fff", 0.3)}, transparent)`,
          animation: `${glassShimmer} 4s infinite linear`,
          pointerEvents: "none",
        }
      : {},

    animation: isSuccess ? `${pulse} 2s infinite` : "none",

    "&:hover": {
      backgroundColor: alpha(mainColor, 0.12),
      borderColor: mainColor,
      transform: "translateY(-1px)",
      boxShadow: `0 4px 12px ${alpha(mainColor, 0.3)}`,
    },

    "&:active": {
      transform: "translateY(0)",
    },

    "& .MuiButton-startIcon": {
      transition: "transform 0.2s ease",
      color: mainColor,
    },

    "&:hover .MuiButton-startIcon": {
      transform: isSuccess ? "scale(1.1)" : "translateY(-2px)",
    },
  };
});

export function UploadLogButton({ isSuccess, children, ...props }: StyledButtonProps) {
  return (
    <StyledButton
      isSuccess={isSuccess}
      variant="outlined"
      startIcon={isSuccess ? <CheckCircleIcon /> : <FileUploadIcon />}
      {...props}
    >
      {children || (isSuccess ? "Analyser Data Loaded" : "Upload Log")}
    </StyledButton>
  );
}
