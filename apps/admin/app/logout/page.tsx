import { redirect } from "next/navigation";
import { logoutAdmin } from "../../actions/logout-admin";

export default async function LogoutPage() {
  await logoutAdmin();

  redirect("/");
}
