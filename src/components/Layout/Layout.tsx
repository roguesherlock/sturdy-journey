import { HeartIcon } from "@heroicons/react/outline";
type Props = {
  children?: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <>
      <div className="flex flex-col gap-4 min-h-screen min-w-screen bg-gray-50 text-gray-900">
        <header className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4"></header>
        <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {children}
        </main>
        <footer className="mt-auto">
          <div className="max-w-7xl mx-auto overflow-hidden px-4 sm:px-6 lg:px-8 py-4">
            <div className="mt-8 text-xl flex gap-2 items-center justify-center">
              <HeartIcon className="h-6 w-6 text-blue-500" />
              <p>Gumroad</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Layout;
