import { auth } from "@/src/auth";
import CreateQuizForm from "@/src/module/quiz/create-form";
import { Box } from "@mui/material";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Page = async () => {
  const sessionPromise = auth.api.getSession({ headers: await headers() });
  const session = await sessionPromise;

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <Box sx={{ height: "calc(100vh - 70px)", overflow: "hidden" }}>
      <CreateQuizForm />
    </Box>
  );
};

export default Page;
