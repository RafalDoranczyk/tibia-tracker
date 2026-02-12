import { ErrorPage } from "@/layout/page";

export default function AuthCodeErrorPage() {
  return (
    <ErrorPage
      description="Something went wrong during login. The authorization code is invalid or has expired."
      title="Login failed"
    />
  );
}
