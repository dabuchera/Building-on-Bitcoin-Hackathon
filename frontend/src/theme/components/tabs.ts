import { PartsStyleFunction } from "@chakra-ui/react";

const variantCustomTabs: PartsStyleFunction = () => {
  return {
    tab: {
      borderRadius: "md",
      fontWeight: "semibold",
      color: "black",
      _selected: {
        color: `black`,
        bg: `gray.200`,
      },
      _hover: {
        color: `white`
      },
    },
    tablist: {
      borderRadius: "md",
      backgroundColor: "brand.primary",
      py: 2,
      px: 2,
      borderStyle: "solid",
      borderWidth: "2px",
      borderColor: "black",
    },
  };
};

const extendedTheme = {
  variants: {
    custom: variantCustomTabs,
  },
};

export default extendedTheme;
