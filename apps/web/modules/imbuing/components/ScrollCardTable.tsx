import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Image from "next/image";
import type { ImbuingScrollItem } from "../types";
import { ScrollCardPriceInput } from "./ScrollCardPriceInput";

type ScrollCardTableProps = {
  items: ImbuingScrollItem[];
};

export function ScrollCardTable({ items }: ScrollCardTableProps) {
  return (
    <TableContainer
      component={Paper}
      sx={{ borderRadius: 1, backgroundColor: "transparent", height: "100%" }}
    >
      <Table size="small" sx={{ height: "100%" }}>
        <TableHead sx={{ backgroundColor: "rgba(255, 255, 255, 0.02)" }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 700, py: 1.5 }}>Material</TableCell>
            <TableCell align="right" sx={{ fontWeight: 700 }}>
              Qty
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 700, width: 140 }}>
              Unit Price
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {items.map(({ key, name, quantity, imageUrl }) => (
            <TableRow
              hover
              key={key}
              sx={{ "&:nth-of-type(even)": { backgroundColor: "rgba(255, 255, 255, 0.01)" } }}
            >
              <TableCell sx={{ py: 1 }}>
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <Image
                    src={imageUrl}
                    alt={name}
                    width={28}
                    height={28}
                    style={{ flexShrink: 0 }}
                  />
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {name}
                  </Typography>
                </Stack>
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 500 }}>
                {quantity}
              </TableCell>
              <TableCell align="right">
                <ScrollCardPriceInput inputKey={key} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
