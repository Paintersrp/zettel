import AccountSidebarItem from "./AccountSidebarLink"

const accountSidebarItems = [
  {
    title: "User Profile",
    href: "/app/account/profile",
  },
  {
    title: "Change Password",
    href: "/app/account/password",
  },
  {
    title: "Social Login Providers",
    href: "/app/account/providers",
  },
  {
    title: "Security Keys (SSH)",
    href: "/app/account/keys",
  },
]

export const AccountSidebar = () => {
  return (
    <nav className="flex flex-col sm:flex-row px-4 gap-1 lg:gap-0 space-y-0 lg:flex-col lg:space-x-0 lg:space-y-1">
      {accountSidebarItems.map((item) => (
        <AccountSidebarItem
          key={item.href}
          href={item.href}
          title={item.title}
        />
      ))}
    </nav>
  )
}

export default AccountSidebar
