import { auth } from "@/auth";
import { CommandCenter } from "@/components/command-center";

export default async function Page() {
  const session = await auth();
  return <CommandCenter userName={session?.user?.name ?? "Authorized user"} />;
}
