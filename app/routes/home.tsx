import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import Layout from "~/components/shared/Layout";
import { Calendar, PlusIcon } from "lucide-react";
import Card from "~/components/shared/Card";
import { cardHeader } from "~/components/utlis/GlobalClasses";
import { countStyles } from "~/components/utlis/CountStyles";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
interface HabitInterface {
  id: string;
  name: string;
  completed: Boolean;
  creactedAt: String;
  completdDates: [];
  streak: number;
}

export default function Home() {
  const [habits, setHabits] = useState<
    [] | HabitInterface[]
  >([]);
  const [habit, setHabit] = useState<HabitInterface>({
    id: "",
    name: "",
    completed: false,
    creactedAt: "",
    completdDates: [],
    streak: 0,
  });

  const handelAddHabit = () => {
    // setHabit({
    //   ...habit,
    //   id:generateId()
    // })
    let newHabit = { ...habit };
    newHabit.id = generateId();
    newHabit.creactedAt = new Date().toISOString();
    console.log(newHabit);
    setHabits([newHabit, ...habits]);
    setHabit({
      id: "",
      name: "",
      completed: false,
      creactedAt: "",
      completdDates: [],
      streak: 0,
    });
  };

  function generateId() {
    return uuidv4();
  }

  return (
    <>
      <Layout>
        <div className=" flex-1 flex flex-col px-25 pt-8 pb-6">
          <div className="flex flex-row justify-between ">
            <div>
              <h1 className="font-bold text-2xl text-gray-100">
                Good Morning
              </h1>
              <div className="flex items-center py-1 text-gray-400">
                <Calendar className="mr-2" size={18} />{" "}
                <p
                  style={{
                    fontWeight: "400",
                    fontSize: "18px",
                  }}
                >
                  Saturday, April 26
                </p>
              </div>
            </div>

            <div>
              <p className="px-3 py-1.5 rounded-lg bg-indigo-900/30 text-indigo-400 cursor-pointer">
                Weekly Reflection
              </p>
            </div>
          </div>
          <Card>
            <div className="flex justify-between">
              <p className={`${cardHeader} `}>
                Daliy Routines
              </p>
              <p className={`${countStyles}`}>0/4</p>
            </div>
            <div className="flex items-center mt-5">
              <button className="w-5 h-5 mr-3 rounded-full border"></button>
              <label className="text-gray-200 text-lg">
                Morning Meditation
              </label>
            </div>

            <div className="flex mt-4">
              <input
                className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-l-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 "
                name="myInput"
                placeholder="Add a new routine"
                onChange={(e) =>
                  setHabit({
                    ...habit,
                    name: e.target.value,
                  })
                }
                onKeyDown={(e) => {
                  if (e.key == "Enter") handelAddHabit();
                }}
                value={habit.name}
              />
              <button
                onClick={() => handelAddHabit()}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-r-lg"
              >
                <PlusIcon size={18} />
              </button>
            </div>
          </Card>
          <Card>
            <p className={`${cardHeader}`}>Daliy Goals</p>
          </Card>
        </div>
      </Layout>
    </>
  );
}
