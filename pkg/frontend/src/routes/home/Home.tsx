import BaseLayout from "@/layouts/base/Base"

interface HomeRouteProps {}

const HomeRoute: React.FC<HomeRouteProps> = () => {
  return (
    <BaseLayout>
      <div className="min-h-full w-full">
        <div className="relative flex flex-col justify-center items-center w-full h-full px-8">
          <h1 className="text-3xl md:text-5xl mb-2">Welcome to Zettel</h1>
          <video autoPlay loop className="md:w-full" src="/frank.mp4"></video>
        </div>
      </div>
    </BaseLayout>
  )
}

export default HomeRoute
