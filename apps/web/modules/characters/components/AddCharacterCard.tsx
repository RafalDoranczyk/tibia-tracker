"use client";

import CloseIcon from "@mui/icons-material/Close";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PublicIcon from "@mui/icons-material/Public";
import SearchIcon from "@mui/icons-material/Search";
import {
  Alert,
  Box,
  Button,
  Card,
  Collapse,
  Divider,
  IconButton,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { createCharacter } from "../actions/create-character";
import { MIN_CHARACTER_NAME_LENGTH } from "../constants";
import { useCharacterSearch } from "../hooks/useCharacterSearch";
import { mapDataCharToDb } from "../mappers/mapDataCharToDb";

export function AddCharacterCard({ onCancel }: { onCancel: () => void }) {
  const { searchName, setSearchName, foundCharacter, isSearching, error, search, setError } =
    useCharacterSearch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAdd = async () => {
    if (!foundCharacter) return;
    setIsSubmitting(true);
    try {
      const charData = mapDataCharToDb(foundCharacter.character);
      await createCharacter(charData);
      onCancel();
    } catch {
      setError("Failed to save character");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isSearchDisabled =
    searchName.length < MIN_CHARACTER_NAME_LENGTH || isSearching || isSubmitting;

  return (
    <Card
      variant="outlined"
      sx={{
        p: 2.5,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderColor: "secondary.main",
        boxShadow: (theme) => `0 0 20px ${theme.palette.secondary.main}10`,
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="subtitle1" fontWeight={800} color="secondary.main">
          New Character
        </Typography>
        <IconButton size="small" onClick={onCancel} disabled={isSubmitting}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Stack>

      <Stack spacing={2} flexGrow={1}>
        <form onSubmit={search}>
          <Stack spacing={1.5}>
            <TextField
              fullWidth
              size="small"
              label="Character Name"
              placeholder="e.g. Bubble"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              disabled={isSubmitting || isSearching}
              autoFocus
            />

            <Button
              fullWidth
              variant="contained"
              color="secondary"
              type="submit"
              size="small"
              disabled={isSearchDisabled}
              startIcon={<SearchIcon />}
            >
              {isSearching ? "Searching..." : "Search Character"}
            </Button>
          </Stack>
        </form>

        <Box sx={{ height: 4, mt: 1 }}>
          <Collapse in={isSearching}>
            <LinearProgress color="secondary" sx={{ borderRadius: 1 }} />
          </Collapse>
        </Box>

        {error && (
          <Alert severity="error" sx={{ py: 0, "& .MuiAlert-message": { fontSize: "0.75rem" } }}>
            {error}
          </Alert>
        )}

        <Collapse in={!!foundCharacter}>
          {foundCharacter && (
            <Box
              sx={{
                mt: 2,
                p: 2,
                borderRadius: 2,
                bgcolor: "rgba(255,255,255,0.03)",
                border: "1px solid",
                borderColor: "divider",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Dekoracyjny pasek statusu konta */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  px: 1.5,
                  py: 0.5,
                  borderBottomLeftRadius: 8,
                  bgcolor:
                    foundCharacter.character.account_status === "Premium Account"
                      ? "warning.main"
                      : "grey.700",
                  color: "common.black",
                  fontSize: "0.65rem",
                  fontWeight: 900,
                  textTransform: "uppercase",
                }}
              >
                {foundCharacter.character.account_status === "Premium Account"
                  ? "Premium Account"
                  : "Free Account"}
              </Box>

              <Typography variant="h6" fontWeight={800} sx={{ pr: 6 }}>
                {foundCharacter.character.name}
              </Typography>

              <Typography
                variant="caption"
                color="secondary.light"
                fontWeight={700}
                sx={{ display: "block", mb: 1.5 }}
              >
                {foundCharacter.character.vocation}
              </Typography>

              <Divider sx={{ mb: 1.5, opacity: 0.1 }} />

              <Stack spacing={1}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="caption" color="text.secondary">
                    Level
                  </Typography>
                  <Typography variant="caption" fontWeight={700}>
                    {foundCharacter.character.level}
                  </Typography>
                </Stack>

                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="caption" color="text.secondary">
                    World
                  </Typography>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <PublicIcon sx={{ fontSize: 12, color: "text.disabled" }} />
                    <Typography variant="caption" fontWeight={700}>
                      {foundCharacter.character.world}
                    </Typography>
                  </Stack>
                </Stack>

                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="caption" color="text.secondary">
                    Residence
                  </Typography>
                  <Typography variant="caption">{foundCharacter.character.residence}</Typography>
                </Stack>

                {foundCharacter.character.achievement_points > 0 && (
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="caption" color="text.secondary">
                      Achievement Points
                    </Typography>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <MilitaryTechIcon sx={{ fontSize: 12, color: "warning.light" }} />
                      <Typography variant="caption">
                        {foundCharacter.character.achievement_points}
                      </Typography>
                    </Stack>
                  </Stack>
                )}
              </Stack>

              <Button
                fullWidth
                variant="contained"
                color="success"
                size="medium"
                sx={{ mt: 2.5, fontWeight: 700 }}
                onClick={handleAdd}
                loading={isSubmitting}
                startIcon={<PersonAddIcon />}
              >
                Confirm & Add
              </Button>
            </Box>
          )}
        </Collapse>

        {!(foundCharacter || isSearching || error) && (
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: 0.4,
              px: 2,
            }}
          >
            <Typography variant="caption" textAlign="center">
              Search results will appear here after clicking the button.
            </Typography>
          </Box>
        )}
      </Stack>
    </Card>
  );
}
