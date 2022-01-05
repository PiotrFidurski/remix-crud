import { Form, useActionData } from 'remix';
import { Button } from '~/components/Elements';
import {
  InputField,
  TextareaField,
} from '~/components/Form';
import { ActionData } from '../types';

export function CreatePost() {
  const actionData = useActionData<ActionData>();

  return (
    <Form
      aria-describedby={
        actionData?.formError
          ? 'form-error-message'
          : undefined
      }
      method="post"
      className="flex px-2 flex-col max-w-2xl w-full m-auto"
    >
      <h1 className="font-bold text-4xl py-4 text-violet-700">
        Create new post
      </h1>
      <InputField
        errorMessage={actionData?.fieldErrors?.title}
        htmlFor="title"
        type="text"
        name="title"
        required
        minLength={5}
        maxLength={30}
        aria-invalid={Boolean(
          actionData?.fieldErrors?.title
        )}
        aria-describedby={
          actionData?.fieldErrors?.title
            ? 'username-error'
            : undefined
        }
      >
        Title
      </InputField>
      <TextareaField
        errorMessage={actionData?.fieldErrors?.content}
        name="content"
        htmlFor="content"
        required
        minLength={50}
        maxLength={300}
        aria-invalid={Boolean(
          actionData?.fieldErrors?.content
        )}
        aria-describedby={
          actionData?.fieldErrors?.content
            ? 'username-error'
            : undefined
        }
      >
        Content
      </TextareaField>
      <div className="mt-4 flex justify-end">
        <Button
          type="submit"
          className="rounded-full border-violet-700 px-6"
        >
          Create
        </Button>
      </div>
    </Form>
  );
}
