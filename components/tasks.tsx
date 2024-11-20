import { SetStateAction } from "react";
import Input from "./Input";

interface Props {
   classroom: string;
   teacher: boolean;
   notes: string[];
   setNote: React.Dispatch<SetStateAction<string>>;
}

export default function Tasks({ classroom = '', teacher, notes = [], setNote }: Props) {
   return (
      <div className="w-full">
         <div className="w-full max-w-xl mx-auto">
            <div className="w-full mb-8">
               <h1 className="text-3xl xl:text-4xl font-bold text-center">Tasks for class #{classroom}</h1>
            </div>
            {teacher && 
               <Input
                  className="mb-4" 
                  id="note" 
                  name="note" 
                  label="Add a note" 
                  placeholder="Some note..." 
                  setValue={setNote}
               />
            }
            <div className="w-full">
               {notes.length ? 
                  notes.map((note, index) => (
                     <div key={index} className="bg-white/40 dark:bg-black/40 rounded-xl shadow-xl p-4 px-6 mb-4">
                        <h6 className="opacity-80">Note #{index+1}</h6>
                        <p>
                           {note}
                        </p>
                     </div>
                  )) :
                  <p className="w-full text-center">
                     No notes added
                  </p>
               }
            </div>
         </div>
      </div>
   );
}
