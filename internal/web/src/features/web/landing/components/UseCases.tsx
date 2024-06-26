import { type FC, type ReactNode } from "react"
import { Database, Globe, Notebook, Terminal } from "lucide-react"

interface UseCaseProps {
  title: string
  description: string
  icon: ReactNode
}

const UseCase: FC<UseCaseProps> = ({ title, description, icon }) => (
  <div className="flex items-start space-x-4">
    <div className="flex-shrink-0">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
)

export const UseCases = () => {
  return (
    <section className="w-full max-w-6xl">
      <h2 className="text-3xl font-semibold text-center mb-8">Use Cases</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <UseCase
          title="Research"
          description="Organize complex research projects and connect ideas across multiple sources."
          icon={<Notebook className="h-6 w-6 text-primary" />}
        />
        <UseCase
          title="Software Development"
          description="Keep track of code snippets, project ideas, and technical documentation."
          icon={<Terminal className="h-6 w-6 text-primary" />}
        />
        <UseCase
          title="Writing"
          description="Collect inspiration, outline your work, and manage multiple writing projects."
          icon={<Globe className="h-6 w-6 text-primary" />}
        />
        <UseCase
          title="Personal Knowledge Management"
          description="Build your second brain by organizing and connecting your personal knowledge."
          icon={<Database className="h-6 w-6 text-primary" />}
        />
      </div>
    </section>
  )
}

export default UseCases
