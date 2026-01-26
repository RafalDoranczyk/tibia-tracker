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

import type { ScrollItem } from "../types";
import { ImbuingScrollCardPriceInput } from "./ImbuingScrollCardPriceInput";

type ImbuingScrollCardItemsProps = {
  items: ScrollItem[];
};

export function ImbuingScrollCardItems({ items }: ImbuingScrollCardItemsProps) {
  return (
    <Paper variant="outlined" sx={{ width: "100%", height: "100%" }}>
      <TableContainer sx={{ height: "100%", display: "flex" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Item</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>
                Qty
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>
                Price
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {items.map(({ key, name, quantity, imageUrl }) => {
              return (
                <TableRow hover key={key}>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Image
                        src={imageUrl}
                        alt={name}
                        width={36}
                        height={36}
                        style={{ flexShrink: 0 }}
                      />
                      <Typography variant="body2">{name}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="right">{quantity}</TableCell>
                  <TableCell align="right" width={130}>
                    <ImbuingScrollCardPriceInput label="Price (each)" inputKey={key} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
