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
            group-[.toaster]:shadow-lg
          `,
          description: `
            group-[.toast]:text-muted-foreground
          `,
          actionButton: `
            group-[.toast]:bg-primary 
            group-[.toast]:text-primary-foreground 
            bg-success
          `,
          cancelButton: `
            group-[.toast]:bg-muted 
            group-[.toast]:text-muted-foreground
          `,
          warning: `
            group-[.toast]:bg-success
          `,
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
