import { Star } from "lucide-react";
import React from "react";

export interface IRepositoryCardProps {
   name: string;
   stargazers_count: number;
   description: string;
   avatar: string;
   url: string;
}

export const RepositoryCard: React.FC<IRepositoryCardProps> = ({
   name,
   url,
   description,
   avatar,
   stargazers_count,
}) => (
   <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex group"
   >
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col overflow-hidden w-full animate-fade-in">
         <div className="overflow-hidden">
            <img
               src={avatar}
               alt={name}
               className="object-cover w-full group-hover:scale-105 transition-transform duration-300"
            />
         </div>

         <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-2xl font-semibold leading-none tracking-tight line-clamp-2">
               {name}
            </h3>
            <div className="text-sm text-muted-foreground line-clamp-3">
               {description}
            </div>
         </div>

         <div className={"mt-auto flex gap-2 items-center p-6 pt-0 "}>
            <Star className="text-muted-foreground" />
            <span>{stargazers_count}</span>
         </div>
      </div>
   </a>
);
