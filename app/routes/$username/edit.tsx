import { Form } from 'remix';

export default function UsernameEditRoute() {
  return (
    <div>
      <Form className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="username">
            <span>username</span>
            <input
              className="text-sm leading-5 w-full py-2 px-3
              border-2 text-gray-500 rounded-lg shadow-sm
              focus:outline-none focus:ring dark:text-gray-400
            placeholder:text-gray-600 bg-gray-900
            border-indigo-500 focus:ring-indigo-900
            focus:border-indigo-600"
              name="username"
              id="username"
            />
          </label>
        </div>
        <div className="flex flex-col">
          <label htmlFor="bio">
            <span>bio</span>
            <input
              className="text-sm leading-5 w-full py-2 px-3
               border-2 text-gray-500 rounded-lg shadow-sm
               focus:outline-none focus:ring dark:text-gray-400
             placeholder:text-gray-600 bg-gray-900
             border-indigo-500 focus:ring-indigo-900
             focus:border-indigo-600"
              name="bio"
              id="bio"
            />
          </label>
        </div>
        <div>
          <button
            className="my-2 bg-indigo-500 shadow-lg
             shadow-indigo-500/50 hover:bg-indigo-700
              text-white font-bold py-2 px-4 rounded-lg"
            type="submit"
          >
            Submit
          </button>
        </div>
      </Form>
    </div>
  );
}
