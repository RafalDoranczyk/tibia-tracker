import { z } from "zod";

import { validationMessages } from "../validation/messages";

export const NonEmptyString = z.string().min(1, validationMessages.string.required("Field"));
