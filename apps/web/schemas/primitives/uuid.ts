import { z } from "zod";

import { validationMessages } from "../validation/messages";

export const Uuid = z.string().uuid(validationMessages.string.uuid("ID"));
