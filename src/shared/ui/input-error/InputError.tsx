interface InputErrorProps {
   error: string | null;
}

export const InputError = ({ error }: InputErrorProps) => {
   if (!error) return null;

   return <p className="text-error text-sm">{error}</p>;
};
