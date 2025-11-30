import { auth } from "@/src/auth";
import CreateQuizForm from "@/src/module/quiz/create-form";
import { Box } from "@mui/material";
<<<<<<< HEAD
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Metadata } from "next";
=======
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Create new quiz",
};
>>>>>>> 378fc41 (feat: add custom title metadata for different pages)

export const metadata: Metadata = {
	title: "Create new quiz",
};

const Page = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

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
