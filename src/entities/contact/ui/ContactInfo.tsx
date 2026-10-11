import { Avatar } from "@/shared/ui";
import type { Contact } from "../model/types";

interface ContactCardProps {
   contact: Contact;
}

export const ContactInfo = ({ contact }: ContactCardProps) => {
   return (
      <div className="flex gap-3">
         <Avatar name={contact.name} url={contact.avatar} />
         <p>{contact.name}</p>
      </div>
   );
};
