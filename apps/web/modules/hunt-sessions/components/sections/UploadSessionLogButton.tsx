import { Button, Fade, Tooltip } from "@mui/material";
import { useWatch } from "react-hook-form";

type UploadSessionLogButtonProps = {
  isHuntSession: boolean;
  onClick: () => void;
};

export function UploadSessionLogButton({ isHuntSession, onClick }: UploadSessionLogButtonProps) {
  const monsters = useWatch({ name: "monsters" });

  const isLogSessionUploaded = !!monsters.length;

  return (
    <Tooltip
      slots={{
        transition: Fade,
      }}
      slotProps={{
        transition: { timeout: 400 },
      }}
      placement="top"
      title="Upload a session log to auto-fill the form"
      arrow
      open={!(isHuntSession || isLogSessionUploaded)}
    >
      <Button disabled={isHuntSession} variant="contained" color="secondary" onClick={onClick}>
        Upload Session Log
      </Button>
    </Tooltip>
  );
}
