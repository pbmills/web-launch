import React from "react";

interface Props {
   className?: string,
   id: string,
   name: string,
   label: string,
   type?: string,
   placeholder?: string,
   setValue: (value: string) => void;
}

export default function Input({ className = '', id, name, label, type = 'text', placeholder = '', setValue }: Props) {
   
   const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      const inputElement = document.getElementById(id) as HTMLInputElement;
      if (inputElement) {
         setValue(inputElement.value);
         inputElement.value = '';
      }
   };

   return (
      <form onSubmit={handleSubmit} className={`w-full bg-white/40 dark:bg-black/40 rounded-xl pt-4 p-6 shadow-xl ${className}`}>
         {label &&
            <label htmlFor={id} className="block mb-2">
               {label}
            </label>
         }
         <div className="flex gap-2 items-center">
            <input
               type={type}
               name={name}
               id={id}
               placeholder={placeholder}
               className="appearance-none bg-white text-black rounded-md py-3 px-4 w-full block flex-1 min-w-0 shadow-inner"
            />
            <button
               type="submit"
               className="size-12 rounded-md bg-purple-400 hover:bg-purple-500 transition-colors duration-300 group grid place-items-center text-white"
               aria-label="Submit"
            >
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 group-hover:translate-x-0.5 transition-transform duration-300"
                  >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                  />
               </svg>
            </button>
         </div>
      </form>
   );
};
