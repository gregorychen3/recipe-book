import { Typography, TypographyProps } from "@mui/material";
import Box from "@mui/material/Box";

interface Props {
  text: string;
  icon: React.ReactNode;
  iconPosition: "before" | "after";
}
export default function IconWithText(props: Props & TypographyProps) {
  const { text, icon, iconPosition, ...typographyProps } = props;

  return (
    <Box display="flex" alignItems="center">
      {iconPosition === "before" ? (
        <>
          {icon}
          <Typography {...typographyProps} sx={{ ml: 1 }}>
            {text}
          </Typography>
        </>
      ) : (
        <>
          <Typography {...typographyProps} sx={{ mr: 1 }}>
            {text}
          </Typography>
          {icon}
        </>
      )}
    </Box>
  );
}
