import {
  Form,
  useActionData,
  useLoaderData,
  useTransition,
} from 'remix';
import { Button } from '~/components/Elements';
import {
  InputField,
  TextareaField,
} from '~/components/Form';
import { ActionData, LoaderData } from '../types';

export function EditUser() {
  const actionData = useActionData<ActionData>();

  const data = useLoaderData<LoaderData>();

  const { submission } = useTransition();

  return (
    <Form method="post" className="flex flex-col gap-4">
      <h1 className="font-bold text-4xl py-4 text-violet-700">
        Edit your profile
      </h1>
      <InputField
        errorMessage={actionData?.fieldErrors?.username}
        htmlFor="username"
        defaultValue={data.user.username}
        type="text"
        name="username"
        minLength={5}
        maxLength={25}
        required
        aria-invalid={Boolean(
          actionData?.fieldErrors?.username
        )}
        aria-describedby={
          actionData?.fieldErrors?.username
            ? 'username-error'
            : undefined
        }
      >
        Username
      </InputField>
      <TextareaField
        errorMessage={actionData?.fieldErrors?.bio}
        defaultValue={data.user.bio!}
        htmlFor="bio"
        name="bio"
        minLength={20}
        maxLength={200}
        aria-invalid={Boolean(actionData?.fieldErrors?.bio)}
        aria-describedby={
          actionData?.fieldErrors?.bio
            ? 'bio-error'
            : undefined
        }
      >
        Bio
      </TextareaField>
      <Button
        className="border-2 border-violet-700"
        type="submit"
      >
        {submission ? 'Updating...' : 'Update'}
      </Button>
    </Form>
  );
}
