import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme={"dark"}
      className="toaster group"
      richColors={true}
      toastOptions={{
        classNames: {
          toast: `
            group 
            toast 
            group-[.toaster]:bg-contrast
            group-[.toaster]:text-foreground 
            group-[.toaster]:border-border 
            group-[.toaster]:border 
            group-[.toaster]:shadow-lg
          `,
          description: `
            group-[.toast]:text-muted
          `,
          actionButton: `
            group-[.toast]:bg-primary 
            group-[.toast]:text-primary 
            bg-success
          `,
          cancelButton: `
            group-[.toast]:bg-muted 
            group-[.toast]:text-muted
          `,
          warning: `
            group-[.toast]:bg-success
          `,
          success: `
            group-[.toast]:bg-success
          `,
          error: `
            group-[.toast]:bg-error
          `,
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
