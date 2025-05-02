import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import Layout from "~/components/shared/Layout";
import { Calendar } from "lucide-react";
import Card from "~/components/shared/Card";
import { cardHeader } from "~/components/utlis/GlobalClasses";
import { countStyles } from "~/components/utlis/CountStyles";

export function meta({}: Route.MetaArgs) {
  return [
    // { title: "New React Router App" },
    // {
    //   name: "description",
    //   content: "Welcome to React Router!",
    // },
  ];
}

export default function Home() {
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

            <input name="myInput" />
          </Card>
          <Card>
            <p className={`${cardHeader}`}>Daliy Goals</p>
          </Card>
        </div>
      </Layout>
    </>
  );
}
