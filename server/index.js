import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useMatches, useActionData, useLoaderData, useParams, useRouteError, Meta, Links, ScrollRestoration, Scripts, Outlet, isRouteErrorResponse } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { createElement, useState } from "react";
import { SunIcon, MoonIcon, HomeIcon, BarChartIcon, CalendarIcon, UserIcon, Calendar, Check, X, Pencil, Trash2, PlusIcon } from "lucide-react";
import { v4 } from "uuid";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function withComponentProps(Component) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches()
    };
    return createElement(Component, props);
  };
}
function withErrorBoundaryProps(ErrorBoundary3) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      error: useRouteError()
    };
    return createElement(ErrorBoundary3, props);
  };
}
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout$1({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout: Layout$1,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const ThemeToggle = ({
  isDarkMode,
  toggleTheme
}) => {
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick: toggleTheme,
      className: "p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200",
      "aria-label": isDarkMode ? "Switch to light mode" : "Switch to dark mode",
      children: isDarkMode ? /* @__PURE__ */ jsx(SunIcon, { size: 18 }) : /* @__PURE__ */ jsx(MoonIcon, { size: 18 })
    }
  );
};
const Header = ({
  isDarkMode,
  toggleTheme
}) => {
  return /* @__PURE__ */ jsx("div", { className: "flex flex-col w-full bg-white dark:bg-gray-800", children: /* @__PURE__ */ jsxs("header", { className: "sticky top-0 z-10  shadow-sm px-4 py-3 flex justify-between items-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold text-indigo-600 dark:text-indigo-400", children: "Wellness Tracker" }),
    /* @__PURE__ */ jsx(
      ThemeToggle,
      {
        isDarkMode,
        toggleTheme
      }
    )
  ] }) });
};
const Footer = () => {
  return /* @__PURE__ */ jsxs("div", { className: "flex fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg rounded-t-xl z-10 h-[80px]", children: [
    /* @__PURE__ */ jsx("div", { className: "flex flex-1 justify-around items-center ", children: /* @__PURE__ */ jsxs(
      "button",
      {
        className: "flex flex-1 flex-col items-center justify-center w-full h-full",
        children: [
          /* @__PURE__ */ jsx(HomeIcon, {}),
          /* @__PURE__ */ jsx("span", { className: "text-xs mt-1", children: "Home" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-1 justify-around items-center ", children: /* @__PURE__ */ jsxs(
      "button",
      {
        className: "flex flex-1 flex-col items-center justify-center w-full h-full",
        children: [
          /* @__PURE__ */ jsx(BarChartIcon, {}),
          /* @__PURE__ */ jsx("span", { className: "text-xs mt-1", children: "Stats" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-1 justify-around items-center ", children: /* @__PURE__ */ jsxs(
      "button",
      {
        className: "flex flex-1 flex-col items-center justify-center w-full h-full",
        children: [
          /* @__PURE__ */ jsx(CalendarIcon, {}),
          /* @__PURE__ */ jsx("span", { className: "text-xs mt-1", children: "Calendar" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-1 justify-around items-center ", children: /* @__PURE__ */ jsxs(
      "button",
      {
        className: "flex flex-1 flex-col items-center justify-center w-full h-full",
        children: [
          /* @__PURE__ */ jsx(UserIcon, {}),
          /* @__PURE__ */ jsx("span", { className: "text-xs mt-1", children: "Profile" })
        ]
      }
    ) })
  ] });
};
const Layout = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  return /* @__PURE__ */ jsxs("main", { className: `${" bg-gray-900"} flex flex-col`, children: [
    /* @__PURE__ */ jsx(
      Header,
      {
        isDarkMode,
        toggleTheme
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "flex-1 w-full ", children }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
const Card = ({
  className = "mt-10",
  children
}) => {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `bg-gray-800 rounded-lg min-h-[100px] p-4 ${className}`,
      children
    }
  );
};
const cardHeader = `text-xl font-medium text-gray-800 dark:text-gray-200`;
const countStyles = `"text-sm text-indigo-600 dark:text-indigo-400`;
const home = withComponentProps(function Home() {
  const [habits, setHabits] = useState([]);
  const [habit, setHabit] = useState({
    id: "",
    name: "",
    completed: false,
    creactedAt: "",
    completdDates: [],
    streak: 0
  });
  const [editingHabit, setEditingHabit] = useState(null);
  const handelAddHabit = () => {
    let newHabit = {
      ...habit
    };
    newHabit.id = generateId();
    newHabit.creactedAt = (/* @__PURE__ */ new Date()).toISOString();
    setHabits([...habits, newHabit]);
    setHabit({
      id: "",
      name: "",
      completed: false,
      creactedAt: "",
      completdDates: [],
      streak: 0
    });
  };
  function generateId() {
    return v4();
  }
  const handleHabitClick = (habit2) => {
    let newhabits = [...habits];
    newhabits = newhabits.filter((item) => item.id != habit2.id);
    let changedHabit = {
      ...habit2,
      completed: !habit2.completed
    };
    newhabits = [...newhabits, changedHabit];
    setHabits(newhabits);
  };
  const handelHabitDelete = (habit2) => {
    let remainingHabits = habits.filter((item) => item.id != habit2.id);
    setHabits(remainingHabits);
  };
  const handleHabitEdit = (habit2) => {
    setEditingHabit(habit2);
  };
  const onEditSave = () => {
    let newHabits = habits.filter((item) => (editingHabit == null ? void 0 : editingHabit.id) != item.id);
    newHabits = [editingHabit, ...newHabits];
    setHabits(newHabits);
    setEditingHabit(null);
  };
  const now = /* @__PURE__ */ new Date();
  const hour = now.getHours();
  const getGreeting = () => {
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    if (hour < 21) return "Good Evening";
    return "Good Night";
  };
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const day = days[now.getDay()];
  const date = `${months[now.getMonth()]} ${now.getDate()}`;
  return /* @__PURE__ */ jsx(Fragment, {
    children: /* @__PURE__ */ jsx(Layout, {
      children: /* @__PURE__ */ jsxs("div", {
        className: " flex-1 flex flex-col px-25 pt-8 pb-6",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "flex flex-row justify-between ",
          children: [/* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("h1", {
              className: "font-bold text-2xl text-gray-100",
              children: getGreeting()
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex items-center py-1 text-gray-400",
              children: [/* @__PURE__ */ jsx(Calendar, {
                className: "mr-2",
                size: 18
              }), /* @__PURE__ */ jsxs("p", {
                style: {
                  fontWeight: "400",
                  fontSize: "18px"
                },
                children: [day, ", ", date]
              })]
            })]
          }), /* @__PURE__ */ jsx("div", {
            children: /* @__PURE__ */ jsx("p", {
              className: "px-3 py-1.5 rounded-lg bg-indigo-900/30 text-indigo-400 cursor-pointer",
              children: "Weekly Reflection"
            })
          })]
        }), /* @__PURE__ */ jsxs(Card, {
          children: [/* @__PURE__ */ jsxs("div", {
            className: "flex justify-between",
            children: [/* @__PURE__ */ jsx("p", {
              className: `${cardHeader} `,
              children: "Daliy Routines"
            }), /* @__PURE__ */ jsxs("p", {
              className: `${countStyles}`,
              children: [habits.filter((item) => item.completed == true).length, "/", habits.length]
            })]
          }), /* @__PURE__ */ jsx("div", {
            className: "flex flex-col items-start mt-5",
            children: habits.length == 0 ? /* @__PURE__ */ jsx("p", {
              className: " text-gray-100 text-lg p-2",
              children: "No Habits found !"
            }) : habits.map((habit2) => {
              if (habit2.id == (editingHabit == null ? void 0 : editingHabit.id)) {
                return /* @__PURE__ */ jsxs("div", {
                  className: "flex items-center justify-between w-full",
                  children: [/* @__PURE__ */ jsx("input", {
                    className: "flex flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500",
                    onKeyDown: (e) => {
                      if (e.key === "Enter") onEditSave();
                    },
                    value: editingHabit.name,
                    onChange: (e) => setEditingHabit({
                      ...editingHabit,
                      name: e.target.value
                    })
                  }), /* @__PURE__ */ jsxs("div", {
                    className: "flex items-center ml-2 space-x-2",
                    children: [/* @__PURE__ */ jsx("button", {
                      onClick: onEditSave,
                      title: "Save",
                      className: "cursor-pointer",
                      children: /* @__PURE__ */ jsx(Check, {
                        size: 20
                      })
                    }), /* @__PURE__ */ jsx("button", {
                      onClick: () => setEditingHabit(null),
                      title: "Cancel",
                      className: "cursor-pointer",
                      children: /* @__PURE__ */ jsx(X, {
                        size: 20
                      })
                    })]
                  })]
                });
              } else {
                return /* @__PURE__ */ jsxs("div", {
                  className: "flex w-full p-2 rounded-lg hover:bg-gray-900 transition-colors",
                  children: [/* @__PURE__ */ jsxs("div", {
                    className: "flex flex-1 items-center",
                    children: [/* @__PURE__ */ jsx("button", {
                      className: ` flex items-center justify-center w-5 h-5 mr-3 rounded-full cursor-pointer ${habit2.completed ? "bg-indigo-600 border-2" : "border"}`,
                      onClick: () => handleHabitClick(habit2),
                      children: habit2.completed ? /* @__PURE__ */ jsx(Check, {
                        size: 12
                      }) : null
                    }), /* @__PURE__ */ jsx("label", {
                      className: ` text-gray-200 text-lg ${habit2.completed ? "line-through" : " "}`,
                      children: habit2.name
                    })]
                  }), /* @__PURE__ */ jsxs("div", {
                    className: "flex items-center",
                    children: [/* @__PURE__ */ jsx("button", {
                      className: "mr-3 cursor-pointer",
                      onClick: () => handleHabitEdit(habit2),
                      title: "Edit",
                      children: /* @__PURE__ */ jsx(Pencil, {
                        size: 15
                      })
                    }), /* @__PURE__ */ jsx("button", {
                      className: "cursor-pointer",
                      onClick: () => handelHabitDelete(habit2),
                      title: "Delete",
                      children: /* @__PURE__ */ jsx(Trash2, {
                        size: 18
                      })
                    })]
                  })]
                });
              }
            })
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex mt-4",
            children: [/* @__PURE__ */ jsx("input", {
              className: "flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-l-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 ",
              name: "myInput",
              placeholder: "Add a new routine",
              onChange: (e) => setHabit({
                ...habit,
                name: e.target.value
              }),
              onKeyDown: (e) => {
                if (e.key == "Enter") handelAddHabit();
              },
              value: habit.name
            }), /* @__PURE__ */ jsx("button", {
              onClick: () => handelAddHabit(),
              className: "bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-r-lg",
              children: /* @__PURE__ */ jsx(PlusIcon, {
                size: 18
              })
            })]
          })]
        }), /* @__PURE__ */ jsx(Card, {
          children: /* @__PURE__ */ jsx("p", {
            className: `${cardHeader}`,
            children: "Daliy Goals"
          })
        })]
      })
    })
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/productivity-tracker/assets/entry.client-CIuud-eA.js", "imports": ["/productivity-tracker/assets/chunk-BAXFHI7N-Bz_EcWvQ.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/productivity-tracker/assets/root-DXPGQDj5.js", "imports": ["/productivity-tracker/assets/chunk-BAXFHI7N-Bz_EcWvQ.js", "/productivity-tracker/assets/with-props-yZZmM4Op.js"], "css": ["/productivity-tracker/assets/root-DFHLm2ZZ.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/productivity-tracker/assets/home-TyoFmzHx.js", "imports": ["/productivity-tracker/assets/with-props-yZZmM4Op.js", "/productivity-tracker/assets/chunk-BAXFHI7N-Bz_EcWvQ.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/productivity-tracker/assets/manifest-90267003.js", "version": "90267003", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const publicPath = "/productivity-tracker/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routes,
  ssr
};
