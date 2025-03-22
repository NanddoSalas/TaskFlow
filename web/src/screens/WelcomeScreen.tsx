import {
  Grab,
  KeyRound,
  LayoutList,
  SquareKanban,
  StretchVertical,
} from 'lucide-react';
import { useBearStore } from '../bearState';
import { Button } from '../components/ui/button';
import { fakeData } from '../fakeData';

const features = [
  {
    name: 'Google Authentication',
    description: 'Users can sign up and log in using their Google accounts.',
    icon: KeyRound,
  },
  {
    name: 'Boards Management',
    description: 'Create, update, and delete boards.',
    icon: SquareKanban,
  },
  {
    name: 'Groups Management',
    description: 'Add, edit, move, and delete groups within a board.',
    icon: StretchVertical,
  },
  {
    name: 'Tasks Management',
    description: 'Create, update, move, and delete tasks within groups.',
    icon: LayoutList,
  },
  {
    name: 'Drag-and-Drop',
    description:
      'Implement drag-and-drop functionality for seamless task movement.',
    icon: Grab,
  },
];

export const WelcomeScreen = () => {
  const login = useBearStore((state) => state.login);

  return (
    <div className="overflow-hidden bg-white py-8 sm:py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pt-4 lg:pr-8">
            <div className="lg:max-w-lg">
              <h2 className="text-base/7 font-semibold">
                Organize your tasks effortlessly!
              </h2>

              <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                Welcome to TaskFlow
              </p>

              <p className="mt-6 text-lg/8 text-gray-600">
                TaskFlow is a lightweight task management web application that
                allows users to create, organize, and track tasks in an
                intuitive kanban-style interface.
              </p>

              <h3 className="font-semibold mt-4 text-xl">Features</h3>

              <dl className="mt-2 max-w-xl space-y-4 text-base/7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="">
                    <dt className="font-semibold text-gray-900 flex gap-2 items-center">
                      <feature.icon className="size-5" />
                      <span> {feature.name}</span>
                    </dt>

                    <dd className="">{feature.description}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => login(fakeData.idToken!, fakeData.user!)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Continue with Google
                </Button>
              </div>
            </div>
          </div>

          {/* todo: update product screenshot */}
          <img
            alt="Product screenshot"
            src="https://tailwindcss.com/plus-assets/img/component-images/dark-project-app-screenshot.png"
            width={2432}
            height={1442}
            className="w-[48rem] max-w-none rounded-xl ring-1 shadow-xl ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
          />
        </div>
      </div>
    </div>
  );
};
