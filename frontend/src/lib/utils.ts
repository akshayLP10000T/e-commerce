import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const readFileAsDataUrl = async (file: any)=>{
  return new Promise((resolve)=>{
      const reader = new FileReader();
      reader.onload = ()=>{
          if(typeof reader.result === 'string') resolve(reader.result);
      }
      reader.readAsDataURL(file);
  });
};
