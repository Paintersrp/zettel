"use client"

import { useFormInputProps } from "@udecode/plate-common"
import {
  flip,
  offset,
  type UseVirtualFloatingOptions,
} from "@udecode/plate-floating"
import {
  FloatingLinkUrlInput,
  LinkOpenButton,
  useFloatingLinkEdit,
  useFloatingLinkEditState,
  useFloatingLinkInsert,
  useFloatingLinkInsertState,
  type LinkFloatingToolbarState,
} from "@udecode/plate-link"

import { cn } from "@/utils/cn"
import { inputVariants } from "@/components/ui/form/Input"
import { popoverVariants } from "@/components/ui/Popover"
import { Separator } from "@/components/ui/Separator"
import { Icons } from "@/components/editor/ui/Icons"

import { editorButtonVariants } from "../EditorButton"

const floatingOptions: UseVirtualFloatingOptions = {
  middleware: [
    offset(12),
    flip({
      fallbackPlacements: ["bottom-end", "top-start", "top-end"],
      padding: 12,
    }),
  ],
  placement: "bottom-start",
}

export interface LinkFloatingToolbarProps {
  state?: LinkFloatingToolbarState
}

export function LinkFloatingToolbar({ state }: LinkFloatingToolbarProps) {
  const insertState = useFloatingLinkInsertState({
    ...state,
    floatingOptions: {
      ...floatingOptions,
      ...state?.floatingOptions,
    },
  })
  const {
    hidden,
    props: insertProps,
    ref: insertRef,
    textInputProps,
  } = useFloatingLinkInsert(insertState)

  const editState = useFloatingLinkEditState({
    ...state,
    floatingOptions: {
      ...floatingOptions,
      ...state?.floatingOptions,
    },
  })
  const {
    editButtonProps,
    props: editProps,
    ref: editRef,
    unlinkButtonProps,
  } = useFloatingLinkEdit(editState)
  const inputProps = useFormInputProps({
    preventDefaultOnEnterKeydown: true,
  })

  if (hidden) return null

  const input = (
    <div className="flex w-[330px] flex-col" {...inputProps}>
      <div className="flex items-center">
        <div className="flex items-center pl-3 text-muted-foreground">
          <Icons.link className="size-4" />
        </div>

        <FloatingLinkUrlInput
          className={inputVariants({ h: "sm", variant: "ghost" })}
          placeholder="Paste link"
        />
      </div>
      <Separator />
      <div className="flex items-center">
        <div className="flex items-center pl-3 text-muted-foreground">
          <Icons.text className="size-4" />
        </div>
        <input
          className={inputVariants({ h: "sm", variant: "ghost" })}
          placeholder="Text to display"
          {...textInputProps}
        />
      </div>
    </div>
  )

  const editContent = editState.isEditing ? (
    input
  ) : (
    <div className="box-content flex h-9 items-center gap-1">
      <button
        className={editorButtonVariants({ size: "sm", variant: "ghost" })}
        type="button"
        {...editButtonProps}
      >
        Edit link
      </button>

      <Separator orientation="vertical" />

      <LinkOpenButton
        className={editorButtonVariants({
          size: "sms",
          variant: "ghost",
        })}
      >
        <Icons.externalLink width={18} />
      </LinkOpenButton>

      <Separator orientation="vertical" />

      <button
        className={editorButtonVariants({
          size: "sms",
          variant: "ghost",
        })}
        type="button"
        {...unlinkButtonProps}
      >
        <Icons.unlink width={18} />
      </button>
    </div>
  )

  return (
    <>
      <div
        className={cn(popoverVariants(), "w-auto p-1")}
        ref={insertRef}
        {...insertProps}
      >
        {input}
      </div>

      <div
        className={cn(popoverVariants(), "w-auto p-1")}
        ref={editRef}
        {...editProps}
      >
        {editContent}
      </div>
    </>
  )
}
