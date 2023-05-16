export const convertDropdownKeys = (
  arr: Array<{ id: string | number; name: string }> | null
) => {
  return (
    arr &&
    arr?.map((e) => ({
      label: e.name,
      value: e.id,
    }))
  );
};
