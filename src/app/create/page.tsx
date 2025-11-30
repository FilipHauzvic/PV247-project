import CreateQuizForm from "@/src/module/quiz/create-form";
import { Box } from "@mui/material";

const Page = () => (
  <Box sx={{ height: "calc(100vh - 70px)", overflow: "hidden" }}>
    <CreateQuizForm />
  </Box>
);

export default Page;
