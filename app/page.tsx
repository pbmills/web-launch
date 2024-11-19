"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Input from "@/components/Input";
import Tasks from "@/components/tasks";

export default function Home() {
  const { user } = useUser();
  const [role, setRole] = useState<string>("");
  const [classroom, setClassroom] = useState<string>("");
  const [notes, setNotes] = useState<string[]>([])

  function addNote(note:string) {
    setNotes((p) => [...p, note])
    console.log(notes)
  }

  useEffect(() => {
    setRole(user?.publicMetadata.role as string || "member");
  }, [user]);

  return (
    <div className="py-20 px-6">
      {classroom.length ?
        <Tasks classroom={classroom} notes={notes} setNote={addNote} teacher={role === 'admin'} /> :
        <div className="max-w-xl w-full mx-auto">
          <Input id="class-code" name="classCode" label="Classroom Code" placeholder="ABC123" setValue={setClassroom} />
        </div>
      }
    </div>
  );
}
