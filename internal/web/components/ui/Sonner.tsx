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
            group-[.toaster]:bg-card
            group-[.toaster]:text-foreground 
            group-[.toaster]:border-border 
            group-[.toaster]:border 
            group-[.toaster]:shadow-lg
          `,
          description: `
            group-[.toast]:text-muted-foreground          
          `,
          actionButton: `
            group-[.toast]:bg-primary 
            group-[.toast]:text-primary 
            bg-success
          `,
          cancelButton: `
            group-[.toast]:bg-muted 
            group-[.toast]:text-muted-foreground
          `,
          warning: `
            group-[.toast]:bg-orange-400
          `,
          success: `
            group-[.toast]:bg-green-400
          `,
          error: `
            group-[.toast]:bg-red-500
          `,
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
