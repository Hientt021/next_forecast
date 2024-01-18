export const getIconName = (params: any) => {
  const iconName = params?.icon || "";
  return iconName[0] + iconName[1];
};
