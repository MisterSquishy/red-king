import { IconButton, useColorMode } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

const DarkModeSwitcher = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      position="absolute"
      variant="ghost"
      right="5"
      top="0"
      mt="5"
      icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
      onClick={toggleColorMode}
      aria-label="Switch to dark / light mode"
    />
  );
};

export default DarkModeSwitcher;
