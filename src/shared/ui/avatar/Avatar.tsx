interface AvatarProps {
   name: string;
   url?: string;
}

export const Avatar = ({ name, url }: AvatarProps) => {
   const firstLetter = name.at(0)?.toUpperCase() ?? "";

   return (
      <div className="w-12 h-12 rounded-full shrink-0 overflow-hidden">
         {url ? (
            <img src={url} alt="avatar" className="w-full h-full" />
         ) : (
            <div className="w-full h-full bg-accent flex items-center justify-center">{firstLetter}</div>
         )}
      </div>
   );
};
