import {
  createRoute,
  lazyRouteComponent,
  redirect,
} from "@tanstack/react-router"

import type {
  NotesSearch,
  NotesSearchFilterOptions,
} from "@/features/app/notes/api/getNotes"
import { appLayout } from "@/routes/app"

export const notesRoute = createRoute({
  getParentRoute: () => appLayout,
  path: "/notes/",
  component: lazyRouteComponent(() => import("./Notes")),
  beforeLoad: ({ context, location }) => {
    if (context.user) {
      if (!context.user.active_vault) {
        throw redirect({
          to: "/vaults",
        })
      }
    } else {
      throw redirect({
        to: `/login`,
        search: {
          redirect: location.href,
        },
      })
    }

    return {
      getSeo: () => {
        return {
          title: "Notes - Zethub",
          description: "Zethub user notes dashboard page.",
        }
      },
    }
  },
  validateSearch: (search: Record<string, unknown>): NotesSearch => {
    return {
      filter: (search.filter as NotesSearchFilterOptions) || "all",
    }
  },
})
