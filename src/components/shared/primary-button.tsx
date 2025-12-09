import Button, { ButtonProps } from "@mui/material/Button";

export const PrimaryButton = ({
  className = "",
  sx,
  children,
  ...props
}: ButtonProps) => {
  return (
    <Button
      variant="contained"
      color="inherit"
      sx={{
        backgroundColor: "black",
        color: "white",
        "&:hover": { backgroundColor: "#333" },
        ...sx,
      }}
      className={`font-semibold py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
