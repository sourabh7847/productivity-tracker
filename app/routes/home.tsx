import Layout from "~/components/shared/Layout";
import {
  Calendar,
  Check,
  Pencil,
  PlusIcon,
  Trash2,
  X,
} from "lucide-react";
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

  const [editingHabit, setEditingHabit] =
    useState<HabitInterface | null>(null);

  const handelAddHabit = () => {
    // setHabit({
    //   ...habit,
    //   id:generateId()
    // })
    let newHabit = { ...habit };
    newHabit.id = generateId();
    newHabit.creactedAt = new Date().toISOString();
    setHabits([...habits, newHabit]);
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
  const handleHabitClick = (habit: HabitInterface) => {
    let newhabits = [...habits];
    newhabits = newhabits.filter(
      (item) => item.id != habit.id
    );
    let changedHabit = {
      ...habit,
      completed: !habit.completed,
    };
    newhabits = [...newhabits, changedHabit];
    setHabits(newhabits);
  };

  const handelHabitDelete = (habit: HabitInterface) => {
    let remainingHabits = habits.filter(
      (item) => item.id != habit.id
    );
    setHabits(remainingHabits);
  };

  const handleHabitEdit = (habit: HabitInterface) => {
    setEditingHabit(habit);
  };

  const onEditSave = () => {
    let newHabits: any = habits.filter(
      (item) => editingHabit?.id != item.id
    );
    newHabits = [editingHabit, ...newHabits];
    setHabits(newHabits);
    setEditingHabit(null);
  };

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
              <p className={`${countStyles}`}>
                {
                  habits.filter(
                    (item: HabitInterface) =>
                      item.completed == true
                  ).length
                }
                /{habits.length}
              </p>
            </div>
            <div className="flex flex-col items-start mt-5">
              {habits.length == 0 ? (
                <p className=" text-gray-100 text-lg p-2">
                  No Habits found !
                </p>
              ) : (
                habits.map((habit) => {
                  if (habit.id == editingHabit?.id) {
                    return (
                      <div className="flex items-center justify-between w-full">
                        <input
                          className="flex flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          onKeyDown={(e) => {
                            if (e.key === "Enter")
                              onEditSave();
                          }}
                          value={editingHabit.name}
                          onChange={(e) =>
                            setEditingHabit({
                              ...editingHabit,
                              name: e.target.value,
                            })
                          }
                        />
                        <div className="flex items-center ml-2 space-x-2">
                          <button
                            onClick={onEditSave}
                            title="Save"
                            className="cursor-pointer"
                          >
                            <Check size={20} />
                          </button>
                          <button
                            onClick={() =>
                              setEditingHabit(null)
                            }
                            title="Cancel"
                            className="cursor-pointer"
                          >
                            <X size={20} />
                          </button>
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div className="flex w-full p-2 rounded-lg hover:bg-gray-900 transition-colors">
                        <div className="flex flex-1 items-center">
                          <button
                            className={` flex items-center justify-center w-5 h-5 mr-3 rounded-full cursor-pointer ${
                              habit.completed
                                ? "bg-indigo-600 border-2"
                                : "border"
                            }`}
                            onClick={() =>
                              handleHabitClick(habit)
                            }
                          >
                            {habit.completed ? (
                              <Check size={12} />
                            ) : null}
                          </button>
                          <label
                            className={` text-gray-200 text-lg ${
                              habit.completed
                                ? "line-through"
                                : " "
                            }`}
                          >
                            {habit.name}
                          </label>
                        </div>
                        <div className="flex items-center">
                          <button
                            className="mr-3 cursor-pointer"
                            onClick={() =>
                              handleHabitEdit(habit)
                            }
                            title="Edit"
                          >
                            <Pencil size={15} />
                          </button>
                          <button
                            className="cursor-pointer"
                            onClick={() =>
                              handelHabitDelete(habit)
                            }
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    );
                  }
                })
              )}
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
