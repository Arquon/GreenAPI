import { BaseInput } from "@/shared/ui/input/BaseInput";

interface SearchChatInputProps {
   value: string;
   onChange: (value: string) => void;
}

export const SearchChatInput = ({ value, onChange }: SearchChatInputProps) => {
   return (
      <div className="px-4 py-2">
         <BaseInput value={value} onChange={onChange} placeholder="Найти" />
      </div>
   );
};
