export const useFormatters = () => {
  const formattedAddress = (contact: any) => {
    return `${contact.country}, ${contact.city}, ${contact.streetAddress}, ${contact.houseNumber}, zip: ${contact.zip}`;
  };

  return {
    formattedAddress,
  };
};
