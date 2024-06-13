import { FC } from "react"
// import { zodResolver } from "@hookform/resolvers/zod"
import { PlusCircle } from "lucide-react"

import { useCreateVault } from "@/lib/stores/createVault"
// import { useForm } from "react-hook-form"

// import { VaultFormValues, VaultSchema } from "@/lib/validators/vault"
import { Button } from "@/components/ui/Button"
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/Form"
// import { Input } from "@/components/ui/Input"
import { useAuth } from "@/components/providers/AuthProvider"

import VaultCard from "./VaultCard"

// TODO: Mutations
// TODO: Modal/Drawer Create Form on Create Button Click
// TODO: Add Description to Vault
// TODO: Star and show active vault first

interface VaultsProps {}

const Vaults: FC<VaultsProps> = () => {
  const { user } = useAuth()
  const { setOpen } = useCreateVault()
  // const form = useForm<VaultFormValues>({
  //   resolver: zodResolver(VaultSchema),
  //   mode: "onChange",
  // })

  // const { mutate: createVault, isLoading } = useCreateVaultMutation()

  // const onSubmit = (data: VaultFormValues) => {
  //   //createVault(data)
  //   console.log(data)
  // }

  const onCreateClick = () => {
    setOpen(true)
  }

  return (
    <div className="py-2 space-y-6 w-full">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Your Vaults</h1>
          <p className="text-muted">Create and manage your vaults here.</p>
        </div>
        <Button
          variant="outline"
          className="gap-1 items-center px-3"
          onClick={onCreateClick}
        >
          <PlusCircle className="size-4 text-primary" />
          Create
        </Button>
      </div>
      <div className="space-x-0 space-y-6 md:space-y-0 md:space-x-3 flex flex-col md:flex-row">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
          {user!.vaults &&
            user!.vaults.map((vault) => <VaultCard vault={vault} />)}
        </div>
      </div>
    </div>
  )
}

// <div className="bg-contrast rounded border shadow-md p-2 md:p-4 lg:p-6 md:w-1/3 lg:w-1/4">
//          <h2 className="text-lg lg:text-xl font-bold lg:mb-0 mb-1">
//            Create a New Vault
//          </h2>
//          <Form {...form}>
//            <form
//              onSubmit={form.handleSubmit(onSubmit)}
//              className="space-y-4 w-full max-w-lg"
//            >
//              <FormField
//                control={form.control}
//                name="name"
//                render={({ field }) => (
//                  <FormItem>
//                    <FormLabel>Vault Name</FormLabel>
//                    <FormControl>
//                      <Input placeholder="Enter vault name" {...field} />
//                    </FormControl>
//                    <FormDescription>
//                      Choose a unique name for your vault.
//                    </FormDescription>
//                    <FormMessage />
//                  </FormItem>
//                )}
//              />
//              <div className="flex justify-end">
//                <Button
//                  variant="primary"
//                  size="sm"
//                  type="submit"
//                  disabled={isLoading}
//                >
//                  {isLoading ? "Creating..." : "Create Vault"}
//                </Button>
//              </div>
//            </form>
//          </Form>
//        </div>

export default Vaults
