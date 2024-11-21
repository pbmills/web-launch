"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

export default function Home() {
  const { user } = useUser();

  const [role, setRole] = useState<string>("");
  const [classcode, setClasscode] = useState<string>("");
  const [enterClass, setEnterClass] = useState<boolean>(false);
  const [notes, setNotes] = useState<string[]>([]);

  const data = useQuery(api.data.get);
  const classrooms = data ? data.map((d) => d.classroom) : [];

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const input = document.querySelector("#classCode") as HTMLInputElement;
    if (classrooms.includes(input.value)) {
      setClasscode(input.value);
      data?.forEach((d) => {
        if (d.classroom === input.value) {
          setNotes(d.notes);
        }
      });
      input.value = "";
      setEnterClass(true);
    }
  }

  useEffect(() => {
    setRole((user?.publicMetadata.role as string) || "member");
  }, [user]);

  return (
    <div className="py-20 px-6 max-w-xl mx-auto">
      {data?.map(({ _id, d }) => <div key={_id}>{d?.classroom}</div>)}
      {data?.length ? (
        <>
          <div
            className={`w-full transition-all duration-300 ${enterClass ? "opacity-0 pointer-events-none max-h-0" : "max-h-32"}`}
          >
            <div className="w-full mb-8">
              <h1 className="text-3xl xl:text-4xl font-bold text-center">
                Enter your Class Code
              </h1>
            </div>
            <form
              onSubmit={handleSubmit}
              className={`w-full bg-white/40 dark:bg-black/40 rounded-xl shadow-xl pt-4 p-6`}
            >
              <label htmlFor="classCode" className="block mb-2">
                Class Code
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  name="classCode"
                  id="classCode"
                  placeholder="ABC123"
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
          </div>
          <div
            className={`w-full transition-all duration-700 ${enterClass ? "" : "translate-y-12 opacity-0 pointer-events-none"}`}
          >
            <div className="w-full mb-4">
              {/* Title */}
              <div className="w-full mb-8">
                <h1 className="text-3xl xl:text-4xl font-bold text-center">
                  Tasks for class #{classcode}
                </h1>
              </div>
              {/* Add Note */}
              {role === "admin" && (
                <div className="w-full bg-white/40 dark:bg-black/40 rounded-xl pt-4 p-6 shadow-xl">
                  <label htmlFor="add-note" className="block mb-2">
                    Add a note
                  </label>
                  <textarea
                    name="add-note"
                    id="add-note"
                    placeholder="Lorem ipsum..."
                    className="mb-4 appearance-none bg-white text-black rounded-md py-3 px-4 w-full block flex-1 min-w-0 shadow-inner"
                  ></textarea>
                  <button
                    type="submit"
                    className="py-3 font-bold px-4 flex items-center gap-2 rounded-md bg-purple-400 hover:bg-purple-500 transition-colors duration-300 group text-white"
                  >
                    <span>Add Note</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
            {/* Notes */}
            {notes.length ? (
              <div className="w-full">
                {notes.map((note, index) => (
                  <div
                    key={index}
                    className="bg-white/40 dark:bg-black/40 rounded-xl shadow-xl pt-3 pb-4 px-6 mb-4"
                  >
                    <h6 className="opacity-80">Note #{index + 1}</h6>
                    <p>{note}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="w-full text-center">No notes added</p>
            )}
          </div>
        </>
      ) : (
        <p className="w-full text-center">Data Loading</p>
      )}
    </div>
  );
}
