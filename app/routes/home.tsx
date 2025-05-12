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
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Autocomplete, Paper } from "@mui/material";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface HabitInterface {
  id: string;
  name: string;
  completed: Boolean;
  creactedAt: String;
  completdDates: [];
  streak: number;
}

interface RoutineInterface {
  id: string;
  name: string;
  isCompleted: boolean;
  createdAt: string;
  habits: HabitInterface[] | [];
}

export default function Home() {
  const habits_from_localstorage = JSON.parse(
    localStorage.getItem("habits") || "[]"
  );
  const [habits, setHabits] = useState<
    [] | HabitInterface[]
  >(habits_from_localstorage);
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

  const [routines, setRoutines] = useState<
    [] | RoutineInterface[]
  >([]);
  const [routine, setRoutine] = useState<RoutineInterface>({
    id: "",
    name: "",
    isCompleted: false,
    createdAt: "",
    habits: [],
  });

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

  const now = new Date();
  const hour = now.getHours();
  const getGreeting = () => {
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    if (hour < 21) return "Good Evening";
    return "Good Night";
  };

  const day = days[now.getDay()];
  const date = `${months[now.getMonth()]} ${now.getDate()}`;

  useEffect(() => {
    console.log(habits);
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Layout>
        <div className="flex-1 flex flex-col px-25 pt-8 pb-6">
          <div className="flex flex-row justify-between ">
            <div>
              <h1 className="font-bold text-2xl text-gray-100">
                {getGreeting()}
              </h1>
              <div className="flex items-center py-1 text-gray-400">
                <Calendar className="mr-2" size={18} />
                <p
                  style={{
                    fontWeight: "400",
                    fontSize: "18px",
                  }}
                >
                  {day}, {date}
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
            <div className="flex flex-row justify-between">
              <div className=" flex  ">
                <p className={`${cardHeader}`}>Routines</p>
              </div>
              <div>
                <div
                  className="px-3 py-1.5 rounded-lg bg-indigo-900/60 text-indigo-300 cursor-pointer shadow-lg"
                  onClick={handleClickOpen}
                >
                  Add Routines
                </div>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    component: "form",
                    sx: {
                      backgroundColor: "#101828",
                      color: "#ffffff",
                      minWidth: 600,
                    },
                    onSubmit: (
                      event: React.FormEvent<HTMLFormElement>
                    ) => {
                      event.preventDefault();
                      const formData = new FormData(
                        event.currentTarget
                      );
                      const formJson = Object.fromEntries(
                        formData.entries()
                      );
                      console.log(formJson);
                      handleClose();
                    },
                  }}
                >
                  <DialogTitle sx={{ color: "#ffffff" }}>
                    Add Routine
                  </DialogTitle>

                  <DialogContent>
                    <TextField
                      autoFocus
                      required
                      margin="dense"
                      name="routine"
                      label="Routine Name"
                      fullWidth
                      variant="standard"
                      sx={{ marginBottom: 2 }}
                      InputProps={{
                        style: { color: "#ffffff" },
                        disableUnderline: false,
                        sx: {
                          "&:before": {
                            borderBottomColor: "#cccccc",
                          },
                          "&:hover:not(.Mui-disabled):before":
                            {
                              borderBottomColor: "#cccccc",
                            },
                          "&:after": {
                            borderBottomColor: "#4f39f6e0",
                          },
                        },
                      }}
                      InputLabelProps={{
                        style: { color: "#cccccc" },
                      }}
                    />

                    <Autocomplete
                      multiple
                      id="habit-select"
                      options={habits}
                      getOptionLabel={(option) =>
                        option.name
                      }
                      filterSelectedOptions={true}
                      noOptionsText="No habits found"
                      slotProps={{
                        paper: {
                          sx: {
                            backgroundColor: "#101828",
                            color: "#ffffff",
                            boxShadow:
                              "0px 4px 12px rgba(0, 0, 0, 0.5)",
                            "& .MuiAutocomplete-option": {
                              color: "#ffffff",
                              '&[aria-selected="true"]': {
                                backgroundColor:
                                  "#4f39f6e0",
                              },
                              "&:hover": {
                                backgroundColor: "#303F9F",
                              },
                            },
                            "& .MuiListSubheader-root": {
                              color: "#ffffff", // ✅ Fixes "No options" text color
                              backgroundColor: "#101828", // match dropdown
                            },
                          },
                        },
                      }}
                      sx={{
                        "& .MuiAutocomplete-tag": {
                          backgroundColor: "#4f39f6e0",
                          color: "#ffffff",
                        },
                        "& .MuiSvgIcon-root": {
                          color: "#ffffff",
                        },
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          name="selectedHabits"
                          label="Select Habits"
                          placeholder="Start typing habit..."
                          margin="normal"
                          variant="standard"
                          InputProps={{
                            ...params.InputProps,
                            style: { color: "#ffffff" },
                            disableUnderline: false,
                            sx: {
                              "&:before": {
                                borderBottomColor:
                                  "#4f39f6e0",
                              },
                              "&:hover:not(.Mui-disabled):before":
                                {
                                  borderBottomColor:
                                    "#4f39f6e0",
                                },
                              "&:after": {
                                borderBottomColor:
                                  "#4f39f6e0",
                              },
                            },
                          }}
                          InputLabelProps={{
                            style: { color: "#cccccc" },
                          }}
                        />
                      )}
                    />
                  </DialogContent>

                  <DialogActions>
                    <Button
                      onClick={handleClose}
                      sx={{ color: "#cccccc" }}
                    >
                      Cancel
                    </Button>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 h-[40px] w-[70px] rounded-lg">
                      Save
                    </button>
                  </DialogActions>
                </Dialog>
              </div>
            </div>
          </Card>
        </div>
      </Layout>
    </>
  );
}
