// this composable provides utility functions for formatting data within the application.
import { Person } from "../services/contactService";

export const useFormatters = () => {
  const formattedAddress = (contact: Person): string => {
    return `${contact.country}, ${contact.city}, ${contact.streetAddress}, ${contact.houseNumber}, zip: ${contact.zip}`;
  };

  return {
    formattedAddress,
  };
};
